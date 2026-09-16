import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BarChart3, 
  TrendingUp, 
  Target, 
  Zap, 
  Cpu, 
  Globe, 
  ChevronRight, 
  BookOpen, 
  CheckCircle2 
} from 'lucide-react';

export interface DashboardViewProps {
  selectedIndustry: string;
  onSelectIndustry: (industry: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  selectedIndustry,
  onSelectIndustry,
}) => {
  return (
    <div className="space-y-24">
      {/* HERO SECTION (标语与主视觉) */}
      <section className="pt-8 pb-12 text-center flex flex-col items-center justify-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-[#b5f73c]/30 text-[#b5f73c] text-xs font-semibold tracking-wide shadow-inner">
          <Sparkles size={14} className="animate-pulse" />
          基于 2026 最新爬虫招聘数据 & 3-5年趋势大模型预测
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-white max-w-4xl">
          Data Driven. <br />
          <span className="text-[#b5f73c] drop-shadow-[0_0_25px_rgba(181,247,60,0.25)]">
            Your Future Career.
          </span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
          专为在读生与毕业生打造的智能就业规划平台。透视真实市场需求，规划个人技能树，提前布局未来 3-5 年黄金发展赛道。
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <button className="bg-[#b5f73c] text-black hover:bg-[#a3e635] transition-all font-bold text-base px-8 py-3.5 rounded-full shadow-[0_0_30px_rgba(181,247,60,0.4)] flex items-center gap-2 group cursor-pointer">
            查看就业大盘
            <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight size={16} className="text-black" />
            </div>
          </button>
          <button className="border border-gray-800 bg-black/40 hover:bg-gray-900 text-gray-200 font-medium text-base px-7 py-3.5 rounded-full transition-all flex items-center gap-2">
            探索热门技能树
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-12">
          {[
            { label: '爬取样本数据', val: '120,000+', unit: '条' },
            { label: '行业趋势分析', val: '35+', unit: '个细分领域' },
            { label: '技能大纲指南', val: '280+', unit: '技术节点' },
            { label: '预测准确率', val: '94.2%', unit: '深度模型' },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#0b100c] border border-emerald-950/80 hover:border-[#b5f73c]/30 transition-all rounded-2xl p-5 text-left group">
              <p className="text-gray-500 text-xs font-medium mb-1">{item.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#b5f73c] transition-colors">
                  {item.val}
                </span>
                <span className="text-xs text-gray-500">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 模块 1：就业市场热力 */}
      <section id="analytics" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-[#b5f73c] text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-1.5">
              <BarChart3 size={14} /> Market Analytics
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              全网真实招聘数据大盘
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-md">
            实时爬取各大招聘平台岗位要求，清洗分析得出最真实的企业选人需求与薪资走向。
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-800">
          {[
            { id: 'frontend', name: '前端/全栈开发' },
            { id: 'backend', name: '后端与云原生' },
            { id: 'ai', name: 'AI / 大模型应用' },
            { id: 'automotive', name: '汽车电子 / 嵌入式' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => onSelectIndustry(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedIndustry === tab.id
                  ? 'bg-[#b5f73c] text-black font-bold shadow-[0_0_15px_rgba(181,247,60,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0b100c] border border-emerald-950/80 rounded-2xl p-6 space-y-4 hover:border-[#b5f73c]/30 transition-all">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <TrendingUp size={18} className="text-[#b5f73c]" /> 薪资区间分布
              </h3>
              <span className="text-xs text-[#b5f73c] bg-[#b5f73c]/10 px-2 py-0.5 rounded">中位数 12K-18K</span>
            </div>
            <p className="text-xs text-gray-400">应届生/1-3年经验对应岗位的薪资频次直方图</p>
            
            <div className="space-y-3 pt-2">
              {[
                { range: '6K - 10K', pct: '22%', count: '适中' },
                { range: '10K - 15K', pct: '48%', count: '最高频' },
                { range: '15K - 22K', pct: '20%', count: '良好' },
                { range: '22K +', pct: '10%', count: '高门槛' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-300">
                    <span>{item.range}</span>
                    <span className="text-[#b5f73c]">{item.pct}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-600 to-[#b5f73c] rounded-full"
                      style={{ width: item.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b100c] border border-emerald-950/80 rounded-2xl p-6 space-y-4 hover:border-[#b5f73c]/30 transition-all md:col-span-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <Target size={18} className="text-[#b5f73c]" /> 招聘要求核心硬技能频次
              </h3>
              <span className="text-xs text-gray-400">根据 15,400+ 份JD提取</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                { skill: 'React / Next.js', freq: '88% 岗位提及', tag: '必学' },
                { skill: 'TypeScript', freq: '76% 岗位提及', tag: '必学' },
                { skill: 'Node.js / Express', freq: '54% 岗位提及', tag: '加分' },
                { skill: 'Tailwind / CSS', freq: '62% 岗位提及', tag: '必备' },
                { skill: 'AI SDK / LLM API', freq: '42% 岗位提及', tag: '新趋势' },
                { skill: 'Vite / Webpack', freq: '58% 岗位提及', tag: '基础' },
              ].map((s, i) => (
                <div key={i} className="bg-black/50 border border-gray-800 rounded-xl p-3.5 hover:border-[#b5f73c]/40 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-white text-sm">{s.skill}</span>
                    <span className="text-[10px] bg-[#b5f73c]/20 text-[#b5f73c] px-1.5 py-0.5 rounded font-mono">
                      {s.tag}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{s.freq}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 模块 2：3-5年发展趋势 */}
      <section id="trends" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-[#b5f73c] text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Zap size={14} /> 3-5 Years Forecast
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            未来 3-5 年行业风向与防淘汰评估
          </h2>
          <p className="text-gray-400 text-sm">
            技术迭代飞快，了解哪些技术在上升期，哪些面临 AI 自动化替代，提前做决策。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'AI + 全栈工程化',
              status: '极高爆发期',
              desc: '掌握大模型API接入、LangChain/Vercel AI SDK 的全栈开发者需求增长 180%。',
              badge: '+180% 增长',
              icon: Cpu,
            },
            {
              title: '智能网联汽车电子',
              status: '稳定高薪期',
              desc: '汽车智能化带来大量的车机 UI、自动驾驶可视化、嵌入式系统与车载软件需求。',
              badge: '需求强劲',
              icon: Globe,
            },
            {
              title: '传统低代码 / 基础模板',
              status: '逐渐萎缩期',
              desc: '单纯的静态页面搭建容易被 AI 助手直接生成，需向复杂业务逻辑或高性能方向转型。',
              badge: '需警惕防替代',
              icon: Target,
            },
          ].map((item, i) => (
            <div 
              key={i} 
              className="bg-[#0b100c] border border-emerald-950/80 hover:border-[#b5f73c]/50 rounded-2xl p-6 flex flex-col justify-between space-y-4 group transition-all"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-[#b5f73c]/30 text-[#b5f73c] flex items-center justify-center">
                  <item.icon size={24} />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-xl">{item.title}</h3>
                  <span className="text-xs bg-[#b5f73c] text-black font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-gray-900 flex items-center justify-between text-xs text-gray-500">
                <span>趋势评估: <strong className="text-gray-200">{item.status}</strong></span>
                <span className="text-[#b5f73c] group-hover:translate-x-1 transition-transform flex items-center gap-1 cursor-pointer">
                  详细分析 <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 模块 3：学习路线图 */}
      <section id="roadmap" className="space-y-8 bg-[#070d08] border border-emerald-950 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-[#b5f73c] text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
              <BookOpen size={14} /> Learning Roadmap
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              毕业生专属学习路线与技能树
            </h2>
            <p className="text-gray-400 text-sm">
              摒弃花哨课程，遵循企业实际项目技术链路倒推的学习路线图。
            </p>
          </div>
          <button className="bg-[#b5f73c] text-black font-bold text-sm px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(181,247,60,0.3)] hover:bg-[#a3e635] transition-all whitespace-nowrap self-start md:self-auto">
            生成我的个人规划
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {[
            {
              step: 'Phase 01',
              title: '打牢基石与工程化',
              items: ['HTML5 / CSS3 / ES6+ 标准', 'React 19 / Modern Hooks', 'TypeScript 强类型系统', 'Git 协作与 Vite 打包工具'],
              time: '建议周期: 1 - 2 个月'
            },
            {
              step: 'Phase 02',
              title: '企业级全栈与架构扩展',
              items: ['Next.js App Router 服务端渲染', 'Tailwind CSS 极速样式开发', 'Supabase / PostgreSQL 数据库', 'RESTful API & GraphQL'],
              time: '建议周期: 2 - 3 个月'
            },
            {
              step: 'Phase 03',
              title: 'AI赋能与实战项目落地',
              items: ['Vercel AI SDK / OpenAI API', '高性能数据可视化 (ECharts)', '云端一键部署 (Vercel / Docker)', '打造完整的个人作品集'],
              time: '建议周期: 1 - 2 个月'
            },
          ].map((phase, idx) => (
            <div key={idx} className="bg-black/60 border border-gray-800 rounded-2xl p-6 relative group hover:border-[#b5f73c]/40 transition-colors">
              <span className="text-xs font-mono text-[#b5f73c] bg-[#b5f73c]/10 border border-[#b5f73c]/20 px-2.5 py-1 rounded-full">
                {phase.step}
              </span>
              <h4 className="text-white font-bold text-lg mt-3 mb-1">{phase.title}</h4>
              <p className="text-xs text-gray-500 mb-4">{phase.time}</p>

              <ul className="space-y-2.5 text-xs text-gray-300">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#b5f73c] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
