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
  const { fileHash } = req.query

  switch (req.method) {
    case 'GET':
      try {
        const { data }: any = await axios.get(
          `${process.env.SCORE_NT_ENDPOINT}/${fileHash}`,
        )

        console.log(data)

        res.status(200).json(data)
      } catch (err: any) {
        console.log(err)
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
