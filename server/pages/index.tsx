import checkCapabilityScript from 'cadence/scripts/checkCapability';
import Button from 'components/Button';
import HomePage from 'components/HomePage';
import { useWeb3Context } from 'contexts/Web3';
import ActionPanel from 'layout/ActionPanel';
import NavPanel from 'layout/NavPanel';
import PageContainer from 'layout/PageContainer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ROUTES } from 'utils/constants';

const Home = () => {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState<boolean | null>(null);

  const { connect, user, executeScript } = useWeb3Context();

  useEffect(() => {
    if (!user.loggedIn) return;

    const checkCapability = async () => {
      try {
        const res: boolean = await executeScript(
          checkCapabilityScript,
          (arg: any, t: any) => [arg(user.addr, t.Address)],
        );

        setIsInitialized(res);
      } catch (error) {
        console.error(error);
      }
    };

    checkCapability();
  }, [user, executeScript]);

  useEffect(() => {
    if (user.loggedIn && isInitialized === false) {
      router.push(ROUTES.INITIALIZE);
    } else if (user.loggedIn && isInitialized === true) {
      router.push(ROUTES.CREATE);
    }
  }, [user, router, isInitialized]);

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
