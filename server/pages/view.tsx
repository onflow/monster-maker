import Button from 'components/Button';
import ViewPage from 'components/ViewPage';
import ActionPanel from 'layout/ActionPanel';
import Header from 'layout/Header';
import NavPanel from 'layout/NavPanel';
import PageContainer from 'layout/PageContainer';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/constants';

const View = () => {
  const router = useRouter();

  const handleCreate = () => {
    // TODO: Create
    router.push(ROUTES.CREATE);
  };

  return (
    <PageContainer>
      <Header />

      <ViewPage />

      <ActionPanel />

      <NavPanel>
        <Button
          src="/images/ui/create_button_off.png"
          width={640}
          height={208}
          onClick={handleCreate}
          alt="Create NFT"
        />

        <Button
          src="/images/ui/view_button_on.png"
          width={640}
          height={208}
          inactive
          alt="View NFTs"
        />
      </NavPanel>
    </PageContainer>
  );
};

export default View;
