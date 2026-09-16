import React from 'react';
import { GraduationCap } from 'lucide-react';
import { LegalTabId } from '../legalData';

export interface FooterProps {
  viewMode: 'dashboard' | 'legal';
  legalTab: LegalTabId;
  onOpenDashboard: () => void;
  onOpenLegal: (tab: LegalTabId) => void;
}

export const Footer: React.FC<FooterProps> = ({
  viewMode,
  legalTab,
  onOpenDashboard,
  onOpenLegal,
}) => {
  return (
    <footer id="about" className="border-t border-gray-900 bg-black/80 mt-auto py-8 px-4 sm:px-6 relative z-10 shrink-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400">
        
        <div className="flex items-center gap-3 cursor-pointer" onClick={onOpenDashboard}>
          <div className="w-8 h-8 rounded-lg bg-[#0b100c] border border-[#b5f73c]/40 p-0.5 flex items-center justify-center overflow-hidden">
            <img src="/favicon.png" alt="CareerHub Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-white font-bold text-sm">CareerHub Student Guide</span>
          <span className="text-gray-600">|</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-[#b5f73c] animate-ping" />
            爬虫数据服务持续在线
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => onOpenLegal('privacy')}
            className={`hover:text-[#b5f73c] transition-colors cursor-pointer ${
              viewMode === 'legal' && legalTab === 'privacy' ? 'text-[#b5f73c] font-bold' : ''
            }`}
          >
            隐私政策
          </button>
          <button
            onClick={() => onOpenLegal('sources')}
            className={`hover:text-[#b5f73c] transition-colors cursor-pointer ${
              viewMode === 'legal' && legalTab === 'sources' ? 'text-[#b5f73c] font-bold' : ''
            }`}
          >
            数据来源
          </button>
          <button
            onClick={() => onOpenLegal('terms')}
            className={`hover:text-[#b5f73c] transition-colors cursor-pointer ${
              viewMode === 'legal' && legalTab === 'terms' ? 'text-[#b5f73c] font-bold' : ''
            }`}
          >
            服务条款
          </button>
        </div>

        <p className="text-gray-600">
          © 2026 Career Plan
        </p>
      </div>
    </footer>
  );
};
