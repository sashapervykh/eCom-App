import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import rssLogo from './rss-logo.svg';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-content']}>
        <span> 2025 Space Real Estate</span>
        <a href="https://rs.school/" target="_blank" rel="noopener noreferrer" className={styles['footer-link']}>
          <img src={rssLogo} alt="RS School" className={styles['rss-logo']} />
        </a>
        <Link to="/about-us" className={`${styles['footer-link']} ${styles['team-link']}`}>
          © Space Team
        </Link>
      </div>
    </footer>
  );
}
