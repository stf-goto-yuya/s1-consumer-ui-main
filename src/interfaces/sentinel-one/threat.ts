import { AgentDetectionInfo } from '@/src/interfaces/sentinel-one/threats/agent-detection-info'
import { AgentRealtimeInfo } from '@/src/interfaces/sentinel-one/threats/agent-realtime-info'
import { ContainerInfo } from '@/src/interfaces/sentinel-one/threats/container-info'
import { KubernetesInfo } from '@/src/interfaces/sentinel-one/threats/kubernetes-info'
import { MitigationStatus } from '@/src/interfaces/sentinel-one/threats/mitigation-status'
import { ThreatInfo } from '@/src/interfaces/sentinel-one/threats/threat-info'

export type Threat = {
  agentDetectionInfo: AgentDetectionInfo
  agentRealtimeInfo: AgentRealtimeInfo
  containerInfo: ContainerInfo
  id: string
  indicators: []
  kubernetesInfo: KubernetesInfo
  mitigationStatus: MitigationStatus[]
  threatInfo: ThreatInfo
  whiteningOptions: string[]
}
