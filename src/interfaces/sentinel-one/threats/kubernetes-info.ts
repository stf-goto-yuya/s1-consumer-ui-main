export type KubernetesInfo = {
  cluster: string | null
  controllerKind: string | null
  controllerLabels: string | null
  controllerName: string | null
  isContainerQuarantine: string | null
  namespace: string | null
  namespaceLabels: string | null
  node: string | null
  nodeLabels: string | null
  pod: string | null
  podLabels: string | null
}
