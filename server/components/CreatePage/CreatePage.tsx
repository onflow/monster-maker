import HorizontalPicker from 'components/HorizontalPicker';
import NFTView from 'components/NFTView';
import VerticalPicker from 'components/VerticalPicker';
import { PartSelectorReturnProps } from 'hooks/usePartSelector';
import styles from './CreatePage.module.css';

interface Props {
  isMintInProgress: boolean;
  backgroundSelector: PartSelectorReturnProps;
  headSelector: PartSelectorReturnProps;
  torsoSelector: PartSelectorReturnProps;
  legsSelector: PartSelectorReturnProps;
}

const CreatePage = ({
  isMintInProgress,
  backgroundSelector,
  headSelector,
  torsoSelector,
  legsSelector,
}: Props) => {
  return (
    <main className={styles.main}>
      <div className={styles.relativeContainer}>
        <NFTView
          bgIndex={backgroundSelector.index}
          headIndex={headSelector.index}
          torsoIndex={torsoSelector.index}
          legsIndex={legsSelector.index}
        />

        {!isMintInProgress && (
          <>
            <VerticalPicker
              partName="background"
              increment={backgroundSelector.increment}
              decrement={backgroundSelector.decrement}
            />

            <HorizontalPicker
              partName="head"
              increment={headSelector.increment}
              decrement={headSelector.decrement}
              topOffset={84}
            />

            <HorizontalPicker
              partName="torso"
              increment={torsoSelector.increment}
              decrement={torsoSelector.decrement}
              topOffset={200}
            />

            <HorizontalPicker
              partName="legs"
              increment={legsSelector.increment}
              decrement={legsSelector.decrement}
              topOffset={295}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default CreatePage;
