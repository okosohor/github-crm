import { useState } from 'react';
import LoginTab from './LoginTab';
import RegisterTab from './RegisterTab';
import Button from 'ui/Button';

export default function AuthWindow() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  function handleChangeTab(tab: 'login' | 'register') {
    setActiveTab(tab);
  }

  return (
    <div className="px-4 pt-[3rem] relative h-[400px] w-[300px] bg-white gap-4 rounded-xl py-6 flex flex-col">
      <div className="p-2 bg-white left-1/2 top-0 gap-4 translate-x-[-50%] w-max translate-y-[-50%] absolute rounded-xl">
        <h2 className="font-semibold text-gray-600 text-xl">GitHub CRM</h2>
      </div>
      <div className="flex">
        <button
          onClick={e => handleChangeTab('login')}
          className={
            'w-full p-2 border-b-2 font-bold ' +
            (activeTab === 'login'
              ? 'text-violet-500 border-violet-500'
              : 'border-gray-400 text-gray-400')
          }
        >
          login
        </button>
        <button
          onClick={e => handleChangeTab('register')}
          className={
            'w-full p-2 border-b-2 font-bold ' +
            (activeTab === 'register'
              ? 'text-violet-500 border-violet-500'
              : 'border-gray-400 text-gray-400')
          }
        >
          register
        </button>
      </div>
       {activeTab === 'login' ? <LoginTab /> : <RegisterTab />}
    </div>
  );
}
