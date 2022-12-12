import isInitializedScript from 'cadence/scripts/isInitialized';
import { Button } from 'components/';
import ROUTES from 'constants/routes';
import { useWeb3Context } from 'contexts/Web3';
import { ActionPanel, NavPanel, PageContainer, PageContent } from 'layout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from 'styles/HomePage.module.css';

const Home = () => {
  const router = useRouter();

  const { connect, user, executeScript } = useWeb3Context();

  useEffect(() => {
    if (!user.loggedIn) return;

    const checkIsInitialized = async () => {
      try {
        const isUserInitialized: boolean = await executeScript(
          isInitializedScript,
          (arg: any, t: any) => [arg(user.addr, t.Address)],
        );

        if (isUserInitialized) {
          router.push(ROUTES.CREATE);
        } else {
          router.push(ROUTES.INITIALIZE);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkIsInitialized();
  }, [user, executeScript, router]);

  return (
    <PageContainer withHeader={false}>
      <PageContent>
        <Image
          src="/images/ui/monster_maker_logo.png"
          alt="logo"
          width={2176}
          height={800}
          className={styles.logo}
        />
      </PageContent>

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
