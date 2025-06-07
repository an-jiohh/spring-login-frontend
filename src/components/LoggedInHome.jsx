import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoggedInHome() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleMemoClick = () => {
    navigate('/memo');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-5">
      <div className="w-full max-w-[500px] h-[90vh] max-h-[600px] bg-white rounded-lg shadow-sm p-8 md:p-[50px] border border-[#e6e6e6] flex flex-col">
        <h1 className="text-[32px] leading-[39px] font-bold text-[#333333] mb-[21px] text-left">
          안녕하세요, {user?.name || '사용자'}님!
        </h1>
        <p className="text-[16px] leading-[19px] text-[#808080] mb-[41px] text-left">
          오늘도 메모와 함께 생산적인 하루 되세요.
        </p>
        
        <button 
          onClick={handleMemoClick}
          className="w-full h-[56px] bg-[#3366cc] text-white text-[16px] leading-[19px] font-bold rounded-lg hover:bg-[#2952a3] transition-colors mb-[44px]"
        >
          메모장으로 이동
        </button>

        <h2 className="text-[18px] leading-[22px] font-bold text-[#333333] mb-[18px] text-left">
          최근 작성한 메모
        </h2>

        <div className="flex-1 overflow-y-auto space-y-[20px] mb-[20px] pr-2">
          <div className="w-full h-[80px] border border-[#e6e6e6] rounded-lg px-[35px] flex items-center">
            <p className="text-[14px] leading-[17px] text-[#808080] text-left">오늘 진행된 회의 내용 정리...</p>
          </div>
          <div className="w-full h-[80px] border border-[#e6e6e6] rounded-lg px-[35px] flex items-center">
            <p className="text-[14px] leading-[17px] text-[#808080] text-left">1. 보고서 작성 2. 이메일 확인 3. 미팅 준비...</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full h-[56px] border border-[#e6e6e6] text-[#cc3333] text-[16px] leading-[19px] font-bold rounded-lg hover:bg-gray-50 transition-colors mt-auto"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default LoggedInHome;