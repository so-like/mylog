import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogCard({ article, onClick }) {
  const { title, summary, category, tags, date, readTime } = article;

  return (
    <article 
      onClick={onClick}
      className="glass card-hover" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        padding: '1.5rem',
        cursor: 'pointer',
        height: '100%',
        border: '1px solid var(--border-color)',
        transition: 'var(--transition-smooth)'
      }}
    >
      {/* Category and Tags */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          background: 'rgba(79, 70, 229, 0.1)',
          color: 'var(--accent)',
          padding: '0.2rem 0.6rem',
          borderRadius: '4px',
          letterSpacing: '0.5px'
        }}>
          {category}
        </span>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              background: 'var(--bg-tertiary)',
              padding: '0.1rem 0.4rem',
              borderRadius: '4px'
            }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.25rem',
        fontWeight: 700,
        lineHeight: 1.4,
        marginBottom: '0.6rem',
        color: 'var(--text-primary)',
        transition: 'var(--transition-fast)'
      }}>
        {title}
      </h3>

      {/* Summary */}
      <p style={{
        fontSize: '0.92rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        marginBottom: '1.2rem',
        flexGrow: 1,
        // 限制在三行内
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {summary}
      </p>

      {/* Metadata and Link */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '0.8rem',
        marginTop: 'auto',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <Calendar size={12} />
            {date}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <Clock size={12} />
            {readTime}
          </span>
        </div>
        
        <span 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.2rem', 
            fontWeight: 600,
            color: 'var(--accent)',
            fontSize: '0.85rem'
          }}
          className="read-more-btn"
        >
          阅读
          <ArrowRight size={14} className="arrow-icon" style={{ transition: 'transform 0.3s ease' }} />
        </span>
      </div>
    </article>
  );
}
