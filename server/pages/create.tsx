import * as fcl from '@onflow/fcl';
import {
  Button,
  HorizontalPicker,
  MintButton,
  NFTView,
  VerticalPicker,
} from 'components/';
import ROUTES from 'constants/routes';
import usePartSelector from 'hooks/usePartSelector';
import { ActionPanel, NavPanel, PageContainer, PageContent } from 'layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from 'styles/CreatePage.module.css';
import mintMonster from 'cadence/transactions/mintMonster'
import {
  NUM_BACKGROUND_IMAGES,
  NUM_HEAD_IMAGES,
  NUM_LEGS_IMAGES,
  NUM_TORSO_IMAGES,
} from 'utils/imageAssets';
import {TxnStatus } from 'utils/types';

const Create = () => {
  const router = useRouter();

  const backgroundSelector = usePartSelector(NUM_BACKGROUND_IMAGES);
  const headSelector = usePartSelector(NUM_HEAD_IMAGES);
  const torsoSelector = usePartSelector(NUM_TORSO_IMAGES);
  const legsSelector = usePartSelector(NUM_LEGS_IMAGES);
  const monsterPrice = "0.0"

  const [isMintInProgress, setIsMintInProgress] = useState<boolean>(false);
  const [txId, setTxId] = useState('');
  const [txStatus, setTxStatus] = useState<TxnStatus>();

  const handleClickMint = async () => {
    setIsMintInProgress(true);


    const txId = await fcl.mutate({
      cadence: mintMonster,
      args: (arg: any, t: any) => [
        arg(backgroundSelector.index, t.Int), 
        arg(headSelector.index, t.Int), 
        arg(torsoSelector.index, t.Int), 
        arg(legsSelector.index, t.Int), 
        arg(monsterPrice, t.UFix64),
      ],
      authorizations: [fcl.currentUser, minterAuthz]
    })

    setTxId(txId);
  };

  const minterAuthz = async (account: any) => {
    const network = await fcl.config.get('flow.network')
    const response = await fetch('/api/signAsMinter/info', {
      headers: {
        'Content-Type': 'application/json',
        'network': network,
      },
    })
    const { data } = await response.json();
    const ADDRESS = data.address
    const KEY_ID = data.keyIndex

    return {
      ...account, // bunch of defaults in here, we want to overload some of them though
      tempId: `${ADDRESS}-${KEY_ID}`, // tempIds are more of an advanced topic, for 99% of the times where you know the address and keyId you will want it to be a unique string per that address and keyId
      addr: ADDRESS, // the address of the signatory
      keyId: Number(KEY_ID), // this is the keyId for the accounts registered key that will be used to sign, make extra sure this is a number and not a string
      signingFunction: async (signable: any) => {
        // Singing functions are passed a signable and need to return a composite signature
        // signable.message is a hex string of what needs to be signed.
        const signature = await fetchMinterSignature(signable.message)
        return {
          addr: ADDRESS, // needs to be the same as the account.addr
          keyId: Number(KEY_ID), // needs to be the same as account.keyId, once again make sure its a number and not a string
          signature: signature, // this needs to be a hex string of the signature, where signable.message is the hex value that needs to be signed
        }
      }
    }
  }

  const fetchMinterSignature = async (message: string): Promise<string> => {
      const response = await fetch('/api/signAsMinter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'network': await fcl.config.get('flow.network'),
      },
      body: JSON.stringify({
        message
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const {data} = await response.json()
    return data.signature
  }

  // Subscribe to tx returned from /api/signAsMinter
  useEffect(() => {
    if (txId) {
      fcl.tx(txId).subscribe(setTxStatus);
    }
  }, [txId]);

  // Navigate to View page when tx is sealed
  useEffect(() => {
    if (txStatus?.statusString === 'SEALED') {
      router.push(ROUTES.VIEW);
    }
  }, [txStatus, router]);

  const handleClickView = () => {
    router.push(ROUTES.VIEW);
  };

  return (
    <PageContainer pageTitle="Create">
      <PageContent>
        <div className={styles.relativeContainer}>
          <NFTView
            bgIndex={backgroundSelector.index}
            headIndex={headSelector.index}
            torsoIndex={torsoSelector.index}
            legsIndex={legsSelector.index}
          />

          {!isMintInProgress && (
            <>
              <VerticalPicker
                partName="background"
                increment={backgroundSelector.increment}
                decrement={backgroundSelector.decrement}
              />

              <HorizontalPicker
                partName="head"
                increment={headSelector.increment}
                decrement={headSelector.decrement}
                topOffset={84}
              />

              <HorizontalPicker
                partName="torso"
                increment={torsoSelector.increment}
                decrement={torsoSelector.decrement}
                topOffset={200}
              />

              <HorizontalPicker
                partName="legs"
                increment={legsSelector.increment}
                decrement={legsSelector.decrement}
                topOffset={295}
              />
            </>
          )}
        </div>
      </PageContent>

      <ActionPanel>
        <MintButton
          onClick={handleClickMint}
          isMintInProgress={isMintInProgress}
        />
      </ActionPanel>

      <NavPanel>
        <Button
          src="/images/ui/create_button_on.png"
          width={640}
          height={208}
          inactive
          alt="Create NFT"
        />

        <Button
          src="/images/ui/view_button_off.png"
          width={640}
          height={208}
          onClick={handleClickView}
          alt="View NFTs"
        />
      </NavPanel>
    </PageContainer>
  );
};

export default Create;
