import type { Category } from '../../types';
import { CATEGORY_LABELS, ALL_CATEGORIES } from '../../types';
import styles from './CategoryFilter.module.css';

interface Props {
  selected: Category | null;
  onSelect: (category: Category | null) => void;
}

export default function CategoryFilter({ selected, onSelect }: Props) {
  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.btn} ${selected === null ? styles.btnActive : ''}`}
        onClick={() => onSelect(null)}
      >
        全部
      </button>
      {ALL_CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`${styles.btn} ${selected === cat ? styles.btnActive : ''}`}
          onClick={() => onSelect(cat)}
        >
          {CATEGORY_LABELS[cat]}
        </button>
      ))}
    </div>
  );
}
