import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(userId, password);
      if (success) {
        navigate('/');
      } else {
        setMessage('로그인에 실패했습니다.');
      }
    } catch (error) {
      setMessage(error.response?.data || '로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-5">
      <div className="w-[500px] bg-white rounded-lg border border-[#e6e6e6] p-[60px_40px] shadow-sm">
        <h1 className="text-[32px] leading-[39px] font-bold text-[#333333] text-center mb-6">
          로그인
        </h1>
        <p className="text-base leading-[19px] text-[#808080] text-center mb-6">
          계정 정보를 입력해주세요
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="userId"
              value={userId}
              onChange={e => setUserId(e.target.value)}
              placeholder="아이디"
              className="w-full h-14 px-4 rounded-lg border border-[#cccccc] text-base text-[#333333] placeholder-[#808080] focus:outline-none focus:border-[#3366cc] focus:ring-1 focus:ring-[#3366cc]"
            />
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="w-full h-14 px-4 rounded-lg border border-[#cccccc] text-base text-[#333333] placeholder-[#808080] focus:outline-none focus:border-[#3366cc] focus:ring-1 focus:ring-[#3366cc]"
            />
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-[#3366cc] text-white font-bold rounded-lg hover:bg-[#2952a3] transition-colors"
          >
            로그인
          </button>
        </form>

        {message && <p className="text-red-500 text-center mt-4">{message}</p>}

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
          <Link to="/signup" className="text-sm text-[#3366cc] hover:underline">
            계정이 없으신가요? 회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login; 