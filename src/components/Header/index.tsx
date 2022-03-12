import Link from 'next/link';
import styles from './header.module.scss';

export const Header = () => (
  <header className={styles.container}>
    <div className={styles.wrapper}>
      <Link href="/">
        <a>
          <img src="/images/logo.svg" alt="logo" className={styles.logo} />
        </a>
      </Link>
    </div>
  </header>
);

