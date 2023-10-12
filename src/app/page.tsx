import Image from 'next/image';
import styles from './page.module.css';

const Home = (): JSX.Element => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to my template!</h1>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/logo.png"
          alt="Next.js Logo"
          width={300}
          height={280}
          priority
        />
      </div>
      <div>
        <p>
          Get started by editing{' '}
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
      </div>
    </main>
  );
};

export default Home;
