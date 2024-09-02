import type { NextApiRequest, NextApiResponse } from 'next'
import withCors from 'utils/withCors';

const MonsterMakerAddress = "0xccd5ad285b372daa"

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const network = req.headers.network || req.query.network;

  if (network !== "testnet") {
    res.status(200).json({ status:200, error: 'testnet only' })
    return
  }

  const finalReturn = {
    data: {
        address: MonsterMakerAddress,
        keyIndex: 0
    },
    status:200
  }
  res.status(200).json(finalReturn);
}

export default withCors(handler);