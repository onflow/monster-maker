import PageContainer from 'layout/PageContainer';
import InitializePage from 'components/InitializePage';
import NavPanel from 'layout/NavPanel';
import Button from 'components/Button';
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
      <InitializePage />

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
