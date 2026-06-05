import { useState } from 'react';
import type { Category } from '../../types';
import designs from '../../data/designs';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import UICard from '../../components/UICard/UICard';
import styles from './Home.module.css';

export default function Home() {
  const [category, setCategory] = useState<Category | null>(null);

  const filtered = category
    ? designs.filter((d) => d.category === category)
    : designs;

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>UI Design Collections</h1>
        <p className={styles.subtitle}>
          收集有趣的前端 UI 设计灵感，点击卡片查看代码和预览
        </p>
      </div>

      <CategoryFilter selected={category} onSelect={setCategory} />

      <div className={styles.grid}>
        {filtered.map((design) => (
          <UICard key={design.id} design={design} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className={styles.empty}>该分类下暂无设计，敬请期待 ✨</p>
      )}
    </div>
  );
}
