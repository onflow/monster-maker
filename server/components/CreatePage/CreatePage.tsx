import ArrowButton from 'components/ArrowButton';
import NFTView from 'components/NFTView/NFTView';
import usePartSelector from 'hooks/usePartSelector';
import {
  backgroundRange,
  headRange,
  legsRange,
  torsoRange,
} from 'utils/mapAssets';
import styles from './CreatePage.module.css';

interface Props {
  isMintInProgress: boolean;
}

const CreatePage = ({ isMintInProgress }: Props) => {
  const [bgIndex, incrementBg, decrementBg] = usePartSelector(backgroundRange);
  const [headIndex, incrementHead, decrementHead] = usePartSelector(headRange);
  const [torsoIndex, incrementTorso, decrementTorso] =
    usePartSelector(torsoRange);
  const [legsIndex, incrementLegs, decrementLegs] = usePartSelector(legsRange);

  return (
    <main className={styles.main}>
      <div className={styles.relativeContainer}>
        <NFTView
          bgIndex={bgIndex}
          headIndex={headIndex}
          torsoIndex={torsoIndex}
          legsIndex={legsIndex}
        />

        {!isMintInProgress && (
          <>
            <ArrowButton
              direction="up"
              onClick={decrementBg}
              alt="Change background"
              className={styles.bgDecrement}
            />

            <ArrowButton
              direction="left"
              onClick={decrementHead}
              alt="Change head"
              className={styles.headDecrement}
            />

            <ArrowButton
              direction="left"
              onClick={decrementTorso}
              alt="Change torso"
              className={styles.torsoDecrement}
            />

            <ArrowButton
              direction="left"
              onClick={decrementLegs}
              alt="Change legs"
              className={styles.legsDecrement}
            />

            <ArrowButton
              direction="right"
              onClick={incrementHead}
              alt="Change head"
              className={styles.headIncrement}
            />

            <ArrowButton
              direction="right"
              onClick={incrementTorso}
              alt="Change torso"
              className={styles.torsoIncrement}
            />

            <ArrowButton
              direction="right"
              onClick={incrementLegs}
              alt="Change legs"
              className={styles.legsIncrement}
            />

            <ArrowButton
              direction="down"
              onClick={incrementBg}
              alt="Change head"
              className={styles.bgIncrement}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default CreatePage;
