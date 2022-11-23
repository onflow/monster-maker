import styles from './InitializePage.module.css';
import NFTView from 'components/NFTView/NFTView';
import {
  headRange,
  backgroundRange,
  legsRange,
  torsoRange,
} from 'utils/mapAssets';
import getRandomIndex from 'utils/getRandomIndex';

const InitializePage = () => {
  return (
    <main className={styles.main}>
      <NFTView
        bgIndex={getRandomIndex(backgroundRange)}
        headIndex={getRandomIndex(headRange)}
        legsIndex={getRandomIndex(legsRange)}
        torsoIndex={getRandomIndex(torsoRange)}
      />
    </main>
  );
};

export default InitializePage;
