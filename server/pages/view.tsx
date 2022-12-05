import getMonstersScript from 'cadence/scripts/getMonsters';
import { Button, NFTView } from 'components/';
import { useWeb3Context } from 'contexts/Web3';
import useEmblaCarousel from 'embla-carousel-react';
import {
  ActionPanel,
  Header,
  NavPanel,
  PageContainer,
  PageContent,
} from 'layout';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import styles from 'styles/ViewPage.module.css';
import { ROUTES } from 'utils/constants';
import { GetMonstersResponse } from 'utils/types';

const View = () => {
  const router = useRouter();
  const { user, executeScript } = useWeb3Context();
  const [monsters, setMonsters] = useState<GetMonstersResponse>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel();

  // Get monsters
  useEffect(() => {
    if (!user.addr) return;

    const getMonsters = async () => {
      const res: GetMonstersResponse = await executeScript(
        getMonstersScript,
        (arg: any, t: any) => [arg(user.addr, t.Address)],
      );
      setMonsters(res || []);
    };

    getMonsters();
  }, [executeScript, user.addr]);

  // Reinitialize carousel with response data
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, monsters]);

  // Sort monsters by itemID, in descending order (newest first)
  const descendingOrderMonsters = useMemo(
    () =>
      [...monsters].sort(
        (a, b) => parseInt(b.itemID, 10) - parseInt(a.itemID, 10),
      ),
    [monsters],
  );

  const handleClickCreate = () => {
    router.push(ROUTES.CREATE);
  };

  return (
    <PageContainer>
      <Header />

      <PageContent>
        <div className={styles.embla} ref={emblaRef}>
          <div className={styles.emblaContainer}>
            {descendingOrderMonsters.map(({ resourceID, component }) => {
              return (
                <div key={resourceID} className={styles.emblaSlide}>
                  <NFTView
                    bgIndex={component.background}
                    headIndex={component.head}
                    legsIndex={component.legs}
                    torsoIndex={component.torso}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </PageContent>

      <ActionPanel />

      <NavPanel>
        <Button
          src="/images/ui/create_button_off.png"
          width={640}
          height={208}
          onClick={handleClickCreate}
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
