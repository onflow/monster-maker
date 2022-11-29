import Button from 'components/Button';
import InitializePage from 'components/InitializePage';
import ActionPanel from 'layout/ActionPanel';
import Header from 'layout/Header';
import NavPanel from 'layout/NavPanel';
import PageContainer from 'layout/PageContainer';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/constants';

const Initialize = () => {
  const router = useRouter();

  const handleConnect = () => {
    // TODO: Initialize wallet
    router.push(ROUTES.CREATE);
  };

  return (
    <PageContainer>
      <Header />

      <InitializePage />

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
          onClick={handleConnect}
          alt="Initialize wallet"
        />
      </NavPanel>
    </PageContainer>
  );
};

export default Initialize;
