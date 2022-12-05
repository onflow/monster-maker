import * as fcl from '@onflow/fcl';
import {
  Button,
  HorizontalPicker,
  MintButton,
  NFTView,
  VerticalPicker,
} from 'components/';
import { useWeb3Context } from 'contexts/Web3';
import usePartSelector from 'hooks/usePartSelector';
import {
  ActionPanel,
  Header,
  NavPanel,
  PageContainer,
  PageContent,
} from 'layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from 'styles/CreatePage.module.css';
import { ROUTES } from 'utils/constants';
import {
  NUM_BACKGROUND_IMAGES,
  NUM_HEAD_IMAGES,
  NUM_LEGS_IMAGES,
  NUM_TORSO_IMAGES,
} from 'utils/imageAssets';
import { MintMonsterRequestBody, TxnStatus } from 'utils/types';

const Create = () => {
  const router = useRouter();
  const { user } = useWeb3Context();

  const backgroundSelector = usePartSelector(NUM_BACKGROUND_IMAGES);
  const headSelector = usePartSelector(NUM_HEAD_IMAGES);
  const torsoSelector = usePartSelector(NUM_TORSO_IMAGES);
  const legsSelector = usePartSelector(NUM_LEGS_IMAGES);

  const [isMintInProgress, setIsMintInProgress] = useState<boolean>(false);
  const [txId, setTxId] = useState('');
  const [txStatus, setTxStatus] = useState<TxnStatus>();

  const handleClickMint = async () => {
    setIsMintInProgress(true);

    const response = await fetch('/api/mint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: user.addr,
        components: {
          background: backgroundSelector.index,
          head: headSelector.index,
          torso: torsoSelector.index,
          legs: legsSelector.index,
        },
      } as MintMonsterRequestBody),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const { txId } = await response.json();

    setTxId(txId);
  };

  // Subscribe to tx returned from /api/mint
  useEffect(() => {
    if (txId) {
      fcl.tx(txId).subscribe(setTxStatus);
    }
  }, [txId]);

  // Navigate to View page when tx is sealed
  useEffect(() => {
    if (txStatus?.statusString === 'SEALED') {
      router.push(ROUTES.VIEW);
    }
  }, [txStatus, router]);

  const handleClickView = () => {
    router.push(ROUTES.VIEW);
  };

  return (
    <PageContainer>
      <Header />

      <PageContent>
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
      </PageContent>

      <ActionPanel>
        <MintButton
          onClick={handleClickMint}
          isMintInProgress={isMintInProgress}
        />
      </ActionPanel>

      <NavPanel>
        <Button
          src="/images/ui/create_button_on.png"
          width={640}
          height={208}
          inactive
          alt="Create NFT"
        />

        <Button
          src="/images/ui/view_button_off.png"
          width={640}
          height={208}
          onClick={handleClickView}
          alt="View NFTs"
        />
      </NavPanel>
    </PageContainer>
  );
};

export default Create;
