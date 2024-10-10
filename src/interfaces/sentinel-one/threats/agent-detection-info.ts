export type AgentDetectionInfo = {
  accountId: string
  accountName: string
  agentDetectionState: string | null
  agentDomain: string
  agentIpV4: string
  agentIpV6: string
  agentLastLoggedInUpn: string | null
  agentLastLoggedInUserMail: string | null
  agentLastLoggedInUserName: string
  agentMitigationMode: string
  agentOsName: string
  agentOsRevision: string
  agentRegisteredAt: string
  agentUuid: string
  agentVersion: string
  cloudProviders: any
  externalIp: string
  groupId: string
  groupName: string
  siteId: string
  siteName: string
}
