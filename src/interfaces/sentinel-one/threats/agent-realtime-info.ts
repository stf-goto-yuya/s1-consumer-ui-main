import { NetworkInterface } from '@/src/interfaces/sentinel-one/threats/network-interface'

export type AgentRealtimeInfo = {
  accountId: string
  accountName: string
  activeThreats: number
  agentComputerName: string
  agentDecommissionedAt: string | null
  agentDomain: string
  agentId: string
  agentInfected: boolean
  agentIsActive: boolean
  agentIsDecommissioned: boolean
  agentMachineType: string
  agentMitigationMode: string
  agentNetworkStatus: string
  agentOsName: string
  agentOsRevision: string
  agentOsType: string
  agentUuid: string
  agentVersion: string
  groupId: string
  groupName: string
  networkInterfaces: NetworkInterface[]
  operationalState: string
  rebootRequired: boolean
  scanAbortedAt: string
  scanFinishedAt: string
  scanStartedAt: string
  scanStatus: string
  siteId: string
  siteName: string
  storageName: string | null
  storageType: string | null
  userActionsNeeded: []
}
