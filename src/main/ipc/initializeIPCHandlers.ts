import LocalDNSService from "@/services/LocalDNSService";
import { ipcMain } from "electron";
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

    ipcMain.handle(EVENTS.GET_ALL_DOMAINS, async function getAllDomains(_event){
        try{
            const allDomains = await localDNSService.getAllDomains()
            return {
                data: allDomains
            } as IPCEventResponse
        }
        catch(err){
            return {
                error: "Unknown error occured while fetching all domains."
            } as IPCEventResponse
        }
    })

}