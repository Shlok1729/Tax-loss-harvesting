'use client';

import styles from './Header.module.css';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className={styles.topNav}>
      <div className={styles.topNavInner}>
        <div className={styles.logoSection}>
          <img
            src="/koinx-logo.png"
            alt="KoinX"
            className={styles.logoImage}
          />
        </div>
        <div className={styles.actions}>
          <button
            className={styles.themeToggle}
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className={styles.hamburgerMenu} aria-label="Menu" onClick={onToggleTheme}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M12 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
