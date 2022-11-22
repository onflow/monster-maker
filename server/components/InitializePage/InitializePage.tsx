import styles from './HomePage.module.css';
import NFTView from 'components/NFTView/NFTView';
import {
  headRange,
  backgroundRange,
  legsRange,
  torsoRange,
} from 'utils/mapAssets';
import Image from 'next/image';
import getRandomIndex from 'utils/getRandomIndex';

const HomePage = () => {
  return (
    <main className={styles.main}>
      <Image src="/images/logo.png" alt="logo" height="100" width="268" />

      <NFTView
        bgIndex={getRandomIndex(backgroundRange())}
        headIndex={getRandomIndex(headRange())}
        legsIndex={getRandomIndex(legsRange())}
        torsoIndex={getRandomIndex(torsoRange())}
      />
    </main>
  );
};

export default HomePage;
