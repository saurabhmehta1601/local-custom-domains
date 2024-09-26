import LocalDNSService from "@/services/LocalDNSService";
import { ipcMain } from "electron";
import { EVENTS } from "@shared/constants"
import { IPCEventResponse } from "@shared/interfaces";

const localDNSService = new LocalDNSService()

export const initializeIPCHandlers = () => {

    ipcMain.handle(EVENTS.CREATE_DOMAIN, async function createDomain(_event, domainName, port){
        try{
            const domainAlreadyExists = await localDNSService.checkDomain(domainName)
            if(domainAlreadyExists){
                 return {
                    error: "Domain Already Exists."
                } as IPCEventResponse
            }
            await localDNSService.addDomain(domainName, port)
            return {
                data: "Domain Added Successfully.",
            } as IPCEventResponse
        } catch(err: any){
            const errorMessage = err instanceof Error && "message" in err ? err.message : "Unknown exception occured while creating domain."
            return {
                error: errorMessage 
            } as IPCEventResponse
        }
    })

    ipcMain.handle(EVENTS.GET_ALL_DOMAINS_WITH_PORT, async function getAllDomainsWithPort(_event){
        try{
            const allDomains = await localDNSService.getAllDomainsWithPort()
            return {
                data: allDomains
            } as IPCEventResponse
        }
        catch(err){
            const errorMessage = err instanceof Error && "message" in err ? err.message : "Unknown error occured while getting all domains."
            return {
                error: errorMessage
            } as IPCEventResponse
        }
    })
}