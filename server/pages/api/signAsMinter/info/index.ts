import type { NextApiRequest, NextApiResponse } from 'next'

const MonsterMakerAddress = "0xfd3d8fe2c8056370"

export default async function handler(
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