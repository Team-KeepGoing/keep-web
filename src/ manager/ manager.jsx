import React, { useState } from 'react';
import './App.css';

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