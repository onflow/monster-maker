import type { NextApiRequest, NextApiResponse } from "next";
const RLP = require("rlp");
const secp = require("@noble/secp256k1");
import { env } from 'process';
import withCors from 'utils/withCors';

const MonsterMakerAddress = "0x724a9da00340f14c"
const expectedCadenceHash = "e0618389055dd62d4849e04b1ea027fe8ea8771b45f18764baaa6f4e53f38255"

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
    const signature = await secp.sign(messageHash, env.privateKey as string);
    const realSignature = secp.Signature.fromHex(signature).toCompactHex();
    return realSignature;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const network = req.headers.network || req.query.network;

  if (network !== "testnet") {
    res.status(403).json({ status: 403, error: "testnet only" });
    return;
  }
  const msg = req.body.message;
  const encodedMessage = removeTag(msg)
  const decoded = arrToStringArr(RLP.decode(encodedMessage))
  const cadenceHex = sansPrefix(decoded[0]) || ''
  const hashed = await secp.utils.sha256(Buffer.from(cadenceHex, 'hex'))
  const cadenceHash = Buffer.from(hashed).toString('hex')
  const proposer = decoded[5]
  // if (proposer === MonsterMakerAddress || cadenceHash !== expectedCadenceHash ) {
  //   res.status(403).json({
  //     error: 'Malicious Transaction',
  //     status: 403
  //   })
  //   return
  // }
  const signature = await sign(msg, network);

  res.status(200).json({
    data: {
      address: MonsterMakerAddress,
      keyIndex: 0,
      signature: signature,
    },
    status: 200,
  });
}

export default withCors(handler);
