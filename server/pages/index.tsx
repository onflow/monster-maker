import Button from 'components/Button';
import HomePage from 'components/HomePage';
import NavPanel from 'layout/NavPanel';
import PageContainer from 'layout/PageContainer';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/constants';

const Home = () => {
  const router = useRouter();

  const handleConnect = () => {
    // TODO: Initialize wallet
    router.push(ROUTES.INITIALIZE);
  };

  return (
    <PageContainer>
      <HomePage />

      <NavPanel>
        <Button
          src="/images/ui/connect_button.png"
          width={576}
          height={208}
          onClick={handleConnect}
          alt="Connect wallet"
        />
      </NavPanel>
    </PageContainer>
  );
};

export default Home;
