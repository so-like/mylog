import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BlogList from './components/BlogList';
import ArticleModal from './components/ArticleModal';
import Timeline from './components/Timeline';
import AdminPanel from './components/AdminPanel';
import { getArticles } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('blog');
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化加载云端博客文章
  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (e) {
      console.error('加载文章出错:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // 当文章添加/更新/删除时，同步刷新状态
  const handleArticlesUpdate = (newArticles) => {
    setArticles(newArticles);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      paddingTop: '70px' // 避开 fixed Navbar
    }}>
      {/* 顶部导航栏 */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 主体页面内容分发 */}
      <main style={{ flex: 1 }}>
        {activeTab === 'blog' && (
          <>
            <Hero />
            
            {isLoading ? (
              /* 高级骨架屏 Loading (Aesthetic Skeleton Loader) */
              <section className="container" style={{ padding: '2rem 0 5rem 0' }}>
                <style>{`
                  @keyframes skeleton-pulse {
                    0% { background-color: var(--bg-tertiary); opacity: 0.6; }
                    50% { background-color: var(--border-color); opacity: 0.3; }
                    100% { background-color: var(--bg-tertiary); opacity: 0.6; }
                  }
                  .skeleton-box {
                    animation: skeleton-pulse 1.5s infinite ease-in-out;
                    border-radius: 6px;
                  }
                `}</style>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '1.5rem',
                  marginTop: '2rem'
                }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="glass" style={{
                      height: '280px',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      border: '1px solid var(--border-color)'
                    }}>
                      <div className="skeleton-box" style={{ width: '30%', height: '20px' }} />
                      <div className="skeleton-box" style={{ width: '85%', height: '28px', marginTop: '0.5rem' }} />
                      <div className="skeleton-box" style={{ width: '100%', height: '16px' }} />
                      <div className="skeleton-box" style={{ width: '90%', height: '16px' }} />
                      <div className="skeleton-box" style={{ width: '60%', height: '16px', marginBottom: 'auto' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.8rem' }}>
                        <div className="skeleton-box" style={{ width: '40%', height: '14px' }} />
                        <div className="skeleton-box" style={{ width: '20%', height: '14px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <BlogList articles={articles} onSelectArticle={setSelectedArticle} />
            )}
          </>
        )}

        {activeTab === 'admin' && (
          <AdminPanel articles={articles} onArticlesUpdate={handleArticlesUpdate} />
        )}

        {activeTab === 'about' && (
          <Timeline />
        )}
      </main>

      {/* 文章详情弹窗 */}
      {selectedArticle && (
        <ArticleModal 
          article={selectedArticle} 
          onClose={() => setSelectedArticle(null)} 
        />
      )}

      {/* 底部信息栏 */}
      <footer className="glass" style={{
        padding: '2rem 0',
        marginTop: 'auto',
        borderTop: '1px solid var(--border-color)',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)'
      }}>
        <div className="container">
          <p>© 2026 MyLog. The harder you work, the luckier you get.</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Powered by React + Vite. Fully Cloud-Database & ready for Vercel.
          </p>
        </div>
      </footer>
    </div>
  );
}
