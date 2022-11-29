import NFTView from 'components/NFTView/NFTView';
import useEmblaCarousel from 'embla-carousel-react';
import { GetMonstersResponse } from 'utils/types';
import styles from './ViewPage.module.css';
import { useEffect } from 'react';

interface Props {
  monsters: GetMonstersResponse;
}

const ViewPage = ({ monsters }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  // Reinitialize slider with response data
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, monsters]);

  return (
    <main className={styles.main}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {monsters.map(({ resourceID, component }) => {
            return (
              <div key={resourceID} className={styles.emblaSlide}>
                <NFTView
                  bgIndex={parseInt(component.background)}
                  headIndex={parseInt(component.head)}
                  legsIndex={parseInt(component.legs)}
                  torsoIndex={parseInt(component.torso)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default ViewPage;
