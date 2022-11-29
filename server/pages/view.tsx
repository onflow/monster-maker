import Button from 'components/Button';
import ViewPage from 'components/ViewPage';
import ActionPanel from 'layout/ActionPanel';
import Header from 'layout/Header';
import NavPanel from 'layout/NavPanel';
import PageContainer from 'layout/PageContainer';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/constants';
import * as fcl from '@onflow/fcl';
import { useEffect, useState } from 'react';
import getMonstersScript from 'flow/scripts/getMonsters';
// import { useWeb3Context } from 'contexts/Web3';
import { GetMonstersResponse } from 'utils/types';

const View = () => {
  const router = useRouter();
  // const { user } = useWeb3Context();
  const [monsters, setMonsters] = useState<GetMonstersResponse>([]);

  const handleCreate = () => {
    router.push(ROUTES.CREATE);
  };

  useEffect(() => {
    const getMonsters = async () => {
      const res: GetMonstersResponse = await fcl.query({
        cadence: getMonstersScript,
        args: (arg: any, t: any) => [
          arg('0xc1c48187c3699818', t.Address),
          // arg(user.addr, t.Address),
        ],
      });

      setMonsters(res);
    };

    getMonsters();
  }, []);

  return (
    <PageContainer>
      <Header />

      <ViewPage monsters={monsters}/>

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
