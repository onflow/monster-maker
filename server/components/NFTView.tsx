import {
  getHeadImage,
  getLegsImage,
  getTorsoImage,
  getBackgroundImage,
} from "../utils/mapAssets";
import BackgroundImage from "./BackgroundImage";
import BodyPartImage from "./BodyPartImage";
import styles from "../styles/Home.module.css";

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
      <BodyPartImage src={getHeadImage(headIndex)} alt="Head" />
      <BodyPartImage src={getTorsoImage(torsoIndex)} alt="Torso" />
      <BodyPartImage src={getLegsImage(legsIndex)} alt="Legs" />
    </div>
  );
};

export default NFTView;
