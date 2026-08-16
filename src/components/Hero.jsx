import React, { useState, useEffect } from 'react';
import { Mail, Sparkles } from 'lucide-react';

const TYPING_WORDS = ['Web开发者', '技术探索者', '网页设计师', '写作者'];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = TYPING_WORDS[wordIndex];

    // 决定打字/删除速度
    const typingSpeed = isDeleting ? 40 : 100;

    const handleTyping = () => {
      if (!isDeleting) {
        // 打字中
        setCurrentText(currentWord.substring(0, currentText.length + 1));

        if (currentText === currentWord) {
          // 打完了，暂停一下
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // 删除中
        setCurrentText(currentWord.substring(0, currentText.length - 1));

        if (currentText === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
          return;
        }
      }

      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex]);

  return (
    <section className="animate-fade-in" style={{
      position: 'relative',
      padding: '7rem 0 3rem 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      {/* 背景发光球 (Aesthetic Glow) */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '20%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: -1,
        pointerEvents: 'none'
      }} className="animate-float" />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        maxWidth: '800px'
      }}>
        {/* Badge */}
        <div className="glass" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.4rem 1rem',
          borderRadius: '99px',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: 'var(--accent)',
          border: '1px solid var(--border-color)'
        }}>
          <Sparkles size={14} />
          欢迎来到我的个人写作空间
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '3.5rem',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-1px'
        }}>
          你好，我是{' '}
          <span className="gradient-text">
            陈永真 (Andy)
          </span>
        </h1>

        {/* Dynamic Typing Subtitle */}
        <div style={{
          fontSize: '1.8rem',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          minHeight: '2.7rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px'
        }}>
          <span>我是一名 </span>
          <span style={{ color: 'var(--accent)', position: 'relative' }}>
            {currentText}
            <span style={{
              display: 'inline-block',
              width: '3px',
              height: '1.6rem',
              backgroundColor: 'var(--accent)',
              marginLeft: '2px',
              verticalAlign: 'middle',
              animation: 'fadeIn 0.8s infinite alternate'
            }} />
          </span>
        </div>

        {/* Biography */}
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          maxWidth: '600px',
          marginTop: '0.5rem'
        }}>
          在这里，我主要分享有关前端前沿技术、优雅的 UI 动效设计、全栈工程实践以及我个人的学习思考与生活点滴。
          立志于用优雅的代码和高颜值的界面去交付美好的数字体验。
        </p>

        {/* Action Buttons & Socials */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          marginTop: '1rem'
        }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass card-hover"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              fontWeight: 500,
              fontSize: '0.95rem'
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            GitHub
          </a>

          <a
            href="mailto:link@example.com"
            className="card-hover"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              background: 'var(--accent-gradient)',
              color: '#ffffff',
              fontWeight: 500,
              fontSize: '0.95rem',
              boxShadow: 'var(--shadow-glow)'
            }}
          >
            <Mail size={18} />
            联系我
          </a>
        </div>
      </div>
    </section>
  );
}
