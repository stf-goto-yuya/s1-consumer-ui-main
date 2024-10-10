import { DetectionEngine } from '@/src/interfaces/sentinel-one/threats/detection-engines'

export type ThreatInfo = {
  analystVerdict: string
  analystVerdictDescription: string
  automaticallyResolved: boolean
  browserType: string | null
  certificateId: string
  classification: string
  classificationSource: string
  cloudFilesHashVerdict: string
  collectionId: string
  confidenceLevel: string
  createdAt: string
  detectionEngines: DetectionEngine[]
  detectionType: string
  engines: string[]
  externalTicketExists: boolean
  externalTicketId: string | null
  failedActions: boolean
  fileExtension: string | null
  fileExtensionType: string | null
  filePath: string
  fileSize: 0
  fileVerificationType: string | null
  identifiedAt: string
  incidentStatus: string
  incidentStatusDescription: string
  initiatedBy: string
  initiatedByDescription: string
  initiatingUserId: string | null
  initiatingUsername: string | null
  isFileless: boolean
  isValidCertificate: boolean
  maliciousProcessArguments: string | null
  md5: string | null
  mitigatedPreemptively: boolean
  mitigationStatus: string
  mitigationStatusDescription: string
  originatorProcess: string
  pendingActions: boolean
  processUser: string
  publisherName: string | null
  reachedEventsLimit: string | null
  rebootRequired: boolean
  sha1: string
  sha256: string | null
  storyline: string
  threatId: string
  threatName: string
  updatedAt: string
}
