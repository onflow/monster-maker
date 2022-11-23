import styles from './CreatePage.module.css';
import NFTView from 'components/NFTView/NFTView';
import {
  headRange,
  backgroundRange,
  legsRange,
  torsoRange,
} from 'utils/mapAssets';
import getRandomIndex from 'utils/getRandomIndex';
import { useState } from 'react';
import usePartSelector from 'hooks/usePartSelector';

const CreatePage = () => {
  const [bgIndex, incrementBg, decrementBg] = usePartSelector(backgroundRange);
  const [headIndex, incrementHead, decrementHead] = usePartSelector(headRange);
  const [torsoIndex, incrementTorso, decrementTorso] =
    usePartSelector(torsoRange);
  const [legsIndex, incrementLegs, decrementLegs] = usePartSelector(legsRange);

  return (
    <main className={styles.main}>
      <div onClick={incrementBg}>Increment Background</div>
      <div onClick={decrementBg}>Decrement Background</div>
      <div onClick={incrementHead}>Increment Head</div>
      <div onClick={decrementHead}>Decrement Head</div>
      <div onClick={incrementTorso}>Increment Torso</div>
      <div onClick={decrementTorso}>Decrement Torso</div>
      <div onClick={incrementLegs}>Increment Legs</div>
      <div onClick={decrementLegs}>Decrement Legs</div>
      <NFTView
        bgIndex={bgIndex}
        headIndex={headIndex}
        torsoIndex={torsoIndex}
        legsIndex={legsIndex}
      />
    </main>
  );
};

export default CreatePage;
