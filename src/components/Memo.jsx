import React, { useState } from 'react';

function Memo() {
  const [newMemo, setNewMemo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [memos, setMemos] = useState([
    {
      id: 1,
      content: '오늘 진행된 회의 내용 정리입니다. 주요 안건은 다음과 같습니다. 1. 프로젝트',
      date: '2023.05.15'
    },
    {
      id: 2,
      content: '1. 보고서 작성 2. 이메일 확인 3. 미팅 준비 4. 자료 수집 5. 발표 자료 준비',
      date: '2023.05.16'
    },
    {
      id: 3,
      content: '새로운 프로젝트를 위한 아이디어 정리: 1) 사용자 경험 개선 2) 성능',
      date: '2023.05.17'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMemo.trim()) return;

    const newMemoItem = {
      id: Date.now(),
      content: newMemo,
      date: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\. /g, '.').slice(0, -1)
    };

    setMemos([newMemoItem, ...memos]);
    setNewMemo('');
  };

  const filteredMemos = memos.filter(memo =>
    memo.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-5">
      <div className="w-[800px] h-[800px] bg-white rounded-lg border border-[#e6e6e6] p-[50px] shadow-sm">
        <h1 className="text-[32px] leading-[39px] font-bold text-[#333333] mb-[25px] text-left">
          안녕하세요, 김메모님
        </h1>

        <h2 className="text-[20px] leading-[24px] font-bold text-[#333333] mb-[13px] text-left">
          새 메모 작성
        </h2>

        <form onSubmit={handleSubmit} className="flex gap-5 mb-[14px]">
          <textarea
            value={newMemo}
            onChange={(e) => setNewMemo(e.target.value)}
            placeholder="메모 내용을 입력하세요"
            className="w-[600px] h-[80px] px-5 py-[15px] rounded-lg border border-[#cccccc] text-[14px] leading-[17px] text-[#333333] placeholder-[#808080] focus:outline-none focus:border-[#3366cc] focus:ring-1 focus:ring-[#3366cc] resize-none"
          />
          <button
            type="submit"
            className="w-[80px] h-[80px] bg-[#3366cc] text-white text-[14px] font-bold rounded-lg hover:bg-[#2952a3] transition-colors flex items-center justify-center"
          >
            저장
          </button>
        </form>

        <h2 className="text-[20px] leading-[24px] font-bold text-[#333333] mb-4 text-left">
          기존 메모 목록
        </h2>

        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="메모 검색..."
            className="w-[700px] h-[40px] px-5 rounded-lg border border-[#cccccc] text-[14px] leading-[17px] text-[#333333] placeholder-[#808080] focus:outline-none focus:border-[#3366cc] focus:ring-1 focus:ring-[#3366cc]"
          />
        </div>

        <div className="space-y-[10px]">
          {filteredMemos.map(memo => (
            <div
              key={memo.id}
              className="w-[700px] h-[80px] px-[35px] border border-[#e6e6e6] rounded-lg flex items-center justify-between"
            >
              <p className="text-[14px] leading-[17px] text-[#333333] flex-1 mr-4 text-left">
                {memo.content}
              </p>
              <span className="text-[12px] leading-[15px] text-[#808080] whitespace-nowrap">
                {memo.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Memo; 