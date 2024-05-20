import React, { useState } from 'react';
import 'src/teacher/contact.css';

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
export const Box = () => {
  return (
  <div className="box">
  <img className="line" alt="Line" src="line-1.svg" />
  <div className="box"></div>
  </div>
  );
  };

export default App;
