import LocalDNSService from "@/services/LocalDNSService";
import { ipcMain, IpcMainInvokeEvent } from "electron";
import { EVENTS } from "@shared/constants"

const localDNSService = new LocalDNSService()

export const initializeIPCHandlers = () => {
    ipcMain.handle(EVENTS.CHECK_DOMAIN, async function handleDomainCheck(_event: IpcMainInvokeEvent, domainName: string){
        try{
            const res = await localDNSService.checkDomain(domainName)
            console.log({ res })
        }
        catch(err){
            console.log("Failed to check domain.")
        }
    })
}