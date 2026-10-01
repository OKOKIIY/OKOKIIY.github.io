import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUp,
  Check,
  ChevronRight,
  ClipboardCheck,
  Copy,
  Download,
  ExternalLink,
  Github,
  Mail,
  PanelsTopLeft,
  Phone,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import './styles.css';

const githubProfile = 'https://github.com/OKOKIIY/13';
const resumePdf = '/resume/liangyujie_resume_cn.pdf';

const cases = [
  {
    id: 'baishu',
    type: '真实业务 / 白术小铺',
    tag: '业务案例',
    title: '白术小铺',
    subtitle: '先查 iPad，再买笔的兼容查询站',
    category: 'workflow',
    status: 'BUSINESS ASSET / VERIFIED',
    image: '/project-previews/baishu-shop-site.png',
    alt: '白术小铺线上兼容查询与 Apple Pencil 选购页面',
    intro: '我把白术小铺当作一个真实业务练习：先帮客户确认型号，再把商品、话术和售后边界整理成一条更容易信任的购买流程。',
    actions: [
      '我用 Apple Pencil 案例把选品、发布、客服、复盘拆成可重复的步骤。',
      '我会先问 iPad 完整型号，再说明适配、转接器和发货前实测范围。',
      '我把没有连续记录的成交结果留在假设层，不在主页夸大。',
    ],
    proof: ['线上兼容查询与匹配结果', '二手避坑与常见问题', '白术小铺账号与内容入口'],
    stack: ['Obsidian', 'Markdown', 'SOP', '业务复盘'],
    link: 'https://apple-pencil-knowledge-site.pages.dev/#match',
    linkLabel: '打开白术小铺线上站',
  },
  {
    id: 'reading',
    type: 'AI 产品 / 阅伴 AI',
    tag: 'AI 产品',
    title: '阅伴 AI',
    subtitle: '陪读型 AI 阅读器 / AI Reading Companion',
    category: 'ai',
    status: 'DEPLOYED / REPRODUCIBLE',
    image: '/project-previews/ai-reading-companion.png',
    alt: '阅伴 AI 阅读器界面截图',
    intro: '我独立做了一个本地优先的陪读型 AI 阅读器，让 AI 尽量回到原文，帮助读者继续阅读，而不是只给一段泛泛总结。',
    actions: [
      '我完成了 EPUB、TXT、Markdown 导入，以及目录、阅读进度、书签和笔记流程。',
      '我把边读边问做成带原文依据的陪读卡片，保留可能误读和下一步读法。',
      '我使用 IndexedDB、localStorage 和 Playwright，把本地数据和基础测试补进产品。',
    ],
    proof: ['在线静态入口可访问', '问答可以回到原文依据', '备份、恢复与阅读设置可继续迭代'],
    stack: ['JavaScript', 'IndexedDB', 'DeepSeek API', 'Playwright'],
    link: 'https://okokiiy.github.io/13/',
    linkLabel: '访问在线演示',
  },
  {
    id: 'workbench',
    type: 'AI 工具 / 个人工作台',
    tag: '流程与工具',
    title: '个人 AI 工作台',
    subtitle: '把建议、审批、执行和证据放进可控流程',
    category: 'workflow',
    status: 'LOCAL POC / CONTROLLED FLOW',
    image: '/project-previews/ai-workbench.png',
    alt: '个人 AI 工作台项目界面结构演示',
    intro: '我在个人 AI 工作台里练习把 AI 协作放进可控流程：我会先整理和解释，再由本人确认具体动作，最后留下可复核的结果。',
    actions: [
      '我把收件箱、项目、任务、一次性授权、离线队列和执行账本拆成独立状态。',
      '我保留人工批准、设备边界和授权过期，不把“能调用”写成“能自动交付”。',
      '我围绕授权和队列状态机完成过 23 个聚焦测试，仍把真实远程闭环留在待验证范围。',
    ],
    proof: ['一次性授权状态机', '离线任务队列与恢复', '23 个聚焦测试通过'],
    stack: ['React', 'Node.js', 'TypeScript', '状态机'],
    link: '#contact',
    linkLabel: '联系获取演示',
  },
];

