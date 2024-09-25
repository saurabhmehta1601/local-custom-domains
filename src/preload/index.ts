import { contextBridge, ipcRenderer } from "electron"
import { EVENTS } from "@shared/constants"

if(!process.contextIsolated){
  throw new Error("Context Isolation must be enabled in Browser Window.")
}

try{
  // TODO: add contents that needs to be exposed
  contextBridge.exposeInMainWorld('context', {
    checkDomain: (domainName: string) => ipcRenderer.invoke(EVENTS.CHECK_DOMAIN, domainName)
  })
} catch(err){
  console.error(err)
}