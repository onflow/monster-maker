import NFTView from 'components/NFTView/NFTView';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './ViewPage.module.css';

const ViewPage = ({ monsters }: { monsters: any }) => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <main className={styles.main}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {monsters &&
            monsters.map((monster: any) => {
              console.log(monster);
              return (
                <div className={styles.emblaSlide}>
                  <NFTView
                    bgIndex={monster.component.background}
                    headIndex={monster.component.head}
                    legsIndex={monster.component.legs}
                    torsoIndex={monster.component.torso}
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
