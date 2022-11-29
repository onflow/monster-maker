import Button from 'components/Button';
import CreatePage from 'components/CreatePage';
import MintButton from 'components/MintButton';
import { useWeb3Context } from 'contexts/Web3';
import ActionPanel from 'layout/ActionPanel';
import Header from 'layout/Header';
import NavPanel from 'layout/NavPanel';
import PageContainer from 'layout/PageContainer';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ROUTES } from 'utils/constants';
import mintMonsterScript from '../cadence/transactions/mintMonster';
import {
  backgroundRange,
  headRange,
  legsRange,
  torsoRange,
} from 'utils/mapAssets';
import usePartSelector from 'hooks/usePartSelector';

const Create = () => {
  const router = useRouter();
  const [isMintInProgress, setIsMintInProgress] = useState<boolean>(false);
  const { user, executeTransaction } = useWeb3Context();
  const [bgIndex] = usePartSelector(backgroundRange);
  const [headIndex] = usePartSelector(headRange);
  const [torsoIndex] = usePartSelector(torsoRange);
  const [legsIndex] = usePartSelector(legsRange);

  const mintMonster = async () => {
    const args = (arg: any, t: any) => [
      arg(user.addr, t.Address),
      arg(bgIndex, t.Int),
      arg(headIndex, t.Int),
      arg(torsoIndex, t.Int),
      arg(legsIndex, t.Int),
    ];

    await executeTransaction(mintMonsterScript, args, {});
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
