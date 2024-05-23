import React, { useState, useCallback } from 'react';
import 'src/teacher/contact.css';

// 가정: TextWrapper, OverlapGroup 컴포넌트가 아래와 같이 정의되어 있다고 가정
const TextWrapper = ({ className, text }) => <div className={className}>{text}</div>;
const OverlapGroup = ({ children }) => <div>{children}</div>;

// studentInfo 데이터가 누락되어 있다고 가정, 임의의 데이터를 추가
const studentInfo = [
  { id: 1, name: '홍길동', studentId: '20230001', phone: '010-1234-5678' },
  // 추가적인 학생 정보...
];

function App() {
  const [activeTab, setActiveTab] = useState('비상연락처');
  const tabs = [
    {
      name: '비상연락처',
      component: () => <h1>비상연락처</h1>,
    },
    {
      name: '도서/기기 등록',
      component: () => <h1>도서/기기 등록</h1>,
    },
    {
      name: '도서/기기 관리',
      component: () => <h1>도서/기기 관리</h1>,
    },
    {
      name: '학생 정보 입력',
      component: () => <h1>학생 정보 입력</h1>,
    },
  ];

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
      <div className="App">
        <TextWrapper className="text" text="비상 연락처" />
        <TextWrapper className="text-2" text="손쉽게 학생 정보를 확인하세요." />
        {studentInfo.map((info) => (
            <OverlapGroup key={info.id}>
              <TextWrapper className="text-3" text={info.name} />
              <TextWrapper className="text-4" text={info.studentId} />
              <TextWrapper className="element" text={info.phone} />
              <div className="ellipse" />
              <OverlapGroup>
                <TextWrapper className="text-5" text="학생 정보 수정" />
              </OverlapGroup>
            </OverlapGroup>
        ))}
        <header>
          <div className="logo">KEEP</div>
          <div className="navigation">
            {tabs.map((tab) => (
                <button
                    key={tab.name}
                    className={activeTab === tab.name ? 'active' : ''}
                    onClick={() => handleTabClick(tab.name)}
                >
                  {tab.name}
                </button>
            ))}
          </div>
        </header>
        <main>
          {tabs.find((tab) => tab.name === activeTab).component()}
        </main>
      </div>
  );
}

export default App;
