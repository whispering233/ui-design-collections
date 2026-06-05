import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

interface NavItem {
  path: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
];

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>🎨 UI Collections</div>
      <ul className={styles.links}>
        {NAV_ITEMS.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      {/* 预留更多导航入口 */}
      <div className={styles.spacer} />
    </nav>
  );
}
