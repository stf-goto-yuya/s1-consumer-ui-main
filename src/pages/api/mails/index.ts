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
  switch (req.method) {
    case 'POST':
      try {
        const { data }: any = await axios.post(
          `${process.env.EMAIL_NT_ENDPOINT}`,
          req.body,
        )

        res.status(200).json(data)
      } catch (err: any) {
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
