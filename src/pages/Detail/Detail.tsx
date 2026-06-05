import { useState, useEffect, useCallback, type MouseEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import designs from '../../data/designs';
import type { UIDesign } from '../../types';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../../types';
import CodeViewer from '../../components/CodeViewer/CodeViewer';
import styles from './Detail.module.css';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const design = designs.find((d) => d.id === id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // 按 Escape 退出全屏
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fullscreen]);

  if (!design) {
    return (
      <div className={styles.notFound}>
        <p>未找到该设计</p>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← 返回首页
        </button>
      </div>
    );
  }

  const colorClass = CATEGORY_COLORS[design.category];

  return (
    <>
      {/* 返回 */}
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        ← 返回
      </button>

      {/* 标题区域 */}
      <div className={styles.header}>
        <span className={`${styles.categoryTag} ${colorClass}`}>
          {CATEGORY_LABELS[design.category]}
        </span>
        <h1 className={styles.title}>{design.title}</h1>
        <p className={styles.desc}>{design.description}</p>
        <div className={styles.tags}>
          {design.tags.map((t) => (
            <span key={t} className={styles.tagItem}>#{t}</span>
          ))}
        </div>
      </div>

      {/* UI 预览区域（居中） */}
      <div className={styles.previewStage}>
        {/* 右上角操作按钮 */}
        <div className={styles.previewActions}>
          <button
            className={styles.previewActionBtn}
            onClick={() => setSidebarOpen(true)}
            title="查看代码"
          >
            📋
          </button>
          <button
            className={styles.previewActionBtn}
            onClick={() => setFullscreen(true)}
            title="全屏预览"
          >
            ⛶
          </button>
        </div>
        <DesignPreview design={design} />
      </div>

      {/* 右侧代码侧边栏 */}
      {sidebarOpen && (
        <>
          <div
            className={styles.sidebarOverlay}
            onClick={() => setSidebarOpen(false)}
          />
          <aside className={styles.sidebarPanel}>
            <div className={styles.sidebarHeader}>
              <span className={styles.sidebarTitle}>代码</span>
              <button
                className={styles.sidebarClose}
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className={styles.sidebarBody}>
              <CodeViewer
                reactCode={design.reactCode}
                cssCode={design.cssCode}
              />
            </div>
          </aside>
        </>
      )}

      {/* 全屏预览浮层 */}
      {fullscreen && (
        <div className={styles.fullscreenOverlay}>
          <button
            className={styles.fullscreenClose}
            onClick={() => setFullscreen(false)}
          >
            ✕ 退出全屏
          </button>
          <div
            className={styles.fullscreenStage}
            onClick={(e) => e.stopPropagation()}
          >
            <DesignPreview design={design} />
          </div>
        </div>
      )}
    </>
  );
}

/* ========== 各设计的完整尺寸预览 ========== */

function DesignPreview({ design }: { design: UIDesign }) {
  switch (design.id) {
    case 'gradient-btn':
      return (
        <div className="flex items-center justify-center h-full">
          <button
            className="relative border-none rounded-xl text-white text-base font-semibold cursor-pointer overflow-hidden px-9 py-3.5"
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
              transition: 'transform 0.2s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(118,75,162,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(102,126,234,0.4)';
            }}
          >
            Hover Me
          </button>
        </div>
      );

    case 'hover-card':
      return (
        <div
          className="flex items-center justify-center h-full"
          style={{ background: 'linear-gradient(135deg, #e0e7ff, #fae8ff, #e0e7ff)' }}
        >
          <div
            className="rounded-2xl px-7 py-7 w-72 cursor-default"
            style={{
              background: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.4)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.06)';
            }}
          >
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Glassmorphism Card</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              这是一张带有毛玻璃效果的卡片，悬浮时会有平滑的上浮动画。
            </p>
          </div>
        </div>
      );

    case 'pulse-loader':
      return (
        <div className="flex items-center justify-center h-full gap-2.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 14,
                height: 14,
                background: ['#6366f1', '#8b5cf6', '#a78bfa'][i],
                animation: `pulse-bounce-detail 1.4s ease-in-out ${i * 0.2}s infinite both`,
              }}
            />
          ))}
          <style>{`
            @keyframes pulse-bounce-detail {
              0%,80%,100% { transform:scale(0.8); opacity:0.5; }
              40% { transform:scale(1.35); opacity:1; }
            }
          `}</style>
        </div>
      );

    case 'ripple-btn':
      return <RippleButtonPreview />;

    case 'skeleton-card':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="w-72 p-5 rounded-2xl bg-white flex flex-col gap-3" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div className="h-40 rounded-xl bg-slate-200 animate-pulse" />
            <div className="h-5 w-3/5 rounded bg-slate-200 animate-pulse" />
            <div className="h-3.5 rounded bg-slate-200 animate-pulse" />
            <div className="h-3.5 w-3/4 rounded bg-slate-200 animate-pulse" />
          </div>
        </div>
      );

    case 'spinner':
      return (
        <div className="flex items-center justify-center h-full">
          <div
            className="rounded-full"
            style={{
              width: 48,
              height: 48,
              background: 'conic-gradient(from 0deg, #6366f1, #a78bfa, #e0e7ff, #6366f1)',
              animation: 'spin-detail 1s linear infinite',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))',
              WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))',
            }}
          />
          <style>{`@keyframes spin-detail { to { transform:rotate(360deg); } }`}</style>
        </div>
      );

    default:
      return <div className="text-slate-400">暂无可预览内容</div>;
  }
}

/** 波纹按钮交互预览（独立组件以使用 hooks） */

interface Ripple {
  id: number;
  x: number;
  y: number;
}

let rippleIdCounter = 0;

function RippleButtonPreview() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = rippleIdCounter++;
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <button
        onClick={handleClick}
        className="relative border-2 border-indigo-400 rounded-lg bg-white text-indigo-400 text-base font-semibold cursor-pointer overflow-hidden px-10 py-3.5"
        style={{ transition: 'background 0.2s, color 0.2s' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#6366f1';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#fff';
          e.currentTarget.style.color = '#6366f1';
        }}
      >
        Click Me
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: r.x,
              top: r.y,
              width: 20,
              height: 20,
              background: 'rgba(255,255,255,0.5)',
              transform: 'translate(-50%, -50%) scale(0)',
              animation: 'ripple-spread-detail 0.6s ease-out',
            }}
          />
        ))}
        <style>{`
          @keyframes ripple-spread-detail {
            to { transform: translate(-50%, -50%) scale(20); opacity: 0; }
          }
        `}</style>
      </button>
    </div>
  );
}
