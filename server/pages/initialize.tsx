import Button from 'components/Button';
import InitializePage from 'components/InitializePage';
import ActionPanel from 'layout/ActionPanel';
import Header from 'layout/Header';
import NavPanel from 'layout/NavPanel';
import PageContainer from 'layout/PageContainer';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/constants';
import setupAccountTxn from 'cadence/transactions/setupAccount';
import { useWeb3Context } from 'contexts/Web3';
import { useEffect } from 'react';

const Initialize = () => {
  const router = useRouter();
  const { executeTransaction, transaction } = useWeb3Context();

  const handleInit = async () => {
    await executeTransaction(setupAccountTxn, (arg: any, t: any) => [], {});
  };

  useEffect(() => {
    if (transaction.id !== null) {
      router.push(ROUTES.CREATE);
    }
  }, [transaction]);

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
          onClick={handleInit}
          alt="Initialize wallet"
        />
      </NavPanel>
    </PageContainer>
  );
};

export default Initialize;
