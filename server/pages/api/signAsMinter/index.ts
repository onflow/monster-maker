import type { NextApiRequest, NextApiResponse } from "next";
const RLP = require("rlp");
const secp = require("@noble/secp256k1");
import { env } from 'process';

const MonsterMakerAddress = "0xfd3d8fe2c8056370"

function sansPrefix(address: string): string | null {
  if (address == null) return null;
  return address.replace(/^0x/, "").replace(/^Fx/, "");
}

function withPrefix(address: string) {
  if (address == null) return null;
  return "0x" + sansPrefix(address);
}

function arrToStringArr(arr: any): any {
  return arr.map((a: any) => {
    if (Array.isArray(a)) {
      return arrToStringArr(a);
    }
    return withPrefix(Buffer.from(a).toString("hex"));
  });
}

function removeTag(address: string): string | null {
  if (address == null) return null;
  return address.replace(
    /^464c4f572d56302e302d7472616e73616374696f6e0000000000000000000000/,
    "0x"
  );
}

const rightPaddedHexBuffer = (value: string, pad: number) =>
  Buffer.from(value.padEnd(pad * 2, "0"), "hex");

const TRANSACTION_DOMAIN_TAG = rightPaddedHexBuffer(
  Buffer.from("FLOW-V0.0-transaction").toString("hex"),
  32
).toString("hex");

const prependTransactionDomainTag = (tx: string) => TRANSACTION_DOMAIN_TAG + tx;

interface Roles {
  proposal: string;
  payer: string;
  authorizers: string[];
}

const sign = async (signableMessage: string, network: string): Promise<string> => {
    const messageHash = await secp.utils.sha256(
      Buffer.from(signableMessage, 'hex')
    );
    const signature = await secp.sign(messageHash,  env.privateKey as string);
    const realSignature = secp.Signature.fromHex(signature).toCompactHex();
    return realSignature;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const network = req.headers.network || req.query.network;

  if (network !== "testnet") {
    res.status(403).json({ status: 403, error: "testnet only" });
    return;
  }
  const msg = req.body.message;
  const signature = await sign(msg, network);
  const payerAddress = MonsterMakerAddress;

  res.status(200).json({
    data: {
      address: payerAddress,
      keyIndex: 0,
      signature: signature,
    },
    status: 200,
  });
}
