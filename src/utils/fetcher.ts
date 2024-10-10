import axios from 'axios'

export const fetcher = (params: string[]): Promise<any> => {
  const [baseUrl, token] = params

  return token
    ? axios
        .get(baseUrl, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => res.data)
    : axios.get(baseUrl).then((res) => res.data)
}
