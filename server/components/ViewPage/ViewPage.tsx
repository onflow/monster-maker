import NFTView from 'components/NFTView/NFTView';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useMemo } from 'react';
import { GetMonstersResponse, Monster } from 'utils/types';
import styles from './ViewPage.module.css';

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

  const descendingOrderMonsters = useMemo(
    () =>
      [...monsters].sort(
        (a, b) => parseInt(b.itemID, 10) - parseInt(a.itemID, 10),
      ),
    [monsters],
  );

  return (
    <main className={styles.main}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {descendingOrderMonsters.map(({ resourceID, component }) => {
            return (
              <div key={resourceID} className={styles.emblaSlide}>
                <NFTView
                  bgIndex={component.background}
                  headIndex={component.head}
                  legsIndex={component.legs}
                  torsoIndex={component.torso}
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
