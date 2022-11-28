import NFTView from 'components/NFTView/NFTView';
import getRandomIndex from 'utils/getRandomIndex';
import {
  backgroundRange,
  headRange,
  legsRange,
  torsoRange,
} from 'utils/mapAssets';
import styles from './InitializePage.module.css';

const InitializePage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.opacityWrapper}>
        <NFTView
          bgIndex={getRandomIndex(backgroundRange)}
          headIndex={getRandomIndex(headRange)}
          legsIndex={getRandomIndex(legsRange)}
          torsoIndex={getRandomIndex(torsoRange)}
        />
      </div>
    </main>
  );
};

export default InitializePage;
