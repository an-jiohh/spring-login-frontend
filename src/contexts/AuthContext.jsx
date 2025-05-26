import React, { createContext, useState, useContext, useEffect } from 'react';
import { BASE_URL } from '../config/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Context 생성
const AuthContext = createContext(null);

// Provider 컴포넌트
export const AuthProvider = ({ children }) => {
    // 사용자 정보 상태 관리
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 로그인 함수
    const login = async (userId, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                userId,
                password
            }, {
                withCredentials: true
            });
            setUser(response.data);
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    // 로그아웃 함수
    const logout = async () => {
        try {
            await axios.post(`${BASE_URL}/logout`, {}, {
                withCredentials: true
            });
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // 로그인 상태 확인 함수
    const checkAuthStatus = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/me`, {
                withCredentials: true
            });
            setUser(response.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트 마운트 시 로그인 상태 확인
    useEffect(() => {
        checkAuthStatus();
    }, []);

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 401) {
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );
    
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate]);
    // Context에서 제공할 값들
    const value = {
        user,
        loading,
        login,
        logout,
        checkAuthStatus,
        isLoggedIn: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 