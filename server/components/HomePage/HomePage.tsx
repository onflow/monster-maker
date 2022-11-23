import styles from './HomePage.module.css';
import Image from 'next/image';

const HomePage = () => {
  return (
    <div className={styles.logoContainer}>
      <Image
        src="/images/ui/monster_maker_logo.png"
        alt="logo"
        width={2176}
        height={800}
        className={styles.logo}
      />
    </div>
  );
};

export default HomePage;
