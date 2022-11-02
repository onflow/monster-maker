// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const id = req.query.id as string
    const components = id.split('-')

    if (components.length < 4) {
        return res.status(403).json({message: 'Invalid'})
    }

    res.status(200).json({ name: 'John Doe' })
}
