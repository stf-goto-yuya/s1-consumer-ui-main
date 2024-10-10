// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from '@/src/interfaces/sentinel-one/user'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { sid } = req.query
  const { accessToken }: any = await getServerSession(req, res, authOptions)

  switch (req.method) {
    case 'GET':
      try {
        const { data }: any = await axios.get(
          `${process.env.S1_API_ENDPOINT}/sites/${sid}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        res.status(200).json(data)
      } catch (err: any) {
        res.status(401).json({ name: 'UNAUTHORIZED' })
      }

      break
    default:
      res.status(400).json({ name: 'BAD_REQUEST' })
  }
}

export const config = {
  type: 'experimental-background',
}
