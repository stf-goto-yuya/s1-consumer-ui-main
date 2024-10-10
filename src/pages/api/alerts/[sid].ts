// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from '@/src/interfaces/sentinel-one/user'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { sid } = req.query

  switch (req.method) {
    case 'GET':
      try {
        const { data }: any = await axios.get(
          `${process.env.SENTINEL_ONE_ENDPOINT}/web/api/v2.1/threats?siteIds=${sid}`,
          {
            headers: {
              Authorization: `apiToken ${process.env.SENTINEL_ONE_ADMIN_TOKEN}`,
            },
          },
        )

        res.status(200).json(data)
      } catch (err: any) {
        console.log(err.response.data.errors)
      }

      break
    default:
      res.status(400).json({ name: 'BAD_REQUEST' })
  }
}

export const config = {
  type: 'experimental-background',
}
