import Button from 'components/Button';
import CreatePage from 'components/CreatePage';
import MintButton from 'components/MintButton';
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
import usePartSelector from 'hooks/usePartSelector';
import { userAgent } from 'next/server';
import { useWeb3Context } from 'contexts/Web3';

const Create = () => {
  const router = useRouter();
  const { user } = useWeb3Context();
  const [isMintInProgress, setIsMintInProgress] = useState<boolean>(false);
  const [bgIndex] = usePartSelector(backgroundRange);
  const [headIndex] = usePartSelector(headRange);
  const [torsoIndex] = usePartSelector(torsoRange);
  const [legsIndex] = usePartSelector(legsRange);

  const mintMonster = async () => {
    const response = await fetch('/api/mint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: user.addr,
        components: {
          background: bgIndex,
          head: headIndex,
          torso: torsoIndex,
          legs: legsIndex,
        },
      }),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };

  const handleClickMint = async () => {
    setIsMintInProgress(true);
    await mintMonster();
    setIsMintInProgress(false);
    router.push(ROUTES.VIEW);
  };

  const handleClickView = () => {
    router.push(ROUTES.VIEW);
  };

  return (
    <PageContainer>
      <Header />

      <CreatePage isMintInProgress={isMintInProgress} />

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
