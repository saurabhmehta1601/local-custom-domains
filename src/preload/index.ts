import { contextBridge, ipcRenderer } from 'electron'
import { EVENTS } from '@shared/constants'

if (!process.contextIsolated) {
  throw new Error('Context Isolation must be enabled in Browser Window.')
}

try {
  // TODO: add contents that needs to be exposed
  contextBridge.exposeInMainWorld('context', {
    createDomain: (domainName: string, port: string) =>
      ipcRenderer.invoke(EVENTS.CREATE_DOMAIN, domainName, port),
    getAllDomainsWithPort: () => ipcRenderer.invoke(EVENTS.GET_ALL_DOMAINS_WITH_PORT)
  })
} catch (err) {
  console.error(err)
}
