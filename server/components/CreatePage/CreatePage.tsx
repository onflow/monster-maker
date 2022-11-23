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

const CreatePage = () => {
  const [bgIndex, incrementBg, decrementBg] = usePartSelector(backgroundRange);
  const [headIndex, incrementHead, decrementHead] = usePartSelector(headRange);
  const [torsoIndex, incrementTorso, decrementTorso] =
    usePartSelector(torsoRange);
  const [legsIndex, incrementLegs, decrementLegs] = usePartSelector(legsRange);

  return (
    <main className={styles.main}>
      <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div
          style={{
            height: '96px',
            display: 'flex',
            justifyContent: 'center',
            flexShrink: 0,
            position: 'relative',
            bottom: '-32px',
          }}
        >
          <ArrowButton direction="up" onClick={decrementBg} alt="Change head" />
        </div>

        <div style={{ display: 'flex', flexShrink: 0 }}>
          <div
            style={{
              height: '420px',
              width: '96px',
              flexShrink: 0,
              position: 'relative',
              right: '-24px',
            }}
          >
            <ArrowButton
              direction="left"
              onClick={decrementHead}
              alt="Change head"
            />

            <ArrowButton
              direction="left"
              onClick={decrementTorso}
              alt="Change torso"
            />

            <ArrowButton
              direction="left"
              onClick={decrementLegs}
              alt="Change legs"
            />
          </div>

          <NFTView
            bgIndex={bgIndex}
            headIndex={headIndex}
            torsoIndex={torsoIndex}
            legsIndex={legsIndex}
          />

          <div
            style={{
              height: '420px',
              width: '96px',
              flexShrink: 0,
              position: 'relative',
              left: '-30px',
            }}
          >
            <ArrowButton
              direction="right"
              onClick={incrementHead}
              alt="Change head"
            />

            <ArrowButton
              direction="right"
              onClick={incrementTorso}
              alt="Change torso"
            />

            <ArrowButton
              direction="right"
              onClick={incrementLegs}
              alt="Change legs"
            />
          </div>
        </div>

        <div
          style={{
            height: '96px',
            display: 'flex',
            justifyContent: 'center',
            flexShrink: 0,
            position: 'relative',
            top: '-26px',
          }}
        >
          <ArrowButton
            direction="down"
            onClick={incrementBg}
            alt="Change head"
          />
        </div>
      </div>
    </main>
  );
};

export default CreatePage;
