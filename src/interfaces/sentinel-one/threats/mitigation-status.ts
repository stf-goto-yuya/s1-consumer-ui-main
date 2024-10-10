import { ActionsCounters } from '@/src/interfaces/sentinel-one/threats/action-counters'

export type MitigationStatus = {
  action: string
  actionsCounters: ActionsCounters
  agentSupportsReport: boolean
  groupNotFound: boolean
  lastUpdate: string
  latestReport: string
  mitigationEndedAt: string
  mitigationStartedAt: string
  status: string
}
