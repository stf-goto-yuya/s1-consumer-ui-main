// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const result = await axios.post(
      `${process.env.SENTINEL_ONE_ENDPOINT}/web/api/v2.0/users/auth/app`,
      req.body,
      {
        headers: {
          Authorization: `apiToken ${process.env.SENTINEL_ONE_ADMIN_TOKEN}`,
        },
      },
    )
  } catch (err: any) {
    console.log(err.response.data.errors)
    const { detail } = err.response.data.errors[0]
    if (detail && detail === 'Two Factor Authentication is required') {
      res.status(200).json({ name: 'ok' })
    }
  }

  res.status(401).json({ name: 'not authorized' })
}

export const config = {
  type: 'experimental-background',
}
