import React, { useState } from 'react';
import { LegalTabId } from './legalData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DashboardView } from './components/DashboardView';
import { LegalView } from './components/LegalView';
import { AuthModal } from './components/AuthModal';

export default function Student() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'trends' | 'roadmap'>('analytics');
  const [selectedIndustry, setSelectedIndustry] = useState('frontend');

  // 控制 <main> 区域内容模式（'dashboard' 首页大盘 | 'legal' 法律与隐私区）
  const [viewMode, setViewMode] = useState<'dashboard' | 'legal'>('dashboard');
  const [legalTab, setLegalTab] = useState<LegalTabId>('privacy');

  // 登录 / 注册 弹窗控制状态
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // 切换到法律隐私页面
  const openLegalPage = (tab: LegalTabId) => {
    setLegalTab(tab);
    setViewMode('legal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 返回首页大盘
  const openDashboard = () => {
    setViewMode('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 处理头部导航菜单点击
  const handleSelectNav = (tab: 'analytics' | 'trends' | 'roadmap') => {
    openDashboard();
    setActiveTab(tab);
  };

  // 打开登录/注册弹窗
  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div
      className={`bg-[#050805] text-white flex flex-col font-sans selection:bg-[#b5f73c] selection:text-black relative ${
        viewMode === 'legal' ? 'h-screen overflow-hidden' : 'min-h-screen overflow-x-hidden'
      }`}
    >
      {/* 背景波浪/发光粒子模糊蒙版 (Green Wave Particles Glow Effect) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none z-0">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#b5f73c]/10 rounded-full blur-[140px]" />
        <div className="absolute top-40 left-1/3 w-[300px] h-[200px] bg-emerald-500/10 rounded-full blur-[100px]" />

        {/* 背景网格线 (Grid Mesh) */}
        <div
          className="w-full h-full opacity-15"
          style={{
            backgroundImage: `radial-gradient(rgba(181, 247, 60, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* ==================== 1. HEADER 组件 ==================== */}
      <Header
        viewMode={viewMode}
        activeTab={activeTab}
        legalTab={legalTab}
        onOpenDashboard={openDashboard}
        onSelectNav={handleSelectNav}
        onOpenLegal={openLegalPage}
        onOpenAuth={handleOpenAuth}
      />

      {/* ==================== 2. CONTENT 主体内容区域 ==================== */}
      <main
        className={`flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 relative z-10 ${
          viewMode === 'legal'
            ? 'pt-20 h-[calc(100vh-64px)] flex flex-col overflow-hidden pb-6'
            : 'pt-24 pb-16'
        }`}
      >
        {viewMode === 'dashboard' ? (
          <DashboardView
            selectedIndustry={selectedIndustry}
            onSelectIndustry={setSelectedIndustry}
          />
        ) : (
          <LegalView
            legalTab={legalTab}
            onSelectLegalTab={setLegalTab}
          />
        )}
      </main>

      {/* ==================== 3. FOOTER 组件 (仅在 dashboard 视图下显示) ==================== */}
      {viewMode === 'dashboard' && (
        <Footer
          viewMode={viewMode}
          legalTab={legalTab}
          onOpenDashboard={openDashboard}
          onOpenLegal={openLegalPage}
        />
      )}

      {/* ==================== 4. AUTH MODAL 弹窗组件 ==================== */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </div>
  );
}
