import styles from './HomePage.module.css';
import Image from 'next/image';

const HomePage = () => {
  return (
    <Image
      src="/images/ui/monster_maker_logo.png"
      alt="logo"
      width="2176"
      height="800"
      className={styles.logo}
    />
  );
};

export default HomePage;
