import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../config/api';

function Memo() {
  const { user } = useAuth();
  const [newMemo, setNewMemo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 메모 목록 조회
  const fetchMemos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/memos`);
      if (response.data.status === 'success' && Array.isArray(response.data.data)) {
        setMemos(response.data.data);
      } else {
        setMemos([]);
      }
      setError('');
    } catch (error) {
      console.error('메모 목록 조회 실패:', error);
      setError('메모 목록을 불러오는데 실패했습니다.');
      setMemos([]);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 메모 목록 조회
  useEffect(() => {
    fetchMemos();
  }, []);

  // 메모 작성
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMemo.trim()) return;

    try {
      const response = await axios.post(`${BASE_URL}/api/memos`, {
        content: newMemo
      });
      console.log('메모 작성 응답:', response.data);
      if (response.data.status === 'success' && response.data.data) {
        // 새 메모를 목록 맨 앞에 추가
        setMemos(prevMemos => [response.data.data, ...prevMemos]);
        setNewMemo('');
        setError('');
      }
    } catch (error) {
      console.error('메모 작성 실패:', error);
      setError(error.response?.data?.message || '메모 작성에 실패했습니다.');
    }
  };

  // 검색어가 있을 때만 필터링
  const filteredMemos = searchTerm
    ? memos.filter(memo =>
        memo.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : memos;

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-5">
      <div className="w-full max-w-[800px] h-[90vh] bg-white rounded-lg border border-[#e6e6e6] p-8 md:p-[50px] shadow-sm flex flex-col">
        <h1 className="text-[32px] leading-[39px] font-bold text-[#333333] mb-[25px] text-left">
          안녕하세요, {user?.name || '사용자'}님
        </h1>

        <h2 className="text-[20px] leading-[24px] font-bold text-[#333333] mb-[13px] text-left">
          새 메모 작성
        </h2>

        <form onSubmit={handleSubmit} className="flex gap-5 mb-[14px] w-full">
          <textarea
            value={newMemo}
            onChange={(e) => setNewMemo(e.target.value)}
            placeholder="메모 내용을 입력하세요"
            className="flex-1 h-[80px] px-5 py-[15px] rounded-lg border border-[#cccccc] text-[14px] leading-[17px] text-[#333333] placeholder-[#808080] focus:outline-none focus:border-[#3366cc] focus:ring-1 focus:ring-[#3366cc] resize-none"
          />
          <button
            type="submit"
            className="w-[80px] h-[80px] bg-[#3366cc] text-white text-[14px] font-bold rounded-lg hover:bg-[#2952a3] transition-colors flex items-center justify-center flex-shrink-0"
          >
            저장
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <h2 className="text-[20px] leading-[24px] font-bold text-[#333333] mb-4 text-left">
          기존 메모 목록
        </h2>

        <div className="mb-4 w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="메모 검색..."
            className="w-full h-[40px] px-5 rounded-lg border border-[#cccccc] text-[14px] leading-[17px] text-[#333333] placeholder-[#808080] focus:outline-none focus:border-[#3366cc] focus:ring-1 focus:ring-[#3366cc]"
          />
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="space-y-[10px]">
            {loading ? (
              <p className="text-center text-gray-500">메모를 불러오는 중...</p>
            ) : filteredMemos.length > 0 ? (
              filteredMemos.map(memo => (
                <div
                  key={memo.id}
                  className="w-full h-[80px] px-[35px] border border-[#e6e6e6] rounded-lg flex items-center justify-between"
                >
                  <p className="text-[14px] leading-[17px] text-[#333333] flex-1 mr-4 text-left">
                    {memo.content}
                  </p>
                  <span className="text-[12px] leading-[15px] text-[#808080] whitespace-nowrap">
                    {memo.date}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">메모가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Memo; 