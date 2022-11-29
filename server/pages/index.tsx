import Button from 'components/Button';
import HomePage from 'components/HomePage';
import { useWeb3Context } from 'contexts/Web3';
import ActionPanel from 'layout/ActionPanel';
import NavPanel from 'layout/NavPanel';
import PageContainer from 'layout/PageContainer';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ROUTES } from 'utils/constants';

const Home = () => {
  const router = useRouter();

  const { connect, user } = useWeb3Context();

  useEffect(() => {
    if (user.loggedIn) {
      router.push(ROUTES.INITIALIZE);
    }
  }, [user, router]);

  return (
    <PageContainer>
      <HomePage />

      <ActionPanel />

      <NavPanel>
        <Button
          src="/images/ui/connect_button.png"
          width={576}
          height={208}
          onClick={connect}
          alt="Connect wallet"
        />
      </NavPanel>
    </PageContainer>
  );
};

export default Home;
