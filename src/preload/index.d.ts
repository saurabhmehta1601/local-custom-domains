import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    // electron: ElectronAPI
    // TODO: Add properties exposed in Rendered
    context: {
      checkDomain: (domainName: string) => Promise<boolean>
    }
  }
}
