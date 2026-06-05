import { useState, useCallback } from 'react';
import styles from './CodeViewer.module.css';

type Tab = 'react' | 'css';

interface Props {
  reactCode: string;
  cssCode: string;
}

export default function CodeViewer({ reactCode, cssCode }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('react');
  const [copied, setCopied] = useState(false);

  const currentCode = activeTab === 'react' ? reactCode : cssCode;

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [currentCode]);

  return (
    <div className={styles.container}>
      {/* 工具栏 */}
      <div className={styles.toolbar}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'react' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('react')}
          >
            React
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'css' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('css')}
          >
            CSS
          </button>
        </div>

        <div className={styles.actions}>
          <button className={styles.actionBtn} onClick={handleCopy} title="复制代码">
            {copied ? '✓ 已复制' : '📋 复制'}
          </button>
        </div>
      </div>

      {/* 代码区域 */}
      <pre className={styles.codeBlock}>
        <code>{currentCode}</code>
      </pre>
    </div>
  );
}
