import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">메모 서비스</h1>
        <p className="text-gray-600 text-center mb-8">
          간편하게 메모를 작성하고 관리할 수 있는 서비스입니다.
        </p>
        
        <div className="space-y-4">
          <Link 
            to="/login"
            className="block w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            로그인
          </Link>
          <Link 
            to="/signup"
            className="block w-full py-3 border border-gray-300 text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            회원가입
          </Link>
        </div>

        <div className="mt-8">
          <h2 className="text-gray-600 text-lg mb-4">현재 이용 가능한 기능</h2>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg text-gray-600 border border-gray-200">
              메모 미리보기 (로그인 필요)
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-gray-600 border border-gray-200">
              메모 작성 (로그인 필요)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;