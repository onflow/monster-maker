import setupAccountTxn from 'cadence/transactions/setupAccount';
import Button from 'components/Button';
import NFTView from 'components/NFTView/NFTView';
import { useWeb3Context } from 'contexts/Web3';
import ActionPanel from 'layout/ActionPanel';
import Header from 'layout/Header';
import NavPanel from 'layout/NavPanel';
import PageContainer from 'layout/PageContainer';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from 'styles/InitializePage.module.css';
import { ROUTES } from 'utils/constants';
import getRandomInt from 'utils/getRandomInt';
import {
  NUM_BACKGROUND_IMAGES,
  NUM_HEAD_IMAGES,
  NUM_LEGS_IMAGES,
  NUM_TORSO_IMAGES,
} from 'utils/imageAssets';

const Initialize = () => {
  const router = useRouter();
  const { executeTransaction, transaction } = useWeb3Context();

  const handleInit = async () => {
    await executeTransaction(setupAccountTxn, () => [], {
      limit: 9999,
    });
  };

  useEffect(() => {
    if (transaction.id !== null) {
      router.push(ROUTES.CREATE);
    }
  }, [router, transaction]);

  return (
    <PageContainer>
      <Header />

      <main className={styles.main}>
        <div className={styles.opacityWrapper}>
          <NFTView
            bgIndex={getRandomInt(NUM_BACKGROUND_IMAGES)}
            headIndex={getRandomInt(NUM_HEAD_IMAGES)}
            legsIndex={getRandomInt(NUM_LEGS_IMAGES)}
            torsoIndex={getRandomInt(NUM_TORSO_IMAGES)}
          />
        </div>
      </main>

      <ActionPanel>
        <img
          style={{ width: 'auto', maxHeight: '100%' }}
          src="/images/ui/initialize_bubble.png"
          alt="Initialize to start minting monsters"
        />
      </ActionPanel>

      <NavPanel>
        <Button
          src="/images/ui/initialize_button.png"
          width={640}
          height={208}
          onClick={handleInit}
          alt="Initialize wallet"
        />
      </NavPanel>
    </PageContainer>
  );
};

export default Initialize;
