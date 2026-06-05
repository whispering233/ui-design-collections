import { useNavigate } from 'react-router-dom';
import type { UIDesign } from '../../types';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../../types';
import styles from './UICard.module.css';

interface Props {
  design: UIDesign;
}

export default function UICard({ design }: Props) {
  const navigate = useNavigate();
  const colorClass = CATEGORY_COLORS[design.category];

  return (
    <article
      className={styles.card}
      onClick={() => navigate(`/detail/${design.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/detail/${design.id}`);
      }}
    >
      {/* 预览占位区：用纯 CSS 模拟组件外观 */}
      <div className={styles.preview} data-preview={design.id}>
        <PreviewPlaceholder id={design.id} />
      </div>

      <div className={styles.body}>
        <span className={`${styles.tag} ${colorClass}`}>
          {CATEGORY_LABELS[design.category]}
        </span>
        <h3 className={styles.title}>{design.title}</h3>
        <p className={styles.desc}>{design.description}</p>
        <div className={styles.tags}>
          {design.tags.map((t) => (
            <span key={t} className={styles.tagItem}>#{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

/** 卡片中的迷你预览占位 */
function PreviewPlaceholder({ id }: { id: string }) {
  switch (id) {
    case 'gradient-btn':
      return (
        <div className="flex items-center justify-center h-full">
          <div
            className="rounded-xl px-6 py-2.5 text-white text-sm font-semibold"
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
            }}
          >
            Hover Me
          </div>
        </div>
      );
    case 'hover-card':
      return (
        <div className="flex items-center justify-center h-full">
          <div
            className="rounded-2xl p-4 w-40"
            style={{
              background: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.4)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            }}
          >
            <div className="text-2xl mb-1">✨</div>
            <div className="text-xs font-bold text-slate-800">Card</div>
            <div className="text-xs text-slate-500 mt-1">Glass effect</div>
          </div>
        </div>
      );
    case 'pulse-loader':
      return (
        <div className="flex items-center justify-center h-full gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 12,
                height: 12,
                background: ['#6366f1', '#8b5cf6', '#a78bfa'][i],
                animation: `pulse-kf 1.4s ease-in-out ${i * 0.2}s infinite both`,
              }}
            />
          ))}
          <style>{`
            @keyframes pulse-kf {
              0%,80%,100% { transform:scale(0.8); opacity:0.5; }
              40% { transform:scale(1.35); opacity:1; }
            }
          `}</style>
        </div>
      );
    case 'ripple-btn':
      return (
        <div className="flex items-center justify-center h-full">
          <div
            className="rounded-lg px-8 py-2.5 text-sm font-semibold border-2"
            style={{ borderColor: '#6366f1', color: '#6366f1' }}
          >
            Click Me
          </div>
        </div>
      );
    case 'skeleton-card':
      return (
        <div className="flex flex-col gap-2 p-3 h-full justify-center">
          <div className="h-16 rounded-lg bg-slate-200 animate-pulse" />
          <div className="h-3 w-3/5 rounded bg-slate-200 animate-pulse" />
          <div className="h-2.5 rounded bg-slate-200 animate-pulse" />
          <div className="h-2.5 w-4/5 rounded bg-slate-200 animate-pulse" />
        </div>
      );
    case 'spinner':
      return (
        <div className="flex items-center justify-center h-full">
          <div
            className="rounded-full"
            style={{
              width: 36,
              height: 36,
              background: 'conic-gradient(from 0deg, #6366f1, #a78bfa, #e0e7ff, #6366f1)',
              animation: 'spin-kf 1s linear infinite',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))',
              WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))',
            }}
          />
          <style>{`@keyframes spin-kf { to { transform:rotate(360deg); } }`}</style>
        </div>
      );
    default:
      return <div className="text-slate-400 text-sm">预览</div>;
  }
}
