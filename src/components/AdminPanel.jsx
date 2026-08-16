import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, RefreshCw, Lock, Unlock } from 'lucide-react';
import { marked } from 'marked';
import Prism from 'prismjs';
import { saveArticle, deleteArticle } from '../utils/storage';

export default function AdminPanel({ articles, onArticlesUpdate }) {
  // 管理员后台锁定状态
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('admin_unlocked') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [currentArticle, setCurrentArticle] = useState({
    id: '',
    title: '',
    summary: '',
    category: '技术',
    tags: '',
    content: ''
  });
  
  const [isPreview, setIsPreview] = useState(true);
  const previewRef = useRef(null);

  // 当预览模式开启或正文改变时，自动触发代码高亮
  useEffect(() => {
    if (isUnlocked && isPreview && currentArticle.content) {
      setTimeout(() => {
        if (previewRef.current) {
          Prism.highlightAllUnder(previewRef.current);
        }
      }, 50);
    }
  }, [isPreview, currentArticle.content, isUnlocked]);

  // 修改字段处理器
  const handleChange = (field, val) => {
    setCurrentArticle(prev => ({ ...prev, [field]: val }));
  };

  // 密码解锁处理器
  const handleUnlock = (e) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin888';
    
    if (passwordInput === correctPassword) {
      setIsUnlocked(true);
      sessionStorage.setItem('admin_unlocked', 'true');
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setPasswordInput('');
    }
  };

  // 安全退出登录
  const handleLock = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('admin_unlocked');
  };

  // 保存文章
  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentArticle.title || !currentArticle.summary || !currentArticle.content) {
      alert('请将标题、简介和正文内容填写完整！');
      return;
    }

    const formattedTags = typeof currentArticle.tags === 'string'
      ? currentArticle.tags.split(',').map(t => t.trim()).filter(Boolean)
      : currentArticle.tags;

    const payload = {
      ...currentArticle,
      tags: formattedTags
    };

    const updated = await saveArticle(payload);
    onArticlesUpdate(updated);

    setCurrentArticle({
      id: '',
      title: '',
      summary: '',
      category: '技术',
      tags: '',
      content: ''
    });
    alert(currentArticle.id ? '文章更新成功！' : '文章发布成功！');
  };

  // 加载编辑文章
  const handleEdit = (article) => {
    setCurrentArticle({
      id: article.id,
      title: article.title,
      summary: article.summary,
      category: article.category,
      tags: article.tags.join(', '),
      content: article.content
    });
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  // 删除文章
  const handleDelete = async (id) => {
    if (window.confirm('您确定要删除这篇文章吗？此操作无法恢复！')) {
      const updated = await deleteArticle(id);
      onArticlesUpdate(updated);
      if (currentArticle.id === id) {
        setCurrentArticle({
          id: '',
          title: '',
          summary: '',
          category: '技术',
          tags: '',
          content: ''
        });
      }
    }
  };

  const handleReset = () => {
    setCurrentArticle({
      id: '',
      title: '',
      summary: '',
      category: '技术',
      tags: '',
      content: ''
    });
  };

  const getPreviewHtml = () => {
    try {
      return marked.parse(currentArticle.content || '*在左侧编辑器中输入文章内容，右侧会实时呈现预览结果。*');
    } catch (e) {
      return '<p style="color:red">解析错误</p>';
    }
  };

  // ==================== 未解锁状态渲染 ====================
  if (!isUnlocked) {
    return (
      <section style={{
        padding: '5rem 0',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }} className="animate-fade-in">
        <div className="glass" style={{
          width: '100%',
          maxWidth: '420px',
          padding: '2.5rem',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          textAlign: 'center',
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.2rem'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(79, 70, 229, 0.1)',
            color: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.5rem',
            animation: 'pulse-glow 2s infinite'
          }}>
            <Lock size={26} />
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>
            后台管理已锁定
          </h3>
          
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            此页面为个人写作空间，请输入管理员密码进行解锁验证。
          </p>

          <form onSubmit={handleUnlock} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.5rem' }}>
            <input
              type="password"
              placeholder="请输入解锁密码..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{
                width: '100%',
                padding: '0.7rem 1rem',
                borderRadius: '8px',
                border: passwordError ? '1px solid #ef4444' : '1px solid var(--border-color)',
                background: 'var(--bg-tertiary)',
                fontSize: '0.95rem',
                textAlign: 'center',
                color: 'var(--text-primary)'
              }}
            />
            
            {passwordError && (
              <p style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 500 }}>
                ❌ 密码错误，请重新输入！
              </p>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '8px',
                background: 'var(--accent-gradient)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.95rem',
                boxShadow: 'var(--shadow-glow)',
                cursor: 'pointer',
                marginTop: '0.4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              验证解锁
              <Unlock size={16} />
            </button>
          </form>
        </div>
      </section>
    );
  }

  // ==================== 已解锁正常编辑后台 ====================
  return (
    <section className="animate-fade-up" style={{ padding: '2rem 0 5rem 0' }}>
      <div className="container">
        
        {/* Header Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ textAlign: 'left' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800 }} className="gradient-text">
              博客写作与管理后台
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              您已成功解锁管理权限。在这里撰写的所有文章都将自动保存并同步至您的云数据库。
            </p>
          </div>

          <button
            onClick={handleLock}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-tertiary)',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
          >
            退出锁定后台
          </button>
        </div>

        {/* 核心工作区：左右分栏编辑器 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {/* 左栏：编辑器表单 */}
          <div className="glass" style={{
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                {currentArticle.id ? '📝 编辑现有文章' : '✍️ 撰写新文章'}
              </h3>
              {currentArticle.id && (
                <button 
                  onClick={handleReset}
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    fontWeight: 600
                  }}
                >
                  <Plus size={14} />
                  切换为新建
                </button>
              )}
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>标题</label>
                <input
                  type="text"
                  placeholder="请输入文章标题"
                  value={currentArticle.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-tertiary)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '150px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>分类</label>
                  <select
                    value={currentArticle.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    style={{
                      padding: '0.6rem 0.8rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-tertiary)',
                      fontSize: '0.9rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="技术">技术</option>
                    <option value="设计">设计</option>
                    <option value="随笔">随笔</option>
                  </select>
                </div>

                <div style={{ flex: 2, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>标签 (以英文逗号隔开)</label>
                  <input
                    type="text"
                    placeholder="React, CSS, 前端"
                    value={currentArticle.tags}
                    onChange={(e) => handleChange('tags', e.target.value)}
                    style={{
                      padding: '0.6rem 0.8rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-tertiary)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>简介摘要</label>
                <input
                  type="text"
                  placeholder="简述文章核心，用于卡片展示"
                  value={currentArticle.summary}
                  onChange={(e) => handleChange('summary', e.target.value)}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-tertiary)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>正文内容 (Markdown)</label>
                <textarea
                  rows={14}
                  placeholder="# 大标题&#10;请输入正文内容...支持代码块、列表、表格"
                  value={currentArticle.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  style={{
                    padding: '0.8rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-tertiary)',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    resize: 'vertical',
                    lineHeight: '1.5'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.7rem',
                    borderRadius: '8px',
                    background: 'var(--accent-gradient)',
                    color: '#ffffff',
                    fontWeight: 600,
                    boxShadow: 'var(--shadow-glow)'
                  }}
                >
                  <Save size={16} />
                  {currentArticle.id ? '更新发布' : '发布文章'}
                </button>
                
                <button
                  type="button"
                  onClick={() => setIsPreview(prev => !prev)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.7rem 1.2rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-tertiary)'
                  }}
                >
                  {isPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                  {isPreview ? '隐藏预览' : '显示预览'}
                </button>
              </div>
            </form>
          </div>

          {/* 右栏：实时预览渲染 */}
          {isPreview && (
            <div className="glass" style={{
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '750px',
              overflow: 'hidden'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Eye size={18} style={{ color: 'var(--accent)' }} />
                实时 Markdown 渲染预览
              </h3>

              <div 
                ref={previewRef}
                className="markdown-body"
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  paddingRight: '0.5rem',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '1rem'
                }}
                dangerouslySetInnerHTML={{ __html: getPreviewHtml() }}
              />
            </div>
          )}
        </div>

        {/* 现有文章列表管理 */}
        <div className="glass" style={{
          padding: '2rem',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          textAlign: 'left'
        }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <RefreshCw size={18} style={{ color: 'var(--accent)' }} />
            管理现有文章清单
          </h3>

          {articles.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>标题</th>
                    <th style={{ padding: '0.8rem', textAlign: 'left', width: '100px' }}>分类</th>
                    <th style={{ padding: '0.8rem', textAlign: 'left', width: '120px' }}>发布日期</th>
                    <th style={{ padding: '0.8rem', textAlign: 'center', width: '140px' }}>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} className="admin-table-row">
                      <td style={{ padding: '0.8rem', fontWeight: 500 }}>{article.title}</td>
                      <td style={{ padding: '0.8rem' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          background: 'rgba(79, 70, 229, 0.08)',
                          color: 'var(--accent)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px'
                        }}>
                          {article.category}
                        </span>
                      </td>
                      <td style={{ padding: '0.8rem', color: 'var(--text-muted)' }}>{article.date}</td>
                      <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleEdit(article)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.2rem',
                              padding: '0.3rem 0.6rem',
                              borderRadius: '6px',
                              border: '1px solid var(--border-color)',
                              background: 'var(--bg-tertiary)',
                              color: 'var(--text-primary)',
                              fontSize: '0.8rem'
                            }}
                          >
                            <Edit2 size={12} />
                            编辑
                          </button>
                          
                          <button
                            onClick={() => handleDelete(article.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.2rem',
                              padding: '0.3rem 0.6rem',
                              borderRadius: '6px',
                              background: 'rgba(239, 68, 68, 0.1)',
                              color: '#ef4444',
                              fontSize: '0.8rem'
                            }}
                          >
                            <Trash2 size={12} />
                            删除
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
              暂无任何文章，请在上方写下您的第一篇博客吧！
            </p>
          )}
        </div>

      </div>
      
      <style>{`
        .admin-table-row:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }
      `}</style>
    </section>
  );
}
