# MyLog | 现代化个人技术博客与创作空间

**MyLog** 是一个使用 **React + Vite** 架构搭建的高颜值、极速响应的个人博客系统。本项目集成了 **Supabase 云端数据库** 以实现数据实时云端持久化，并配置了完善的后台安全验证机制。支持 100% 免费托管在 Vercel 平台上，非常适合作为开发者的个人主页与技术分享空间。

---

## ✨ 项目核心特色

*   **视觉美学 (Premium Aesthetics)**：
    *   **暗黑模式切换**：支持明亮与暗黑主题平滑切换，完美适配系统偏好。
    *   **毛玻璃特效 (Glassmorphism)**：大量采用现代感的毛玻璃边框和模糊背景，页面富有层次感和呼吸感。
    *   **流畅动效**：内置渐变文字、卡片悬浮升起、打字机自我介绍动效，以及加载时的脉冲骨架屏。
*   **极致阅读体验**：
    *   **Markdown 解析**：采用 `marked` 渲染文章，阅读排版优雅。
    *   **代码高亮**：使用 `Prism.js` 针对代码块提供 tomorrow-night 语法高亮。
    *   **阅读辅助**：顶部自带**滚动阅读进度条**，右侧自动提取标题生成**浮动大纲目录 (TOC)**。
*   **独立写作后台**：
    *   **分栏实时预览**：左侧 Markdown 源码输入，右侧实时高亮渲染预览。
    *   **文章管理**：支持对已有文章列表进行可视化编辑（回填数据）和确认删除操作。
    *   **安全防护**：后台页面通过密码锁屏保护，只有校验匹配环境变量中的解锁密码后才允许进入。
*   **高可靠存储引擎 (Dual Engine)**：
    *   **首选云端**：对接 Supabase (PostgreSQL) 云数据库，数据全球同步。
    *   **降级保护**：当云端接口网络不通或凭证失效时，系统会**自动降级**为本地 `LocalStorage` 存储，保证博客页面绝不崩溃。

---

## 📂 项目目录结构

```
e:/myLog/
├── .env.local              # 本地环境变量配置文件（配置 Supabase 连接及后台密码）
├── index.html              # HTML 入口（SEO 优化与引入高亮样式）
├── package.json            # 依赖与脚本
├── vercel.json             # Vercel 单页面路由重定向配置
├── vite.config.js          # Vite 配置文件
└── src/
    ├── main.jsx            # React 渲染入口
    ├── App.jsx             # 核心路由与状态管理层（加载状态、骨架屏协调）
    ├── index.css           # 全局 Vanilla CSS 设计系统与动画
    ├── components/         # 可复用 React UI 组件
    │   ├── Navbar.jsx      # 毛玻璃导航栏与主题切换按钮
    │   ├── Hero.jsx        # 打字机动效个人简介与社交账号入口
    │   ├── BlogCard.jsx    # 博客文章卡片
    │   ├── BlogList.jsx    # 文章模糊搜索与分类无刷新筛选
    │   ├── ArticleModal.jsx# 文章详情弹窗阅读器（TOC、代码高亮、进度条）
    │   ├── Timeline.jsx    # 关于我成长时间轴、专业技能进度条与留言表单
    │   └── AdminPanel.jsx  # 管理后台锁屏与分栏 Markdown 编辑器
    └── utils/
        └── storage.js      # 云端数据读写层与 LocalStorage 降级逻辑
```

---

## 🛠️ 本地开发指南

### 1. 安装依赖
在项目根目录下，使用 npm 安装所有开发和生产依赖：
```bash
npm install
```

### 2. 配置本地环境变量
在项目根目录下新建 `.env.local` 文件，填入您的 Supabase 数据库凭证与后台登录密码：
```env
# Supabase 云数据库凭证
VITE_SUPABASE_URL=https://您的项目ID.supabase.co
VITE_SUPABASE_ANON_KEY=您的anon_public密钥

# 写作后台解锁密码 (请修改为您自己的强密码)
VITE_ADMIN_PASSWORD=admin888
```

### 3. 运行本地开发服务器
```bash
npm run dev
```
打开浏览器访问 `http://localhost:5173` 即可预览博客项目。

---

## 🗄️ Supabase 云数据库初始化脚本

为了让您的博客能够正确地读取和保存文章，请在 [Supabase SQL Editor](https://supabase.com/) 中运行以下建表 SQL 语句：

```sql
-- 1. 创建博客文章表 (兼容前端驼峰命名)
create table public.articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  summary text not null,
  category text not null,
  tags text[] not null default '{}',
  date text not null,
  "readTime" text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. 禁用 RLS (行级安全策略) 以允许前端公钥进行读写
alter table public.articles disable row level security;
```

---

## 🚀 Vercel 线上托管部署配置

本项目已配置 [vercel.json](file:///e:/myLog/vercel.json)，支持完美部署到 Vercel 平台：

1. 将代码提交并推送到您的 **GitHub** 仓库。
2. 登录 [Vercel](https://vercel.com/)，导入该 GitHub 项目仓库。
3. Vercel 会自动识别 Vite 项目并设定好构建参数，点击 **Deploy**。
4. **关键一步**：在 Vercel 对应项目的 **Settings** -> **Environment Variables** 中，手动添加以下三个环境变量：
   * `VITE_SUPABASE_URL`
   * `VITE_SUPABASE_ANON_KEY`
   * `VITE_ADMIN_PASSWORD`
5. 重新部署后，即可在公网稳定、快速地通过自定义域名秒开访问！
