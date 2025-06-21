import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // axios 기본 설정
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  // 인증 상태 확인
  const checkAuth = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/me`);
      if (response.data.status === 'success') {
        setUser(response.data.data);
      }
    } catch (error) {
      setUser(null);
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
        setUser(response.data.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('로그인 에러:', error);
      throw error;
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`);
      setUser(null);
      return true;
    } catch (error) {
      console.error('로그아웃 에러:', error);
      return false;
    }
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