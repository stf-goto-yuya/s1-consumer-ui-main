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
      `${process.env.SENTINEL_ONE_ENDPOINT}/web/api/v2.1/users/login`,
      req.body,
    )
  } catch (err: any) {
    const { detail, title } = err.response.data.errors[0]
    if (detail && detail === 'Two Factor Authentication is required') {
      return res.status(200).json({ name: 'ok' })
    }

    if (
      title &&
      title === 'Repeated failed log-in attempts. Temporarily locked.'
    ) {
      return res.status(400).json({ name: 'S1_ACCOUNT_LOCKED' })
    }
  }

  return res.status(401).json({ name: 'not authorized' })
}

export const config = {
  type: 'experimental-background',
}
