import NFTView from 'components/NFTView/NFTView';
import useEmblaCarousel from 'embla-carousel-react';
import getRandomIndex from 'utils/getRandomIndex';
import {
  backgroundRange,
  headRange,
  legsRange,
  torsoRange,
} from 'utils/mapAssets';
import styles from './ViewPage.module.css';

const ViewPage = () => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <main className={styles.main}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          <div className={styles.emblaSlide}>
            <NFTView
              bgIndex={getRandomIndex(backgroundRange)}
              headIndex={getRandomIndex(headRange)}
              legsIndex={getRandomIndex(legsRange)}
              torsoIndex={getRandomIndex(torsoRange)}
            />
          </div>
          <div className={styles.emblaSlide}>
            <NFTView
              bgIndex={getRandomIndex(backgroundRange)}
              headIndex={getRandomIndex(headRange)}
              legsIndex={getRandomIndex(legsRange)}
              torsoIndex={getRandomIndex(torsoRange)}
            />
          </div>
          <div className={styles.emblaSlide}>
            <NFTView
              bgIndex={getRandomIndex(backgroundRange)}
              headIndex={getRandomIndex(headRange)}
              legsIndex={getRandomIndex(legsRange)}
              torsoIndex={getRandomIndex(torsoRange)}
            />
          </div>
          <div className={styles.emblaSlide}>
            <NFTView
              bgIndex={getRandomIndex(backgroundRange)}
              headIndex={getRandomIndex(headRange)}
              legsIndex={getRandomIndex(legsRange)}
              torsoIndex={getRandomIndex(torsoRange)}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewPage;
