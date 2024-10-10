import axios from 'axios'

export const getScore = async (threat: any) => {
  const { fileSha256, fileContentHash } = threat

  const fileHash = fileSha256 ? fileSha256 : fileContentHash
  let score: string

  try {
    const result = await axios.get(`/api/scores/${fileHash}`)
    score = result?.data?.score
  } catch (err) {
    score = '取得できませんでした'
  }

  return score
}

export const getAdmin = async (siteID: string, accessToken: string) => {
  let data = null

  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/administrators/site_id/${siteID}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    if (result?.data?.data) {
      data = result.data.data
    }
  } catch (e) {
    console.log(e)
  }

  return data
}

export const sendEmailNotification = async (
  to: string,
  threat: any,
  accessToken: string,
) => {
  const {
    fileContentHash,
    fileSha256,
    agentComputerName,
    rank,
    threatName,
    filePath,
    mitigationStatus,
    id: threatId,
    engines,
    siteName,
    initiatedBy,
    classification,
    siteId,
  } = threat

  const res = await getAdmin(siteId, accessToken)

  if (to) {
    const fileHash = fileSha256 ? fileSha256 : fileContentHash
    const score = await getScore(threat)

    const result = await axios.post('/api/mails', {
      to: res ? res.email.split(',') : 'support@to-tm.com',
      threatId,
      threatName,
      threatLevel: rank,
      pcName: agentComputerName,
      directory: filePath,
      virusTotalLink: `https://www.virustotal.com/latest-scan/${fileHash}`,
      status: mitigationStatus,
      conversationId: to,
      adminURL: `https://apne1-1001.sentinelone.net/incidents/threats/${threatId}/overview`,
      engines,
      siteName,
      initiatedBy,
      classification,
      score,
      fileHash,
    })

    return result
  }

  return { message: 'FAILURE' }
}
