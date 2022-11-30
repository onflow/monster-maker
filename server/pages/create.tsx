import Button from 'components/Button';
import CreatePage from 'components/CreatePage';
import MintButton from 'components/MintButton';
import { useWeb3Context } from 'contexts/Web3';
import usePartSelector from 'hooks/usePartSelector';
import ActionPanel from 'layout/ActionPanel';
import Header from 'layout/Header';
import NavPanel from 'layout/NavPanel';
import PageContainer from 'layout/PageContainer';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ROUTES } from 'utils/constants';
import {
  backgroundRange,
  headRange,
  legsRange,
  torsoRange,
} from 'utils/mapAssets';
import { MintMonsterRequestBody } from 'utils/types';

const Create = () => {
  const router = useRouter();
  const { user } = useWeb3Context();

  const backgroundSelector = usePartSelector(backgroundRange);
  const headSelector = usePartSelector(headRange);
  const torsoSelector = usePartSelector(torsoRange);
  const legsSelector = usePartSelector(legsRange);

  const [isMintInProgress, setIsMintInProgress] = useState<boolean>(false);

  const mintMonster = async () => {
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

    return response.json(); // parses JSON response into native JavaScript objects
  };

  const handleClickMint = async () => {
    setIsMintInProgress(true);

    try {
      await mintMonster();
    } catch (error) {
      console.error(error);
    }

    router.push(ROUTES.VIEW);
  };

  const handleClickView = () => {
    router.push(ROUTES.VIEW);
  };

  return (
    <PageContainer>
      <Header />

      <CreatePage
        isMintInProgress={isMintInProgress}
        backgroundSelector={backgroundSelector}
        headSelector={headSelector}
        torsoSelector={torsoSelector}
        legsSelector={legsSelector}
      />

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
