import PageContainer from 'layout/PageContainer';
import HomePage from 'components/HomePage';
import NavPanel from 'layout/NavPanel';
import Button from 'components/Button';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/constants';
import { useWeb3Context } from 'contexts/Web3';
import { useEffect } from 'react';

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
