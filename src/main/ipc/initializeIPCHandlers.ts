import LocalDNSService from '@/services/LocalDNSService'
import { ipcMain } from 'electron'
import { EVENTS } from '@shared/constants'
import { IPCEventResponse } from '@shared/interfaces'

const localDNSService = new LocalDNSService()

export const initializeIPCHandlers = () => {
  ipcMain.handle(EVENTS.CREATE_DOMAIN, async function createDomain(_event, domainName, port) {
    let res: IPCEventResponse

    const domainAlreadyExists = await localDNSService.checkDomain(domainName)
    if (domainAlreadyExists) {
      res = { success: false, error: 'Domain Already Exists.' }
      return res
    }

    res = await localDNSService.addDomain(domainName, port)
    return res
  })

  ipcMain.handle(EVENTS.GET_ALL_DOMAINS_WITH_PORT, async function getAllDomainsWithPort(_event) {
    try {
      const allDomains = await localDNSService.getAllDomainsWithPort()
      return {
        data: allDomains
      } as IPCEventResponse
    } catch (err) {
      const errorMessage =
        err instanceof Error && 'message' in err
          ? err.message
          : 'Unknown error occured while getting all domains.'
      return {
        error: errorMessage
      } as IPCEventResponse
    }
  })
}
