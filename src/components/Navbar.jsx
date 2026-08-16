import React, { useEffect, useState } from 'react';
import { Sun, Moon, Rss, Laptop, User, PenTool } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="glass" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '70px',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 2rem'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 0
      }}>
        {/* Logo / Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => setActiveTab('blog')}>
          <Rss size={24} className="gradient-text" style={{ color: 'var(--accent)' }} />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.4rem',
            letterSpacing: '-0.5px'
          }} className="gradient-text">
            MyLog
          </span>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button 
            onClick={() => setActiveTab('blog')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 500,
              fontSize: '0.95rem',
              color: activeTab === 'blog' ? 'var(--accent)' : 'var(--text-secondary)',
              transition: 'var(--transition-fast)',
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              background: activeTab === 'blog' ? 'rgba(79, 70, 229, 0.08)' : 'transparent'
            }}
          >
            <Laptop size={16} />
            博客
          </button>
          
          <button 
            onClick={() => setActiveTab('admin')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 500,
              fontSize: '0.95rem',
              color: activeTab === 'admin' ? 'var(--accent)' : 'var(--text-secondary)',
              transition: 'var(--transition-fast)',
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              background: activeTab === 'admin' ? 'rgba(79, 70, 229, 0.08)' : 'transparent'
            }}
          >
            <PenTool size={16} />
            写作后台
          </button>

          <button 
            onClick={() => setActiveTab('about')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 500,
              fontSize: '0.95rem',
              color: activeTab === 'about' ? 'var(--accent)' : 'var(--text-secondary)',
              transition: 'var(--transition-fast)',
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              background: activeTab === 'about' ? 'rgba(79, 70, 229, 0.08)' : 'transparent'
            }}
          >
            <User size={16} />
            关于我
          </button>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              transition: 'var(--transition-fast)'
            }}
            title={theme === 'dark' ? '切换到明亮模式' : '切换到暗黑模式'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
