import React, { useState } from 'react';
import 'src/manager/contact.css';

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
        <div style={{width: '100%', height: '100%', background: '#F2F3F5', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 15}} />
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
