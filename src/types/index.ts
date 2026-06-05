/** UI设计分类 */
export type Category = 'buttons' | 'cards' | 'animations' | 'forms' | 'navigation' | 'others';

/** 分类中文映射 */
export const CATEGORY_LABELS: Record<Category, string> = {
  buttons: '按钮',
  cards: '卡片',
  animations: '动画',
  forms: '表单',
  navigation: '导航',
  others: '其他',
};

/** 分类对应的Tailwind颜色 */
export const CATEGORY_COLORS: Record<Category, string> = {
  buttons: 'bg-blue-100 text-blue-700',
  cards: 'bg-emerald-100 text-emerald-700',
  animations: 'bg-purple-100 text-purple-700',
  forms: 'bg-orange-100 text-orange-700',
  navigation: 'bg-cyan-100 text-cyan-700',
  others: 'bg-gray-100 text-gray-700',
};

/** UI设计条目 */
export interface UIDesign {
  id: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  /** 预览组件名称，与 data/designs 中的 component 对应 */
  previewComponent?: string;
  /** React 组件源码 */
  reactCode: string;
  /** CSS 源码 */
  cssCode: string;
}

/** 所有分类列表 */
export const ALL_CATEGORIES: Category[] = [
  'buttons',
  'cards',
  'animations',
  'forms',
  'navigation',
  'others',
];
