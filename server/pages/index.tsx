import isInitializedScript from 'cadence/scripts/isInitialized';
import Button from 'components/Button';
import { useWeb3Context } from 'contexts/Web3';
import ActionPanel from 'layout/ActionPanel';
import NavPanel from 'layout/NavPanel';
import PageContainer from 'layout/PageContainer';
import PageContent from 'layout/PageContent';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from 'styles/HomePage.module.css';
import { ROUTES } from 'utils/constants';

const Home = () => {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState<boolean | null>(null);

  const { connect, user, executeScript } = useWeb3Context();

  useEffect(() => {
    if (!user.loggedIn) return;

    const checkIsInitialized = async () => {
      try {
        const res: boolean = await executeScript(
          isInitializedScript,
          (arg: any, t: any) => [arg(user.addr, t.Address)],
        );

        setIsInitialized(res);
      } catch (error) {
        console.error(error);
      }
    };

    checkIsInitialized();
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
