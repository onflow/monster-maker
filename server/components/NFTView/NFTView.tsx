import {
  getBackgroundImage,
  getHeadImage,
  getLegsImage,
  getTorsoImage,
} from 'utils/imageAssets';
import BackgroundImage from './NFTBackground';
import NFTBodyPart from './NFTBodyPart';
import styles from './NFTView.module.css';

const NFTView = ({
  bgIndex,
  headIndex,
  legsIndex,
  torsoIndex,
}: {
  bgIndex: number | string;
  headIndex: number | string;
  legsIndex: number | string;
  torsoIndex: number | string;
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
