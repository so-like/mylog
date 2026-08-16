import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Folder } from 'lucide-react';
import BlogCard from './BlogCard';

const CATEGORIES = ['全部', '技术', '设计', '随笔'];

export default function BlogList({ articles, onSelectArticle }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = 
        selectedCategory === '全部' || 
        article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [articles, searchTerm, selectedCategory]);

  return (
    <section className="animate-fade-up" style={{ padding: '2rem 0 5rem 0' }}>
      <div className="container">
        
        {/* Search & Filter Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          marginBottom: '2.5rem'
        }}>
          {/* Section title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Folder size={20} style={{ color: 'var(--accent)' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>
              最近文章列表
            </h2>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            width: '100%'
          }}>
            {/* Category Tabs */}
            <div className="glass" style={{
              display: 'flex',
              padding: '0.25rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              gap: '0.2rem'
            }}>
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'var(--transition-fast)',
                    background: selectedCategory === category ? 'var(--accent)' : 'transparent',
                    color: selectedCategory === category ? '#ffffff' : 'var(--text-secondary)'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Input Bar */}
            <div className="glass" style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              width: '100%',
              maxWidth: '320px',
              gap: '0.5rem'
            }}>
              <Search size={16} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="搜索文章标题或内容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  background: 'none',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Blog Cards Grid */}
        {filteredArticles.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredArticles.map(article => (
              <div key={article.id} className="animate-fade-up">
                <BlogCard 
                  article={article} 
                  onClick={() => onSelectArticle(article)} 
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="glass" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 2rem',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid var(--border-color)',
            gap: '1rem'
          }}>
            <SlidersHorizontal size={40} style={{ color: 'var(--text-muted)' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600 }}>
              未找到匹配的文章
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '300px' }}>
              请尝试更改您的搜索关键词或切换不同的分类标签。
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
