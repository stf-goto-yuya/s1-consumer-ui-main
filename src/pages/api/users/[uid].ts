// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  const { uid } = req.query
  const { accessToken }: any = await getServerSession(req, res, authOptions)

  switch (req.method) {
    case 'PUT':
      try {
        const { apiToken } = req.body

        const { data }: any = await axios.put(
          `${process.env.S1_API_ENDPOINT}/users/${uid}`,
          {
            s1ApiToken: apiToken,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        res.status(200).json(data)
      } catch (err: any) {
        res.status(400).send(err)
        console.log(err)
      }

      break
    default:
      res.status(400).json({ name: 'BAD_REQUEST' })
  }
}

export const config = {
  type: 'experimental-background',
}
