import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
      <div className="w-[500px] bg-white rounded-lg shadow-sm p-[50px] border border-[#e6e6e6] text-center">
        <h1 className="text-[32px] leading-[39px] font-bold text-[#333333] mb-[21px]">
          404
        </h1>
        <p className="text-[16px] leading-[19px] text-[#808080] mb-[41px]">
          페이지를 찾을 수 없습니다.
        </p>
        
        <Link 
          to="/" 
          className="inline-block w-[400px] h-[56px] bg-[#3366cc] text-white text-[16px] leading-[19px] font-bold rounded-lg hover:bg-[#2952a3] transition-colors flex items-center justify-center"
        >
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default NotFound; 