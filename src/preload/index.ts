import { contextBridge, ipcRenderer } from "electron"
import { EVENTS } from "@shared/constants"

if(!process.contextIsolated){
  throw new Error("Context Isolation must be enabled in Browser Window.")
}

try{
  // TODO: add contents that needs to be exposed
  contextBridge.exposeInMainWorld('context', {
    createDomain: (domainName: string) => ipcRenderer.invoke(EVENTS.CREATE_DOMAIN, domainName),
    getAllDomains: () => ipcRenderer.invoke(EVENTS.GET_ALL_DOMAINS)
  })
} catch(err){
  console.error(err)
}