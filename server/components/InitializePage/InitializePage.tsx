import NFTView from 'components/NFTView/NFTView';
import getRandomInt from 'utils/getRandomInt';
import {
  NUM_BACKGROUND_IMAGES,
  NUM_HEAD_IMAGES,
  NUM_LEGS_IMAGES,
  NUM_TORSO_IMAGES,
} from 'utils/imageAssets';
import styles from './InitializePage.module.css';

const InitializePage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.opacityWrapper}>
        <NFTView
          bgIndex={getRandomInt(NUM_BACKGROUND_IMAGES)}
          headIndex={getRandomInt(NUM_HEAD_IMAGES)}
          legsIndex={getRandomInt(NUM_LEGS_IMAGES)}
          torsoIndex={getRandomInt(NUM_TORSO_IMAGES)}
        />
      </div>
    </main>
  );
};

export default InitializePage;
