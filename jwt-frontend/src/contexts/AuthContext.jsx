import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // localStorage에서 Access Token 관리
  const getAccessToken = () => localStorage.getItem('accessToken');
  const setAccessToken = (token) => {
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
  };

  // axios 기본 설정 - 쿠키 포함 (Refresh Token용)
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  // axios 인터셉터 설정
  useEffect(() => {
    // 요청 인터셉터 - Access Token을 헤더에 자동 추가
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 응답 인터셉터 - 토큰 만료 시 자동 갱신
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // 인증이 필요 없는 요청들은 토큰 갱신하지 않음
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
            const refreshResponse = await axios.post(`${BASE_URL}/reissue`);
            
            if (refreshResponse.data.status === 'success') {
              const newAccessToken = refreshResponse.data.data.accessToken;
              setAccessToken(newAccessToken);
              
              // 실패한 요청을 새 토큰으로 재시도
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return axios(originalRequest);
            }
          } catch (refreshError) {
            // Refresh Token도 만료된 경우 로그아웃
            console.error('토큰 갱신 실패:', refreshError);
            setAccessToken(null);
            setUser(null);
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );

    // 컴포넌트 언마운트 시 인터셉터 정리
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // 인증 상태 확인
  const checkAuth = async () => {
    try {
      const token = getAccessToken();
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BASE_URL}/me`);
      if (response.data.status === 'success') {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error('인증 상태 확인 실패:', error);
      setUser(null);
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    checkAuth();
  }, []);

  // 로그인 함수
  const login = async (userId, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        userId,
        password
      });

      if (response.data.status === 'success') {
        const { accessToken, ...userData } = response.data.data;
        
        // Access Token 저장
        setAccessToken(accessToken);
        // 사용자 정보 저장 (accessToken 제외)
        setUser(userData);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('로그인 에러:', error);
      // 로그인 실패 시 기존 토큰 제거
      setAccessToken(null);
      setUser(null);
      throw error;
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`);
    } catch (error) {
      console.error('로그아웃 에러:', error);
    } finally {
      // 클라이언트에서 토큰 제거
      setAccessToken(null);
      setUser(null);
    }
    return true;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuth,
    isLoggedIn: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
}; 