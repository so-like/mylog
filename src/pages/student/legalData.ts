export interface LegalSection {
  heading: string;
  paragraphs?: readonly string[];
  listItems?: readonly string[];
}

export interface LegalDocument {
  id: 'sources' | 'terms' | 'privacy';
  navTitle: string;
  title: string;
  subtitle: string;
  updatedAt: string;
  sections: readonly LegalSection[];
}

// 法律与隐私文档配置对象数组 (中文版)
export const LEGAL_DOCUMENTS: readonly LegalDocument[] = [
  {
    id: 'privacy',
    navTitle: '隐私政策声明',
    title: '个人隐私保护政策',
    subtitle: '当你使用 CareerHub 就业指导服务时所同意的隐私保护原则与数据处理规范。',
    updatedAt: '2026年8月24日',
    sections: [
      {
        heading: '核心概要',
        paragraphs: [
          '我们高度重视你的个人隐私，赋予你对个人数据的完全掌控权。本政策详细说明了我们在你使用 CareerHub 学生端应用时如何处理与保障相关数据安全。'
        ]
      },
      {
        heading: '1. 公开数据采集与合规范围',
        listItems: [
          '招聘大盘中所展示的所有分析数据，均来自于互联网公开发布的招聘岗位需求（如 BOSS直聘、智联招聘、LinkedIn 等）。',
          '我们绝不收集、存储或出售任何用户的敏感身份信息、联系方式或个人账号凭证。',
          '平台不包含任何追踪个人隐私的第三方广告代码或越权采集程序。'
        ]
      },
      {
        heading: '2. 浏览器本地存储 (LocalStorage) 说明',
        listItems: [
          '你在页面中选择的意向行业、筛选偏好以及保存的技能路线图进度，均仅加密保存在你本地浏览器的 localStorage 中。',
          '你可以随时通过浏览器工具清除缓存，这不会在我们的云端服务器留下任何个人追踪记录。'
        ]
      },
      {
        heading: '3. AI 职业评估与算法隐私保障',
        listItems: [
          '用户输入的技能评估数据与意向岗位仅临时用于算法倒排生成学习路线图，绝不用于任何个人画像构建或商业广告精准推送。',
          'AI 分析模型在推理过程中不会保存用户的真实姓名、手机号或学籍档案等敏感隐私信息。'
        ]
      },
      {
        heading: '4. 第三方服务与外链免责说明',
        listItems: [
          '平台中引用的第三方开源文档、官方技术社区（如 React 官网、roadmap.sh 等）均为外部独立站点，访问时请参照其独立的隐私政策。',
          '本平台不对外部第三方站点的隐私保护措施或内容合法性承担直接责任。'
        ]
      },
      {
        heading: '5. 隐私政策的修改与变更通知',
        paragraphs: [
          '我们可能会根据法律法规更新或功能迭代不定期修订本隐私政策，最新修订版本将在页面显著位置标明发布日期。重大条款变更时，我们将通过平台公告形式提醒告知。'
        ]
      }
    ]
  },
  {
    id: 'sources',
    navTitle: '数据来源与许可证',
    title: '数据来源与开源许可证说明',
    subtitle: '透明公开我们的自动化数据爬虫处理模型、开放数据接口以及开源授权协议。',
    updatedAt: '2026年8月24日',
    sections: [
      {
        heading: '数据流水线与处理架构',
        paragraphs: [
          'CareerHub 利用自动化 Python 爬虫结合 Supabase PostgreSQL 数据库，定期对全网公开招聘岗位进行清洗、去重与关键词提取，计算得出各技术栈提及频次与薪资分布区间。'
        ]
      },
      {
        heading: '开源规范与合规承诺',
        listItems: [
          '所有自动化爬虫程序均严格遵守目标网站的 Robots.txt 协议与网络合规准则。',
          '技能树与学习路线图参考了 roadmap.sh 及官方技术文档的开放标准。',
          '所有采集到的招聘数据均经过脱敏与聚合算法处理，仅用于宏观趋势统计与学术探索。'
        ]
      }
    ]
  },
  {
    id: 'terms',
    navTitle: '服务条款与使用规范',
    title: '平台服务条款',
    subtitle: '针对学生、毕业生及教育工作者使用 CareerHub 工具与数据时的通用规则。',
    updatedAt: '2026年8月24日',
    sections: [
      {
        heading: '免责声明',
        paragraphs: [
          '本平台提供的就业市场分析、岗位需求频次以及未来 3-5 年行业发展预测，仅供学习交流与职业规划参考。实际的企业招聘决策与薪资标准受宏观环境及特定公司政策影响，请结合个人实际情况合理决策。'
        ]
      },
      {
        heading: '使用授权与限制',
        listItems: [
          '未经授权，禁止任何机构或个人将本平台聚合导出的招聘统计数据用于商业化二次贩售。',
          '鼓励高校学生、教师及个人开发者自由引用本平台的学习路线图资源用于非商业性教学与个人成长。'
        ]
      }
    ]
  }
];

export type LegalTabId = LegalDocument['id'];
