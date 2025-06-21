## 🔑 **Access Token & Refresh Token 처리 방식**

### **1. 토큰 저장 위치**

```javascript
// Access Token: localStorage에 저장
const getAccessToken = () => localStorage.getItem('accessToken');
const setAccessToken = (token) => {
  if (token) {
    localStorage.setItem('accessToken', token);
  } else {
    localStorage.removeItem('accessToken');
  }
};

// Refresh Token: HttpOnly 쿠키 (서버에서 자동 설정)
axios.defaults.withCredentials = true; // 쿠키 자동 포함
```

### **2. 로그인 시 토큰 처리**

```javascript
const login = async (userId, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      userId,
      password
    });

    if (response.data.status === 'success') {
      // 백엔드 응답에서 accessToken 분리
      const { accessToken, ...userData } = response.data.data;
      
      // Access Token만 localStorage에 저장
      setAccessToken(accessToken);
      // 사용자 정보 저장 (accessToken 제외)
      setUser(userData);
      
      // Refresh Token은 서버에서 HttpOnly 쿠키로 자동 설정됨
      return true;
    }
  } catch (error) {
    // 로그인 실패 시 기존 토큰 제거
    setAccessToken(null);
    setUser(null);
    throw error;
  }
};
```

### **3. API 요청 시 Access Token 자동 추가**

```javascript
// axios 요청 인터셉터
const requestInterceptor = axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      // 모든 API 요청에 자동으로 Authorization 헤더 추가
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

### **4. 토큰 만료 시 자동 갱신**

```javascript
// axios 응답 인터셉터
const responseInterceptor = axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // 공개 API는 토큰 갱신하지 않음
    if (originalRequest.url?.includes('/reissue') || 
        originalRequest.url?.includes('/login') || 
        originalRequest.url?.includes('/signup')) {
      setAccessToken(null);
      setUser(null);
      return Promise.reject(error);
    }
    
    // 401 에러이고 아직 재시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Refresh Token으로 새 Access Token 발급
        // (Refresh Token은 HttpOnly 쿠키로 자동 전송됨)
        const refreshResponse = await axios.post(`${BASE_URL}/reissue`);
        
        if (refreshResponse.data.status === 'success') {
          const newAccessToken = refreshResponse.data.data.accessToken;
          // 새 Access Token 저장
          setAccessToken(newAccessToken);
          
          // 실패한 요청을 새 토큰으로 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // Refresh Token도 만료된 경우 로그아웃
        setAccessToken(null);
        setUser(null);
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
```

### **5. 로그아웃 시 토큰 정리**

```javascript
const logout = async () => {
  try {
    // 서버에 로그아웃 요청 (Refresh Token 제거)
    await axios.post(`${BASE_URL}/logout`);
  } catch (error) {
    console.error('로그아웃 에러:', error);
  } finally {
    // 클라이언트에서 Access Token 제거
    setAccessToken(null);
    setUser(null);
    // Refresh Token은 서버에서 쿠키 삭제됨
  }
  return true;
};
```

### **6. 페이지 로드 시 인증 상태 확인**

```javascript
const checkAuth = async () => {
  try {
    const token = getAccessToken();
    if (!token) {
      // Access Token이 없으면 로그인 안된 상태
      setUser(null);
      setLoading(false);
      return;
    }

    // Access Token이 있으면 사용자 정보 조회
    const response = await axios.get(`${BASE_URL}/me`);
    if (response.data.status === 'success') {
      setUser(response.data.data);
    }
  } catch (error) {
    // 토큰이 유효하지 않으면 제거
    setUser(null);
    setAccessToken(null);
  } finally {
    setLoading(false);
  }
};
```

## 🔄 **토큰 플로우 요약**

### **로그인 성공 시:**
1. **서버 응답**: `{accessToken: "...", userId: "...", name: "..."}`
2. **클라이언트**: Access Token → localStorage, 사용자 정보 → state
3. **서버**: Refresh Token → HttpOnly 쿠키 자동 설정

### **API 호출 시:**
1. **요청 인터셉터**: `Authorization: Bearer ${accessToken}` 자동 추가
2. **성공**: 정상 응답
3. **401 에러**: 토큰 갱신 프로세스 시작

### **토큰 갱신 시:**
1. **`/reissue` 호출**: Refresh Token이 쿠키로 자동 전송
2. **성공**: 새 Access Token → localStorage 저장
3. **실패**: 로그아웃 처리

### **로그아웃 시:**
1. **서버**: Refresh Token 쿠키 삭제
2. **클라이언트**: Access Token localStorage에서 제거
