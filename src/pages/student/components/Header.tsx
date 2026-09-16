import React from 'react';
import { GraduationCap, ChevronRight } from 'lucide-react';
import { LegalTabId } from '../legalData';

export interface HeaderProps {
  viewMode: 'dashboard' | 'legal';
  activeTab: 'analytics' | 'trends' | 'roadmap';
  legalTab: LegalTabId;
  onOpenDashboard: () => void;
  onSelectNav: (tab: 'analytics' | 'trends' | 'roadmap') => void;
  onOpenLegal: (tab: LegalTabId) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  activeTab,
  legalTab,
  onOpenDashboard,
  onSelectNav,
  onOpenLegal,
  onOpenAuth,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050805]/95 backdrop-blur-xl border-b border-[#b5f73c]/20 px-4 sm:px-8 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo & 名称 (点击可返回首页大盘) */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onOpenDashboard}>
          <div className="w-10 h-10 rounded-xl bg-[#0b100c] border border-[#b5f73c]/40 p-1 flex items-center justify-center shadow-[0_0_18px_rgba(181,247,60,0.35)] overflow-hidden">
            <img src="/favicon.png" alt="CareerHub Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              Career<span className="text-[#b5f73c]">Hub</span>
            </span>
          </div>
        </div>

        {/* 导航菜单 (Nav Links) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a
            href="#analytics"
            onClick={(e) => {
              e.preventDefault();
              onSelectNav('analytics');
            }}
            className={`transition-colors hover:text-[#b5f73c] ${viewMode === 'dashboard' && activeTab === 'analytics'
                ? 'text-[#b5f73c] font-semibold'
                : ''
              }`}
          >
            就业大盘
          </a>
          <a
            href="#trends"
            onClick={(e) => {
              e.preventDefault();
              onSelectNav('trends');
            }}
            className={`transition-colors hover:text-[#b5f73c] ${viewMode === 'dashboard' && activeTab === 'trends'
                ? 'text-[#b5f73c] font-semibold'
                : ''
              }`}
          >
            3-5年发展风向
          </a>
          <a
            href="#roadmap"
            onClick={(e) => {
              e.preventDefault();
              onSelectNav('roadmap');
            }}
            className={`transition-colors hover:text-[#b5f73c] ${viewMode === 'dashboard' && activeTab === 'roadmap'
                ? 'text-[#b5f73c] font-semibold'
                : ''
              }`}
          >
            技能路线图
          </a>
          <button
            onClick={() => onOpenLegal('sources')}
            className={`transition-colors hover:text-[#b5f73c] ${viewMode === 'legal' && legalTab === 'sources'
                ? 'text-[#b5f73c] font-semibold'
                : ''
              }`}
          >
            数据来源
          </button>
        </nav>

        {/* 登录/注册 按钮 */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenAuth('register')}
            className="bg-[#b5f73c] text-black hover:bg-[#a3e635] transition-all font-semibold text-sm px-5 py-2 rounded-full shadow-[0_0_20px_rgba(181,247,60,0.35)] flex items-center gap-1.5 cursor-pointer"
          >
            登录/注册
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