const skillGroups = [
  { icon: PanelsTopLeft, title: '我会做产品原型', text: '我习惯先把一个具体问题拆成用户路径、页面状态和能被验证的最小版本。', tags: ['需求拆解', '信息结构', '交互原型'] },
  { icon: Sparkles, title: '我会接入 AI 能力', text: '我关注 AI 输出能不能回到用户正在看的内容，而不是只展示一个看起来很聪明的回答。', tags: ['AI 应用', '提示词结构化', 'DeepSeek'] },
  { icon: Workflow, title: '我会把流程跑起来', text: '我会把重复动作整理成流程、工具、SOP 或本地数据结构，方便下一次继续用。', tags: ['React', 'Node.js', 'IndexedDB', 'SQLite'] },
  { icon: ClipboardCheck, title: '我会留下证据', text: '我会区分已经完成、可以复核和仍待验证的部分，让项目介绍和实际能力保持一致。', tags: ['Playwright', 'Smoke Test', '复盘', '证据边界'] },
];

const methodSteps = [
  ['01', '我先理解问题', '从一个真实的使用阻力开始，收窄目标。'],
  ['02', '我做出第一条路径', '先让核心页面和动作真正走通。'],
  ['03', '我把证据放进去', '截图、状态、测试和边界都能被看见。'],
  ['04', '我再继续优化', '根据使用反馈，调整体验和下一步。'],
];

