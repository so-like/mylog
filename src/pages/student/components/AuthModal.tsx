import React, { useState, useEffect } from 'react';
import { GraduationCap, X } from 'lucide-react';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>(initialMode);

  useEffect(() => {
    setAuthMode(initialMode);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b100c] border border-emerald-950/80 rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(181,247,60,0.15)] relative space-y-6 animate-fade-in">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* 弹窗 Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#0b100c] border border-[#b5f73c]/40 p-1 flex items-center justify-center shadow-[0_0_18px_rgba(181,247,60,0.35)] overflow-hidden">
            <img src="/favicon.png" alt="CareerHub Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Career<span className="text-[#b5f73c]">Hub</span>
            </h3>
            <p className="text-xs text-gray-400">解锁专属 3-5 年职业规划与技能大纲</p>
          </div>
        </div>

        {/* 登录 / 注册 Tab 切换 */}
        <div className="flex bg-black/50 border border-gray-800 rounded-full p-1 text-sm font-semibold">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 rounded-full transition-all text-center cursor-pointer ${
              authMode === 'login'
                ? 'bg-[#b5f73c] text-black font-bold shadow-[0_0_15px_rgba(181,247,60,0.3)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            登录
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2 rounded-full transition-all text-center cursor-pointer ${
              authMode === 'register'
                ? 'bg-[#b5f73c] text-black font-bold shadow-[0_0_15px_rgba(181,247,60,0.3)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            注册
          </button>
        </div>

        {/* 表单输入框 */}
        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-mono">账号 / 手机号 / 邮箱</label>
            <input
              type="text"
              placeholder="student@university.edu.cn"
              className="w-full bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b5f73c] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-mono">密码</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b5f73c] transition-colors"
            />
          </div>
          {authMode === 'register' && (
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-mono">在读高校 / 专业 (选填)</label>
              <input
                type="text"
                placeholder="例如：计算机科学与技术"
                className="w-full bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b5f73c] transition-colors"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#b5f73c] hover:bg-[#a3e635] text-black font-extrabold text-sm py-3.5 rounded-xl shadow-[0_0_20px_rgba(181,247,60,0.35)] transition-all cursor-pointer mt-2"
          >
            {authMode === 'login' ? '立即登录' : '创建新账号'}
          </button>
        </form>
      </div>
    </div>
  );
};
