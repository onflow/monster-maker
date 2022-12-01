import type { NextApiRequest, NextApiResponse } from 'next';
const fcl = require('@onflow/fcl');
import * as secp from '@noble/secp256k1';
import { env } from 'process';
import * as fs from 'fs';
import * as path from 'path';
import { join } from 'path';
const { send } = require('@onflow/transport-http');

const MonsterMakerAddress = '0xfd3d8fe2c8056370';

const authzFn = async (account: any = {}) => {
  const ADDRESS = MonsterMakerAddress;
  const KEY_ID = 0;
  return {
    ...account,
    tempId: `${ADDRESS}-${KEY_ID}`,
    addr: fcl.sansPrefix(ADDRESS),
    keyId: Number(KEY_ID),
    signingFunction: async (signable: any) => {
      return {
        addr: fcl.withPrefix(ADDRESS),
        keyId: Number(KEY_ID),
        signature: await sign(signable.message),
      };
    },
  };
};

const sign = async (signableMessage: string): Promise<string> => {
  const messageHash = await secp.utils.sha256(
    Buffer.from(signableMessage, 'hex'),
  );
  const signature = await secp.sign(messageHash, env.privateKey as string);
  const realSignature = secp.Signature.fromHex(signature).toCompactHex();
  return realSignature;
};

const fclConfig = () => {
  fcl.config
    .put('sdk.transport', send)
    .put('accessNode.api', 'https://rest-testnet.onflow.org')
    .put('0xNonFungibleToken', '0x631e88ae7f1d7c20')
    .put('0xFungibleToken', '0x9a0766d93b6608b7')
    .put('0xMetadataViews', '0x631e88ae7f1d7c20')
    .put('0xMonsterMaker', MonsterMakerAddress);
};

const replaceAddress = (cadence: string) => {
  return cadence
    .replaceAll(`"../../contracts/NonFungibleToken.cdc"`, '0x631e88ae7f1d7c20')
    .replaceAll(`"../../contracts/FungibleToken.cdc"`, '0x9a0766d93b6608b7')
    .replaceAll(`"../../contracts/MetadataViews.cdc"`, '0x631e88ae7f1d7c20')
    .replaceAll(`"../../contracts/MonsterMaker.cdc"`, MonsterMakerAddress);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  fclConfig();
  const { address, components } = req.body;
  const { background, head, torso, legs } = components;
  const fontPath = join(
    process.cwd(),
    '../',
    'cadence',
    'transactions',
    'monsterMaker',
    'mint_monster.cdc',
  );
  const cadece = fs.readFileSync(fontPath, 'utf8');
  const txId = await fcl.mutate({
    cadence: replaceAddress(cadece),
    args: (arg: any, t: any) => [
      fcl.arg(address, t.Address),
      fcl.arg(background, t.Int),
      fcl.arg(head, t.Int),
      fcl.arg(torso, t.Int),
      fcl.arg(legs, t.Int),
    ],
    proposer: authzFn,
    authorizations: [authzFn],
    payer: authzFn,
    limit: 9999,
  });

  return res.status(200).json({
    txId: txId,
  });
}
