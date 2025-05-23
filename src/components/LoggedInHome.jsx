import React from 'react';

function LoggedInHome() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
      <div className="w-[500px] h-[600px] bg-white rounded-lg shadow-sm p-[50px] border border-[#e6e6e6]">
        <h1 className="text-[32px] leading-[39px] font-bold text-[#333333] mb-[21px] text-left">
          안녕하세요, 김메모님!
        </h1>
        <p className="text-[16px] leading-[19px] text-[#808080] mb-[41px] text-left">
          오늘도 메모와 함께 생산적인 하루 되세요.
        </p>
        
        <button className="w-[400px] h-[56px] bg-[#3366cc] text-white text-[16px] leading-[19px] font-bold rounded-lg hover:bg-[#2952a3] transition-colors mb-[44px]">
          메모장으로 이동
        </button>

        <h2 className="text-[18px] leading-[22px] font-bold text-[#333333] mb-[18px] text-left">
          최근 작성한 메모
        </h2>

        <div className="space-y-[20px] mb-[20px]">
          <div className="w-[400px] h-[80px] border border-[#e6e6e6] rounded-lg px-[35px] flex items-center">
            <p className="text-[14px] leading-[17px] text-[#808080] text-left">오늘 진행된 회의 내용 정리...</p>
          </div>
          <div className="w-[400px] h-[80px] border border-[#e6e6e6] rounded-lg px-[35px] flex items-center">
            <p className="text-[14px] leading-[17px] text-[#808080] text-left">1. 보고서 작성 2. 이메일 확인 3. 미팅 준비...</p>
          </div>
        </div>

        <button className="w-[400px] h-[56px] border border-[#e6e6e6] text-[#cc3333] text-[16px] leading-[19px] font-bold rounded-lg hover:bg-gray-50 transition-colors">
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default LoggedInHome; 