import Button from 'components/Button';
import CreatePage from 'components/CreatePage';
import MintButton from 'components/MintButton';
import ActionPanel from 'layout/ActionPanel';
import Header from 'layout/Header';
import NavPanel from 'layout/NavPanel';
import PageContainer from 'layout/PageContainer';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/constants';

const Create = () => {
  const router = useRouter();

  const handleMint = () => {
    // TODO: Mint
    router.push(ROUTES.VIEW);
  };

  const handleView = () => {
    // TODO: View
    router.push(ROUTES.VIEW);
  };

  return (
    <PageContainer>
      <Header />

      <CreatePage />

      <ActionPanel>
        <MintButton onClick={handleMint} />
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
          onClick={handleView}
          alt="View NFTs"
        />
      </NavPanel>
    </PageContainer>
  );
};

export default Create;
