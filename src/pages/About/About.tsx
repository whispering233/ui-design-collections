import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About</h1>
      <p className={styles.text}>
        UI Design Collections 是一个个人前端 UI 设计灵感收集平台。
        在这里你可以浏览各种有趣的前端 UI 设计，查看对应的 React 和 CSS 代码，
        并自由复制使用。
      </p>
      <p className={styles.text}>
        项目基于 React + TypeScript + Tailwind CSS + CSS Modules 构建，
        纯静态站点，可部署至 GitHub Pages、Vercel 或 Cloudflare Pages。
      </p>
      <div className={styles.meta}>
        <span>📦 技术栈：pnpm + Vite + React + TypeScript + Tailwind + CSS Modules</span>
        <span>🚀 部署：纯静态，支持 GitHub Pages / Vercel / Cloudflare</span>
      </div>
    </div>
  );
}