function App() {
  const [filter, setFilter] = useState('all');
  const [copied, setCopied] = useState(false);
  const visibleCases = cases.filter((item) => filter === 'all' || item.category === filter);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('2675644633@qq.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = 'mailto:2675644633@qq.com';
    }
  };

  return (
    <div className="site-shell">
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="返回梁宇杰主页">
          <span className="brand-mark">LYJ</span>
          <span className="brand-copy"><strong>梁宇杰</strong><small>/ AI Product &amp; Prototype</small></span>
        </a>
        <nav className="nav-links" aria-label="主导航">
          <a href="#cases">代表案例</a>
          <a href="#method">工作方法</a>
          <a href="#skills">能力矩阵</a>
          <a href="#background">背景与匹配</a>
          <a href="#contact">联系交流</a>
        </nav>
        <div className="nav-actions">
          <a className="nav-github" href={githubProfile} target="_blank" rel="noreferrer">GitHub <ExternalLink size={13} aria-hidden="true" /></a>
          <a className="nav-contact" href="#contact">联系我</a>
        </div>
      </header>

      <main className="main-content">
        <section className="hero-section" id="top">
          <div className="hero-copy">
            <div className="status-pill"><span className="status-dot" />AI 应用产品与原型开发 · 寻找实习 / 全职机会</div>
            <h1>把 AI 想法，<br /><span>做成能用的产品。</span></h1>
            <p className="hero-lead">我是梁宇杰，河北外国语学院大数据技术专业本科在读。偏 AI 应用产品、原型开发与产品优化，习惯从具体问题出发，把页面、流程和工具做成可演示、可继续迭代的版本。</p>
            <div className="hero-actions"><a className="primary-button" href="#cases">查看代表案例 <ChevronRight size={16} aria-hidden="true" /></a><a className="secondary-button" href={resumePdf} download>下载简历（PDF） <Download size={16} aria-hidden="true" /></a></div>
            <div className="hero-tags"><span>AI 应用产品</span><span>原型开发</span><span>产品体验优化</span><span>前端与全栈原型</span></div>
          </div>
          <div className="hero-preview" aria-label="阅伴 AI 项目预览">
            <div className="preview-window-bar"><div className="window-lights"><i /><i /><i /></div><span>阅伴 AI · Reader Canvas</span><b><span className="live-dot" />LIVE VERIFIED</b></div>
            <div className="preview-surface"><div className="preview-meta"><span>▣ 《现代技术架构与系统评估》.epub</span><em>84% 进度</em></div><div className="preview-grid"><div className="preview-reading"><img src="/project-previews/ai-reading-companion.png" alt="阅伴 AI 阅读器项目界面" /></div><div className="preview-aside"><span>证据链式 AI 阅读</span><strong>为什么我们读不下去</strong><p>我让回答回到原文，再给出下一步读法。</p><div className="preview-progress"><i /></div><small>本地数据 · 阅读记录 · 陪读卡片</small></div></div></div>
            <div className="preview-footer"><span>本地优先 / 真实项目截图</span><a href="https://okokiiy.github.io/13/" target="_blank" rel="noreferrer" aria-label="打开阅伴 AI 在线入口"><ExternalLink size={15} aria-hidden="true" /></a></div>
          </div>
        </section>

        <section className="intro-grid" aria-label="自我介绍摘要">
          <article><span className="intro-icon">01</span><h2>我在做什么</h2><p>我把 AI 能力、页面体验和真实工作流程连起来，做成别人可以理解、操作和继续使用的版本。</p></article>
          <article><span className="intro-icon">02</span><h2>我擅长什么</h2><p>我擅长从具体问题开始，把需求拆成原型、状态、数据和证据，再推进到可演示的结果。</p></article>
          <article><span className="intro-icon">03</span><h2>我想去哪里</h2><p>我希望在 AI 应用、产品优化或工具型产品团队里，继续参与从 0 到 1 的落地和迭代。</p></article>
        </section>

        <section className="cases-section" id="cases">
          <div className="section-head"><div><span className="section-eyebrow">真实落地与原型探索</span><h2>代表案例 // 我做成的，不只是页面</h2><p>下面只放我目前最愿意在面试里讲清楚的三件事。</p></div><div className="case-filter" role="group" aria-label="案例筛选">{[['all', '全部案例'], ['ai', 'AI 产品'], ['workflow', '流程与工具']].map(([value, label]) => <button key={value} type="button" className={filter === value ? 'active' : ''} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>)}</div></div>
          <div className="case-list">{visibleCases.map((item) => <article className="case-card" key={item.id}>
            <div className="case-card-head"><div className="case-heading"><span className={`case-number ${item.category}`}>{item.tag}</span><span className="case-type">{item.type}</span><h3>{item.title}</h3></div><span className={`case-status ${item.category}`}>{item.status}</span></div>
            <div className="case-body">
              <div className="case-copy"><div className="case-block"><span className="block-label">【我怎么介绍它】</span><p className="case-intro">{item.intro}</p></div><div className="case-block"><span className="block-label blue">【我在里面做了什么】</span><ul>{item.actions.map((action) => <li key={action}><Check size={15} aria-hidden="true" />{action}</li>)}</ul></div><div className="case-block"><span className="block-label">【我能拿出的证据】</span><div className="proof-list">{item.proof.map((proof) => <span key={proof}><Check size={14} aria-hidden="true" />{proof}</span>)}</div></div></div>
              <div className="case-evidence"><div className="evidence-label">CASE EVIDENCE / 截图与技术记录</div><div className="evidence-image"><img src={item.image} alt={item.alt} /></div><div className="evidence-caption"><strong>{item.subtitle}</strong><span>真实项目截图 / 统一 16:9 封面</span></div><div className="stack-tags">{item.stack.map((tech) => <span key={tech}>{tech}</span>)}</div><a className="case-link" href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel={item.link.startsWith('http') ? 'noreferrer' : undefined}>{item.linkLabel} <ExternalLink size={15} aria-hidden="true" /></a></div>
            </div>
          </article>)}</div>
        </section>

        <section className="method-section" id="method"><div className="method-panel"><div className="method-head"><div><span className="section-eyebrow">我的工作方式</span><h2>我会把事情推到能被看见。</h2><p>我不把还没验证的想法说成结果；我更在意一个具体问题有没有被理解、被做出来、被验证和继续迭代。</p></div><span className="method-mark">WORKFLOW / 04</span></div><div className="method-grid">{methodSteps.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><small>LYJ · PRACTICE NOTE</small></article>)}</div></div></section>

        <section className="skills-section" id="skills"><div className="section-head simple"><div><span className="section-eyebrow">能力矩阵</span><h2>我如何把产品、代码和证据放在一起。</h2></div><span className="section-side-note">CAPABILITY MAP / 04</span></div><div className="skills-grid">{skillGroups.map(({ icon: Icon, title, text, tags }) => <article key={title}><div className="skill-icon"><Icon size={18} aria-hidden="true" /></div><div><h3>{title}</h3><p>{text}</p><div className="skill-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><ChevronRight size={16} aria-hidden="true" /></article>)}</div></section>

        <section className="background-section" id="background"><div className="background-copy"><span className="section-eyebrow">背景与匹配</span><h2>我是一个正在把能力做实的学生开发者。</h2><p>我目前就读于河北外国语学院大数据技术专业，本科在读。我的项目大多从一个真实问题开始，再用前端、AI、本地数据和流程化方法把它推进成可以展示的结果。</p><p>我更适合 AI 应用产品、AI 产品优化、前端 / 全栈原型实现这几类岗位。我的优势不是把自己包装成万能的人，而是能快速进入具体问题，把第一版做出来，然后继续把它变得更可靠。</p><div className="background-facts"><div><span>教育经历</span><strong>河北外国语学院</strong><small>大数据技术 · 本科在读</small></div><div><span>当前定位</span><strong>AI 应用产品与原型开发</strong><small>石家庄 / 可沟通到岗</small></div></div></div><aside className="fit-card"><span className="section-eyebrow">ROLE FIT</span><h3>我更匹配的方向</h3><ol><li><span>01</span><strong>AI 应用产品与原型开发</strong><small>我能拆需求、做页面、接能力、跑通核心流程。</small></li><li><span>02</span><strong>AI 产品优化</strong><small>我会关注信息结构、交互体验和模型能力怎样落到产品里。</small></li><li><span>03</span><strong>前端 / 全栈原型实现</strong><small>我适合把方向快速落成可试用、可迭代的骨架。</small></li></ol></aside></section>

        <section className="contact-section" id="contact"><div className="contact-head"><div><span className="section-eyebrow">联系交流</span><h2>如果你正在做 AI 应用，欢迎聊聊。</h2></div><span className="contact-status"><i />随时支持交流与到岗</span></div><div className="contact-grid"><div className="contact-card"><span>EMAIL / 邮件沟通</span><strong>2675644633@qq.com</strong><button type="button" onClick={copyEmail}>{copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}{copied ? '邮箱已复制' : '点击复制完整邮箱'}</button></div><div className="contact-card"><span>TEL &amp; WECHAT / 电话与微信</span><strong>133-8583-4697</strong><a href="tel:13385834697"><Phone size={15} aria-hidden="true" />直接拨打 / 添加微信</a></div><div className="contact-card"><span>CODE REPOSITORY / 源码主页</span><strong>github.com/OKOKIIY/13</strong><a href={githubProfile} target="_blank" rel="noreferrer"><Github size={15} aria-hidden="true" />访问 GitHub 主页</a></div></div><div className="contact-actions"><a className="primary-button" href="mailto:2675644633@qq.com"><Mail size={15} aria-hidden="true" />直接发送邮件</a><a className="secondary-button" href={resumePdf} download><Download size={15} aria-hidden="true" />下载 PDF 简历</a><span>LIANG YUJIE / VERIFIED SELF-INTRODUCTION</span></div></section>
      </main>

      <footer className="site-footer"><span><strong>梁宇杰</strong> © 2026 LIANG YUJIE · PERSONAL PORTFOLIO</span><nav><a href="#cases">案例索引</a><a href="#method">工作方法</a><a href="#skills">能力矩阵</a><a href="#background">背景与匹配</a><a href="#top">返回顶部 <ArrowUp size={13} aria-hidden="true" /></a></nav></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
