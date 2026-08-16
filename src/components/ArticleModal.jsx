import React, { useEffect, useRef, useState } from 'react';
import { X, Calendar, Clock, Tag, List } from 'lucide-react';
import { marked } from 'marked';
import Prism from 'prismjs';

// 导入 Prism 主题
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';

export default function ArticleModal({ article, onClose }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headings, setHeadings] = useState([]);
  const modalBodyRef = useRef(null);
  const contentRef = useRef(null);

  // 1. 渲染后代码高亮 + 动态为主体里的标题注入 ID，用于目录跳转
  useEffect(() => {
    if (article) {
      // 触发代码高亮
      setTimeout(() => {
        Prism.highlightAll();
      }, 50);

      // 为文章中的标题动态生成并设置 ID，用于锚点定位
      if (contentRef.current) {
        const hElements = contentRef.current.querySelectorAll('h1, h2, h3');
        const extractedHeadings = [];
        
        hElements.forEach((el, index) => {
          // 生成唯一 ID
          const text = el.textContent || '';
          const id = `heading-${index}`;
          el.id = id;
          
          extractedHeadings.push({
            id,
            text,
            level: parseInt(el.tagName.replace('H', ''), 10)
          });
        });
        
        setHeadings(extractedHeadings);
      }
      
      // 弹出框重置滚动
      if (modalBodyRef.current) {
        modalBodyRef.current.scrollTop = 0;
        setScrollProgress(0);
      }
    }
  }, [article]);

  if (!article) return null;

  // 2. 监测阅读进度条
  const handleScroll = () => {
    const element = modalBodyRef.current;
    if (!element) return;
    
    const totalHeight = element.scrollHeight - element.clientHeight;
    if (totalHeight > 0) {
      const progress = (element.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    }
  };

  // 3. 将 Markdown 转换成 HTML
  const rawHtml = marked.parse(article.content);

  // 4. 目录点击平滑滚动
  const scrollToHeading = (id) => {
    const target = document.getElementById(id);
    if (target && modalBodyRef.current) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'var(--modal-overlay)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease'
    }}>
      {/* 模态框主体 */}
      <div className="glass" style={{
        position: 'relative',
        width: '90%',
        maxWidth: '1000px',
        height: '85vh',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: 'var(--card-shadow)',
        border: '1px solid var(--glass-border)'
      }}>
        {/* 顶部阅读进度条 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '4px',
          width: `${scrollProgress}%`,
          background: 'var(--accent-gradient)',
          zIndex: 1002,
          transition: 'width 0.1s ease'
        }} />

        {/* 模态框头部 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.2rem 2rem',
          borderBottom: '1px solid var(--border-color)',
          background: 'var(--bg-secondary)',
          zIndex: 1001
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              background: 'rgba(79, 70, 229, 0.1)',
              color: 'var(--accent)',
              padding: '0.2rem 0.6rem',
              borderRadius: '4px'
            }}>
              {article.category}
            </span>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              {article.tags.map((tag, idx) => (
                <span key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          <button 
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              transition: 'var(--transition-fast)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* 内容展示区（左右分栏：左侧文章，右侧目录） */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          overflow: 'hidden'
        }}>
          {/* 左侧：文章内容 */}
          <div 
            ref={modalBodyRef}
            onScroll={handleScroll}
            style={{
              flex: 1,
              padding: '2rem 3rem',
              overflowY: 'auto',
              background: 'var(--bg-secondary)'
            }}
          >
            {/* 文章头部信息 */}
            <div style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.4rem',
                fontWeight: 800,
                lineHeight: 1.25,
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}>
                {article.title}
              </h1>
              
              <div style={{
                display: 'flex',
                gap: '1.2rem',
                fontSize: '0.85rem',
                color: 'var(--text-muted)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Calendar size={14} />
                  发表于 {article.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={14} />
                  预计阅读时间 {article.readTime}
                </span>
              </div>
            </div>

            {/* 文章正文 */}
            <div 
              ref={contentRef}
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: rawHtml }}
            />
          </div>

          {/* 右侧：文章目录树 (仅在大屏幕下展示，且有标题时显示) */}
          {headings.length > 0 && (
            <aside style={{
              width: '260px',
              borderLeft: '1px solid var(--border-color)',
              padding: '2rem 1.5rem',
              background: 'var(--bg-tertiary)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }} className="toc-aside">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                <List size={16} />
                文章大纲
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {headings.map((heading) => (
                  <li 
                    key={heading.id} 
                    style={{ 
                      paddingLeft: `${(heading.level - 1) * 0.8}rem`,
                      fontSize: '0.85rem',
                      lineHeight: '1.4'
                    }}
                  >
                    <button 
                      onClick={() => scrollToHeading(heading.id)}
                      style={{
                        textAlign: 'left',
                        color: heading.level === 1 ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontWeight: heading.level === 1 ? 600 : 400,
                        transition: 'var(--transition-fast)'
                      }}
                      className="toc-link"
                    >
                      {heading.text}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>
      
      {/* 隐藏的针对移动端的 CSS 样式注入 */}
      <style>{`
        @media (max-width: 768px) {
          .toc-aside {
            display: none !important;
          }
          .glass {
            width: 95% !important;
            height: 90vh !important;
          }
          .markdown-body {
            font-size: 1rem !important;
          }
        }
        .toc-link:hover {
          color: var(--accent) !important;
          transform: translateX(2px);
        }
      `}</style>
    </div>
  );
}
