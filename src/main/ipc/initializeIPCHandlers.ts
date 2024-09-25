import LocalDNSService from "@/services/LocalDNSService";
import { ipcMain, IpcMainInvokeEvent } from "electron";
import { EVENTS } from "@shared/constants"
import { IPCEventResponse } from "@shared/interfaces";

const localDNSService = new LocalDNSService()

export const initializeIPCHandlers = () => {

    ipcMain.handle(EVENTS.CREATE_DOMAIN, async function createDomain(_event, domainName){
        try{
            const domainAlreadyExists = await localDNSService.checkDomain(domainName)
            if(domainAlreadyExists){
                 return {
                    error: "Domain Already Exists."
                } as IPCEventResponse
            }
            await localDNSService.addDomain(domainName)
            return {
                data: "Domain Added Successfully.",
            } as IPCEventResponse
        } catch(err: any){
            return {
                error: ( err && err.message ) ? err.message : "Unknown exception occured."
            } as IPCEventResponse
        }
    })

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