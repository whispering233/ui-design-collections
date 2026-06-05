import type { UIDesign } from '../types';

/**
 * 示例 UI 设计数据
 * 每个条目包含 React 组件源码和 CSS 源码
 */
const designs: UIDesign[] = [
  {
    id: 'gradient-btn',
    title: '渐变按钮',
    description: '色彩渐变动画按钮，hover 时渐变位移并带轻微缩放效果',
    category: 'buttons',
    tags: ['渐变', '动画', 'hover'],
    reactCode: `export default function GradientButton() {
  return (
    <button className="gradient-btn">
      <span className="gradient-btn-text">Hover Me</span>
    </button>
  );
}`,
    cssCode: `.gradient-btn {
  position: relative;
  padding: 14px 36px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.gradient-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(118, 75, 162, 0.5);
}

.gradient-btn:active {
  transform: scale(0.97);
}

.gradient-btn-text {
  position: relative;
  z-index: 1;
  letter-spacing: 1px;
}`,
  },
  {
    id: 'hover-card',
    title: '悬浮卡片',
    description: '毛玻璃效果卡片，hover 时上浮并显示更明显的阴影和边框',
    category: 'cards',
    tags: ['毛玻璃', '阴影', '过渡'],
    reactCode: `export default function HoverCard() {
  return (
    <div className="hover-card">
      <div className="hover-card-icon">✨</div>
      <h3 className="hover-card-title">Glassmorphism Card</h3>
      <p className="hover-card-desc">
        这是一张带有毛玻璃效果的卡片，悬浮时会有平滑的上浮动画。
      </p>
    </div>
  );
}`,
    cssCode: `.hover-card {
  width: 300px;
  padding: 28px 24px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: default;
}

.hover-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  border-color: rgba(255, 255, 255, 0.7);
}

.hover-card-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.hover-card-title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.hover-card-desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #64748b;
}`,
  },
  {
    id: 'pulse-loader',
    title: '脉冲加载动画',
    description: '三个圆点依次脉冲放大，配合颜色过渡，用于加载等待场景',
    category: 'animations',
    tags: ['加载', '脉冲', '圆点'],
    reactCode: `export default function PulseLoader() {
  return (
    <div className="pulse-loader">
      <span className="pulse-dot" />
      <span className="pulse-dot" />
      <span className="pulse-dot" />
    </div>
  );
}`,
    cssCode: `.pulse-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
}

.pulse-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #6366f1;
  animation: pulse-bounce 1.4s ease-in-out infinite both;
}

.pulse-dot:nth-child(2) {
  animation-delay: 0.2s;
  background: #8b5cf6;
}

.pulse-dot:nth-child(3) {
  animation-delay: 0.4s;
  background: #a78bfa;
}

@keyframes pulse-bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.35);
    opacity: 1;
  }
}`,
  },
  {
    id: 'ripple-btn',
    title: '波纹按钮',
    description: '点击后在鼠标位置产生扩散波纹，带 out 环形边框动画',
    category: 'buttons',
    tags: ['波纹', '点击', '扩散'],
    reactCode: `import { useState, useCallback, type MouseEvent } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

let nextId = 0;

export default function RippleButton() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = nextId++;
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  }, []);

  return (
    <button className="ripple-btn" onClick={handleClick}>
      Click Me
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple-effect"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </button>
  );
}`,
    cssCode: `.ripple-btn {
  position: relative;
  padding: 14px 40px;
  border: 2px solid #6366f1;
  border-radius: 8px;
  background: #fff;
  color: #6366f1;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: background 0.2s, color 0.2s;
}

.ripple-btn:hover {
  background: #6366f1;
  color: #fff;
}

.ripple-effect {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%) scale(0);
  animation: ripple-spread 0.6s ease-out;
  pointer-events: none;
}

@keyframes ripple-spread {
  to {
    transform: translate(-50%, -50%) scale(20);
    opacity: 0;
  }
}`,
  },
  {
    id: 'skeleton-card',
    title: '骨架屏卡片',
    description: '内容加载前的骨架占位卡片，带有流动的 shimmer 光泽动画',
    category: 'cards',
    tags: ['骨架屏', '加载', 'shimmer'],
    reactCode: `export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line skeleton-img" />
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line skeleton-text" />
      <div className="skeleton-line skeleton-text short" />
    </div>
  );
}`,
    cssCode: `.skeleton-card {
  width: 300px;
  padding: 20px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-line {
  border-radius: 6px;
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-img {
  height: 160px;
  border-radius: 10px;
}

.skeleton-title {
  height: 20px;
  width: 60%;
}

.skeleton-text {
  height: 14px;
  width: 100%;
}

.skeleton-text.short {
  width: 75%;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,
  },
  {
    id: 'spinner',
    title: '旋转加载环',
    description: '渐变色圆环无限旋转，通过 conic-gradient 实现彩色旋转效果',
    category: 'animations',
    tags: ['旋转', '加载', '渐变色'],
    reactCode: `export default function Spinner() {
  return (
    <div className="spinner-ring" />
  );
}`,
    cssCode: `.spinner-ring {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #6366f1, #a78bfa, #e0e7ff, #6366f1);
  animation: spin 1s linear infinite;
  mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px));
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px));
}

@keyframes spin {
  to { transform: rotate(360deg); }
}`,
  },
];

export default designs;
