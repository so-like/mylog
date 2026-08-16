// Supabase 云端数据交互层 (含 LocalStorage 降级逻辑)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const STORAGE_KEY = 'mylog_articles';

// 验证 Supabase 是否已配置（排除默认的占位符）
const isSupabaseConfigured = () => {
  return (
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

// 初始化 Supabase 客户端 (仅在配置有效时)
const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// --- 初始种子数据 (用于数据库为空或本地降级时) ---
const SEED_ARTICLES = [
  {
    title: '深入浅出 React 19 与 Vite 构建极速体验',
    summary: '本文将带你探索 React 19 带来的革命性新特性（如 React Compiler、新 Hooks 和 Actions），并介绍如何配合 Vite 搭建起极速反应的现代前端开发流。',
    category: '技术',
    tags: ['React', 'Vite', '前端'],
    date: '2026-08-15',
    readTime: '5 分钟',
    content: `# 深入浅出 React 19 与 Vite 构建极速体验

随着前端开发技术的快速更迭，**React 19** 正式带来了许多令人兴奋的变化。配合极速构建工具 **Vite**，我们可以打造出开发体验和线上性能双一流的优秀应用。

## 1. React 19 核心亮点

React 19 的主要目标是提升渲染效率，并极大地精简开发者需要编写的模板代码：

*   **React Compiler (React 编译器)**：这可能是 React 历史上最重大的升级之一。React 19 将引入全新的自动记忆化编译器，开发者无需再手动书写 \`useMemo\`、\`useCallback\` 或 \`React.memo\`。编译器会在打包阶段自动分析组件并添加优化。
*   **Actions 异步数据流**：React 19 内置了对异步操作的系统化支持。例如通过 \`useActionState\`，可以极大地简化表单提交、加载状态展示及错误捕获的逻辑。
*   **全新 Hook \`use\`**：可以在条件语句或循环中直接读取 Promise 或 Context 的值。

\`\`\`javascript
// React 19 示例：使用全新 use() 动态解析 Promise
import { use, Suspense } from 'react';

function WeatherCard({ dataPromise }) {
  const weather = use(dataPromise); // 动态解包 Promise
  return <p>当前天气：{weather.temp}°C, {weather.status}</p>;
}
\`\`\`

---

## 2. 为什么选择 Vite 配合？

在以往，Webpack 漫长的冷启动和热更新时间极大地影响了工作流。而 Vite 则通过以下特性彻底改变了这一切：

1.  **基于 ESM 的开发服务器**：Vite 充分利用了现代浏览器原生支持 ES Modules 的特性。
2.  **毫秒级热更新 (HMR)**：无论项目有多大，Vite 的热模块替换速度依然快如闪电。
`
  },
  {
    title: '现代网页设计中的“毛玻璃”视觉美学与实现',
    summary: '毛玻璃 (Glassmorphic) 质感以其通透、有深度和高级感成为了现代 UI 设计的宠儿。本文将从 CSS 实现技巧、光影对比和无障碍性三个维度拆解其设计奥秘。',
    category: '设计',
    tags: ['CSS', '设计系统', '毛玻璃'],
    date: '2026-08-10',
    readTime: '4 分钟',
    content: `# 现代网页设计中的“毛玻璃”视觉美学与实现

近年来，**毛玻璃效果（Glassmorphism）** 在 Apple 的 macOS/iOS 和 Microsoft 的 Fluent Design 系统中得到了广泛的应用，并逐渐演变成现代前端设计中体现“空间通透感”和“层级纵深感”的核心技法。

## 1. 核心 CSS 属性

要实现纯净且好看的毛玻璃，重点在于 \`backdrop-filter\` 属性。它允许你对元素后面的区域应用图形效果（如模糊或颜色偏移）。

完整的毛玻璃 CSS 实现公式如下：

\`\`\`css
.glass-container {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px); /* 兼容 Safari */
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.08);
}
\`\`\`
`
  }
];

// --- 本地 LocalStorage 降级引擎 ---
const getLocalArticles = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    const initialized = SEED_ARTICLES.map((art, index) => ({
      ...art,
      id: (index + 1).toString()
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialized));
    return initialized;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

const saveLocalArticle = (article) => {
  const articles = getLocalArticles();
  let updated;
  if (article.id) {
    updated = articles.map(item => item.id === article.id ? { ...item, ...article } : item);
  } else {
    updated = [
      {
        ...article,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        readTime: `${Math.max(1, Math.ceil(article.content.length / 500))} 分钟`
      },
      ...articles
    ];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

const deleteLocalArticle = (id) => {
  const articles = getLocalArticles();
  const updated = articles.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};


// ==========================================
// === 核心数据导出接口（支持 Supabase & 本地）===
// ==========================================

// 1. 获取所有文章
export const getArticles = async () => {
  if (!isSupabaseConfigured() || !supabase) {
    console.warn('Supabase 未配置，自动降级为 LocalStorage 模式。');
    return getLocalArticles();
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    // 如果数据库为空，插入种子数据并返回
    if (!data || data.length === 0) {
      console.log('检测到云数据库为空，正在导入初始种子数据...');
      const seedPayload = SEED_ARTICLES.map(art => ({
        ...art,
        readTime: `${Math.max(1, Math.ceil(art.content.length / 500))} 分钟`
      }));
      const { data: inserted, error: insertError } = await supabase
        .from('articles')
        .insert(seedPayload)
        .select();

      if (insertError) throw insertError;
      return inserted;
    }

    return data;
  } catch (err) {
    console.error('从 Supabase 读取数据失败，降级读取 LocalStorage:', err.message);
    return getLocalArticles();
  }
};

// 2. 新增或更新文章
export const saveArticle = async (article) => {
  if (!isSupabaseConfigured() || !supabase) {
    return saveLocalArticle(article);
  }

  try {
    const readTime = `${Math.max(1, Math.ceil(article.content.length / 500))} 分钟`;
    const payload = {
      title: article.title,
      summary: article.summary,
      category: article.category,
      tags: article.tags,
      content: article.content,
      readTime
    };

    if (article.id) {
      // 更新现有文章
      const { error } = await supabase
        .from('articles')
        .update(payload)
        .eq('id', article.id);

      if (error) throw error;
    } else {
      // 插入新文章
      const { error } = await supabase
        .from('articles')
        .insert({
          ...payload,
          date: new Date().toISOString().split('T')[0]
        });

      if (error) throw error;
    }

    // 重新获取最新数据并返回
    return await getArticles();
  } catch (err) {
    console.error('Supabase 保存失败，退回 LocalStorage 保存:', err.message);
    return saveLocalArticle(article);
  }
};

// 3. 删除文章
export const deleteArticle = async (id) => {
  if (!isSupabaseConfigured() || !supabase) {
    return deleteLocalArticle(id);
  }

  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // 重新获取最新数据并返回
    return await getArticles();
  } catch (err) {
    console.error('Supabase 删除失败，退回 LocalStorage 删除:', err.message);
    return deleteLocalArticle(id);
  }
};
