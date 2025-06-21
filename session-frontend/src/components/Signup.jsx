import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config/api';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    passwordConfirm: '',
    name: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // 유효성 검사
    if (!formData.userId || !formData.password || !formData.name) {
      setMessage('모든 필수 정보를 입력해주세요.');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        userId: formData.userId,
        password: formData.password,
        name: formData.name
      });

      if (response.data.status === 'success') {
        // 회원가입 성공 시 로그인 페이지로 이동
        navigate('/login');
      }
    } catch (error) {
      if (error.response?.data?.code === 'VALIDATION_ERROR') {
        setMessage(error.response.data.message);
      } else {
        setMessage(error.response?.data?.message || '회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-5">
      <div className="w-[500px] bg-white rounded-lg border border-[#e6e6e6] p-[60px_40px] shadow-sm">
        <h1 className="text-[32px] leading-[39px] font-bold text-[#333333] text-center mb-6">
          회원가입
        </h1>
        <p className="text-base leading-[19px] text-[#808080] text-center mb-6">
          필수 정보를 입력해주세요
        </p>
        
        {message && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="아이디"
              className="w-full h-14 px-4 rounded-lg border border-[#cccccc] text-base text-[#333333] placeholder-[#808080] focus:outline-none focus:border-[#3366cc] focus:ring-1 focus:ring-[#3366cc]"
            />
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
              className="w-full h-14 px-4 rounded-lg border border-[#cccccc] text-base text-[#333333] placeholder-[#808080] focus:outline-none focus:border-[#3366cc] focus:ring-1 focus:ring-[#3366cc]"
            />
          </div>

          <div>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="비밀번호 확인"
              className="w-full h-14 px-4 rounded-lg border border-[#cccccc] text-base text-[#333333] placeholder-[#808080] focus:outline-none focus:border-[#3366cc] focus:ring-1 focus:ring-[#3366cc]"
            />
          </div>

          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름"
              className="w-full h-14 px-4 rounded-lg border border-[#cccccc] text-base text-[#333333] placeholder-[#808080] focus:outline-none focus:border-[#3366cc] focus:ring-1 focus:ring-[#3366cc]"
            />
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-[#3366cc] text-white font-bold rounded-lg hover:bg-[#2952a3] transition-colors"
          >
            가입하기
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-[#3366cc] hover:underline">
            이미 계정이 있으신가요? 로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup; 