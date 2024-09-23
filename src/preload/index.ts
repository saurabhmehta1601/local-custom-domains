import { contextBridge } from "electron"

if(!process.contextIsolated){
  throw new Error("Context Isolation must be enabled in Browser Window.")
}


try{
  // TODO: add contents that needs to be exposed
  contextBridge.exposeInMainWorld('context', {

  })
} catch(err){
  console.error(err)
}