import {
  getHeadImage,
  getLegsImage,
  getTorsoImage,
  getBackgroundImage,
} from 'utils/mapAssets';
import BackgroundImage from './NFTBackground';
import NFTBodyPart from './NFTBodyPart';
import styles from './NFTView.module.css';

const NFTView = ({
  bgIndex,
  headIndex,
  legsIndex,
  torsoIndex,
}: {
  bgIndex: number;
  headIndex: number;
  legsIndex: number;
  torsoIndex: number;
}) => {
  return (
    <div className={styles.overlapGrid}>
      <BackgroundImage src={getBackgroundImage(bgIndex)} />
      <NFTBodyPart src={getHeadImage(headIndex)} alt="Head" />
      <NFTBodyPart src={getTorsoImage(torsoIndex)} alt="Torso" />
      <NFTBodyPart src={getLegsImage(legsIndex)} alt="Legs" />
    </div>
  );
};

export default NFTView;
