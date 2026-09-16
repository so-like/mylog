import React from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { LEGAL_DOCUMENTS, LegalTabId } from '../legalData';

export interface LegalViewProps {
  legalTab: LegalTabId;
  onSelectLegalTab: (tab: LegalTabId) => void;
}

export const LegalView: React.FC<LegalViewProps> = ({
  legalTab,
  onSelectLegalTab,
}) => {
  const currentDoc = LEGAL_DOCUMENTS.find(d => d.id === legalTab) || LEGAL_DOCUMENTS[0];

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 relative h-full overflow-hidden">
      {/* 左侧 1/4 目录导航栏 (完全定死静止不动) */}
      <aside className="w-full md:w-64 shrink-0 bg-[#0b100c] border border-emerald-950/80 rounded-2xl p-5 space-y-4 shadow-lg">
        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2 px-1">
          <ShieldCheck size={14} className="text-[#b5f73c]" /> 法律与合规条款
        </div>

        <nav className="flex flex-col gap-1 text-sm">
          {LEGAL_DOCUMENTS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onSelectLegalTab(doc.id as LegalTabId)}
              className={`text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                legalTab === doc.id
                  ? 'bg-[#b5f73c]/15 text-[#b5f73c] font-bold border border-[#b5f73c]/30 shadow-[0_0_15px_rgba(181,247,60,0.1)]'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900/60'
              }`}
            >
              <span>{doc.navTitle}</span>
              {legalTab === doc.id && <ChevronRight size={14} />}
            </button>
          ))}
        </nav>
      </aside>

      {/* 右侧 3/4 正文呈现区 (唯一内滚区域 - 红色框区域) */}
      <div className="flex-1 w-full h-full bg-[#0b100c] border border-emerald-950/80 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-y-auto custom-scrollbar">
        <div key={currentDoc.id} className="space-y-6 animate-fade-in pr-2">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              {currentDoc.title}
            </h1>
            <p className="text-gray-400 text-sm mt-3">
              {currentDoc.subtitle}
            </p>
            <p className="text-xs font-mono text-[#b5f73c] mt-2">
              Last updated {currentDoc.updatedAt}
            </p>
          </div>

          <hr className="border-gray-900" />

          {currentDoc.sections.map((sec, idx) => (
            <div key={idx} className="space-y-3 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {sec.heading}
              </h2>
              {sec.paragraphs?.map((p, pIdx) => (
                <p key={pIdx} className="text-gray-300 text-sm leading-relaxed">
                  {p}
                </p>
              ))}
              {sec.listItems && (
                <ul className="list-disc list-inside text-sm text-gray-400 space-y-2 leading-relaxed">
                  {sec.listItems.map((li, lIdx) => (
                    <li key={lIdx}>{li}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
