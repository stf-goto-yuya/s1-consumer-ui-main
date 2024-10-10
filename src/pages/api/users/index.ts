// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from '@/src/interfaces/sentinel-one/user'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case 'GET':
      const { email } = req.query

      try {
        const { data }: any = await axios.get(
          `${process.env.SENTINEL_ONE_ENDPOINT}/web/api/v2.1/users?email=${email}`,
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
    case 'POST':
      try {
        const { username, password, sentinelOneId } = req.body

        const { data }: any = await axios.post(
          `${process.env.S1_API_ENDPOINT}/users`,
          {
            username,
            password,
            sentinelOneId,
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
