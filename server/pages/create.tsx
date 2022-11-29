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

const Create = () => {
  const router = useRouter();
  const [isMintInProgress, setIsMintInProgress] = useState<boolean>(false);

  const handleClickMint = () => {
    // TODO: Mint

    // While waiting for transaction to be sealed
    setIsMintInProgress(true);

    // Once sealed, navigate to View page
    // router.push(ROUTES.VIEW);
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
