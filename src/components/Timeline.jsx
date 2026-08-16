import React, { useState } from 'react';
import { Calendar, Briefcase, GraduationCap, Trophy, Mail, Send } from 'lucide-react';

const TIMELINE_DATA = [
  {
    id: 1,
    year: '2026 - 至今',
    type: 'work',
    title: 'Web前端开发工程师',
    subtitle: '某数据库服务供应商',
    description: '主导将前端老旧架构Vue2重构为基于 React 的现代化微前端方案，负责核心功能模块开发，主要使用的技术栈有React、Ant Design、Webpack等。'
  },
  {
    id: 2,
    year: '2021 - 2024',
    type: 'work',
    title: 'Web前端开发工程师',
    subtitle: '某智慧工地企业',
    description: '负责核心功能模块开发，主要使用的技术栈有Vue、Element UI、Echarts等。后续Vue转React。开始单独开发及项目推进'
  },
  {
    id: 3,
    year: '2017 - 2021',
    type: 'edu',
    title: '软件工程',
    subtitle: '某普通二本院校',
    description: '主修操作系统、数据库系统、编译原理等核心课程。'
  }
];

const SKILLS = [
  { name: 'React / Vue', percent: 95 },
  { name: 'JavaScript / TypeScript', percent: 92 },
  { name: 'Node.js / Python / Go', percent: 45 },
  { name: 'CSS / Glassmorphism / UI Design', percent: 90 },
];

export default function Timeline() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('请填齐所有留言表单！');
      return;
    }

    setSubmitStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `📬 来自 ${formData.name} 的新留言`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 4000);
      } else {
        console.error('Web3Forms 错误:', result);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 4000);
      }
    } catch (err) {
      console.error('网络请求失败:', err);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 4000);
    }
  };

  return (
    <section className="animate-fade-up" style={{ padding: '2rem 0 5rem 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>

        {/* About Me Details */}
        <div className="glass" style={{
          padding: '2.5rem',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          marginBottom: '3rem',
          textAlign: 'left'
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }} className="gradient-text">
            关于我 (About Me)
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
            我是陈永真，一名沉浸于创造美好数字世界的全栈工程师与界面设计师。我热衷于编写优雅、高可读性的代码，同时也极其挑剔视觉交互细节。
            我的口头禅是“代码是诗，界面是画”。目前主要致力于研发高性能的前端系统，并热衷于将优秀的 UI 设计理论应用到技术实践中。
          </p>
        </div>

        {/* Core Skills Section */}
        <div style={{ marginBottom: '4rem', textAlign: 'left' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy size={20} style={{ color: 'var(--accent)' }} />
            技术栈与熟练度
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {SKILLS.map((skill, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 500 }}>
                  <span style={{ color: 'var(--text-primary)' }}>{skill.name}</span>
                  <span style={{ color: 'var(--accent)' }}>{skill.percent}%</span>
                </div>
                <div style={{
                  height: '8px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: '99px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${skill.percent}%`,
                    background: 'var(--accent-gradient)',
                    borderRadius: '99px',
                    animation: 'fadeIn 1s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Grid */}
        <div style={{ marginBottom: '4rem', textAlign: 'left' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={20} style={{ color: 'var(--accent)' }} />
            成长与经历时间轴
          </h3>

          <div style={{
            position: 'relative',
            paddingLeft: '2rem',
            borderLeft: '2px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem'
          }}>
            {TIMELINE_DATA.map((item) => (
              <div key={item.id} style={{ position: 'relative' }}>
                {/* Timeline Dot Indicator */}
                <div style={{
                  position: 'absolute',
                  left: 'calc(-2rem - 9px)',
                  top: '4px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: item.type === 'work' ? 'var(--accent)' : 'var(--bg-primary)',
                  border: '3px solid var(--accent)',
                  boxShadow: 'var(--shadow-glow)',
                  zIndex: 2
                }} />

                {/* Card Container */}
                <div className="glass" style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  transition: 'var(--transition-smooth)'
                }}>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.6rem',
                    gap: '0.5rem'
                  }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--accent)'
                    }}>
                      <Calendar size={12} />
                      {item.year}
                    </span>
                    <span style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem'
                    }}>
                      {item.type === 'work' ? <Briefcase size={12} /> : <GraduationCap size={14} />}
                      {item.subtitle}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h4>

                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass" style={{
          padding: '2.5rem',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          textAlign: 'left'
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mail size={20} style={{ color: 'var(--accent)' }} />
            给我留言
          </h3>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>姓名</label>
                <input
                  type="text"
                  placeholder="奇客"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    padding: '0.6rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-tertiary)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>邮箱</label>
                <input
                  type="email"
                  placeholder="yourname@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    padding: '0.6rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-tertiary)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>内容</label>
              <textarea
                rows={4}
                placeholder="留下您的意见或合作设想..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-tertiary)',
                  fontSize: '0.9rem',
                  resize: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitStatus === 'sending'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.7rem 1.5rem',
                borderRadius: '8px',
                background: 'var(--accent-gradient)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.95rem',
                boxShadow: 'var(--shadow-glow)',
                alignSelf: 'flex-start',
                cursor: submitStatus === 'sending' ? 'not-allowed' : 'pointer',
                opacity: submitStatus === 'sending' ? 0.7 : 1
              }}
            >
              {submitStatus === 'sending' ? '正在发送...' : (
                <>
                  发送留言
                  <Send size={16} />
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <p style={{ color: '#22c55e', fontSize: '0.9rem', fontWeight: 500, marginTop: '0.5rem' }}>
                🎉 留言已发送！我会尽快通过邮件回复您。
              </p>
            )}
            {submitStatus === 'error' && (
              <p style={{ color: '#ef4444', fontSize: '0.9rem', fontWeight: 500, marginTop: '0.5rem' }}>
                ❌ 发送失败，请稍后再试或直接发邮件联系我。
              </p>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
