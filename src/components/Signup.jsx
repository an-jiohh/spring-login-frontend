import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 회원가입 로직 구현
    console.log('회원가입 시도:', formData);
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
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일 주소"
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

        <div className="mt-5 flex items-center justify-center">
          <div className="flex-1 h-[1px] bg-[#e6e6e6]"></div>
          <span className="px-4 text-sm text-[#808080]">또는</span>
          <div className="flex-1 h-[1px] bg-[#e6e6e6]"></div>
        </div>

        <div className="mt-5 flex justify-center gap-4">
          <button className="w-12 h-12 rounded-full border border-[#cccccc] flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-[#3366cc] font-bold text-xl">G</span>
          </button>
          <button className="w-12 h-12 rounded-full bg-[#ffe500] flex items-center justify-center hover:bg-[#ffd700] transition-colors">
            <span className="text-[#4d3300] font-bold text-xl">K</span>
          </button>
          <button className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-black transition-colors">
            <span className="text-white font-bold text-xl">A</span>
          </button>
        </div>

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