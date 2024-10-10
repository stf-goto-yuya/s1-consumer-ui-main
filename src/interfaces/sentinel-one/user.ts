import { ApiToken } from '@/src/interfaces/sentinel-one/api-token'
import { ScopeRole } from '@/src/interfaces/sentinel-one/scope-role'

export type User = {
  apiToken: ApiToken
  canGenerateApiToken: boolean
  dateJoined: string
  email: string
  emailReadOnly: boolean
  emailVerified: boolean
  firstLogin: string
  fullName: string
  fullNameReadOnly: boolean
  groupsReadOnly: boolean
  id: string
  isSystem: boolean
  lastLogin: string
  lowestRole: string
  primaryTwoFaMethod: string
  scope: string
  scopeRoles: Array<ScopeRole>
  siteRoles: []
  source: string
  tenantRoles: []
  twoFaConfigured: boolean
  twoFaEnabled: boolean
  twoFaStatus: string
}
