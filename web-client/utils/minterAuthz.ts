import * as fcl from '@onflow/fcl';
import ROUTES from 'constants/routes';

const fetchMinterSignature = async (message: string): Promise<string> => {
  const response = await fetch(ROUTES.API_SIGN_AS_MINTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      network: await fcl.config.get('flow.network'),
    },
    body: JSON.stringify({
      message,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const { data } = await response.json();
  return data.signature;
};

const minterAuthz = async (account: any) => {
  const network = await fcl.config.get('flow.network');
  const response = await fetch(ROUTES.API_SIGN_AS_MINTER_INFO, {
    headers: {
      'Content-Type': 'application/json',
      network,
    },
  });

  const { data } = await response.json();
  const ADDRESS = data.address;
  const KEY_ID = data.keyIndex;

  return {
    ...account, // bunch of defaults in here, we want to overload some of them though
    tempId: `${ADDRESS}-${KEY_ID}`, // tempIds are more of an advanced topic, for 99% of the times where you know the address and keyId you will want it to be a unique string per that address and keyId
    addr: ADDRESS, // the address of the signatory
    keyId: Number(KEY_ID), // this is the keyId for the accounts registered key that will be used to sign, make extra sure this is a number and not a string
    signingFunction: async (signable: any) => {
      // Singing functions are passed a signable and need to return a composite signature
      // signable.message is a hex string of what needs to be signed.
      const signature = await fetchMinterSignature(signable.message);
      return {
        addr: ADDRESS, // needs to be the same as the account.addr
        keyId: Number(KEY_ID), // needs to be the same as account.keyId, once again make sure its a number and not a string
        signature: signature, // this needs to be a hex string of the signature, where signable.message is the hex value that needs to be signed
      };
    },
  };
};

export default minterAuthz;
