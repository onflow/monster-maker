import HorizontalPicker from 'components/HorizontalPicker';
import NFTView from 'components/NFTView';
import VerticalPicker from 'components/VerticalPicker';
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
            <VerticalPicker
              partName="background"
              increment={incrementBg}
              decrement={decrementBg}
            />

            <HorizontalPicker
              partName="head"
              increment={incrementHead}
              decrement={decrementHead}
              topOffset={84}
            />

            <HorizontalPicker
              partName="torso"
              increment={incrementTorso}
              decrement={decrementTorso}
              topOffset={200}
            />

            <HorizontalPicker
              partName="legs"
              increment={incrementLegs}
              decrement={decrementLegs}
              topOffset={295}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default CreatePage;
