import NFTView from 'components/NFTView/NFTView';
import getRandomIndex from 'utils/getRandomIndex';
import {
  backgroundRange,
  headRange,
  legsRange,
  torsoRange,
} from 'utils/mapAssets';
import styles from './ViewPage.module.css';

const InitializePage = () => {
  return (
    <main className={styles.main}>
      <NFTView
        bgIndex={getRandomIndex(backgroundRange)}
        headIndex={getRandomIndex(headRange)}
        legsIndex={getRandomIndex(legsRange)}
        torsoIndex={getRandomIndex(torsoRange)}
      />
      <NFTView
        bgIndex={getRandomIndex(backgroundRange)}
        headIndex={getRandomIndex(headRange)}
        legsIndex={getRandomIndex(legsRange)}
        torsoIndex={getRandomIndex(torsoRange)}
      />
      <NFTView
        bgIndex={getRandomIndex(backgroundRange)}
        headIndex={getRandomIndex(headRange)}
        legsIndex={getRandomIndex(legsRange)}
        torsoIndex={getRandomIndex(torsoRange)}
      />
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
