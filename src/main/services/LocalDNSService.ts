// import fs from 'fs/promises'
// import { appendFileSync } from 'fs'
import { IPCEventResponse } from '@shared/interfaces'
import fs from 'fs'
import path from 'path'

class LocalDNSService {
  private localIP: string
  private hostsFilePath: string
  private customEntryIdentifierComment: string

  constructor() {
    this.customEntryIdentifierComment = '# Local Custom Domain'
    this.localIP = '127.0.0.1' // Localhost IP
    const windowsHostsFilePath = path.join('C:', 'Windows', 'System32', 'drivers', 'etc', 'hosts')
    const unixHostsFilePath = path.join('/etc', 'hosts')
    this.hostsFilePath = process.platform === 'win32' ? windowsHostsFilePath : unixHostsFilePath
  }

  /**
   * Check if a domain exists in the hosts file
   * @param {string} domainName Then domain name whose availability needs to be checked.
   * @returns {Promise<boolean>} Resolved with value true if check is successfull and domain found else rejects.
   */
  async checkDomain(domainName: string): Promise<boolean> {
    const entries = await this._readHostsFile()
    return entries.some((entry) => entry.includes(domainName))
  }

  /**
   * Adds domain name to your system.
   *
   * @param {string} domainName  The domain name to be added.
   * @returns {Promise<void>} Resolved if domain name added successfully else rejects if domain already exists or failed to add domain.
   *
   * @throws Error If failed to create domain
   */
  async addDomain(domainName: string, port: number): Promise<IPCEventResponse> {
    const entry = this._getDNSDomainEntry(domainName, port)
    let error
    let data

    try {
      fs.appendFileSync(this.hostsFilePath, entry, { flag: 'a' })
      data = 'Successfully added domain name - ' + domainName
    } catch (err: any) {
      if (err.code === 'EPERM') {
        error = `Permissions required to add domain.
        Please try running application as Administrator.`
      } else {
        error = 'Unknown exception occurred when trying to create domain name.'
      }
    }

    const res: IPCEventResponse = { success: false, data, error }
    return res
  }

  /**
   * Get all domains from the hosts file.
   *
   * @returns {Promise<string[]>} Resolved to array with each item as added domain name.
   * @throws {Error} If failed to read DNS hosts file.
   */
  async getAllDomainsWithPort(): Promise<{ name: string; port: string }[]> {
    const entries = await this._readHostsFile()
    return entries
      .filter((entry: string) => entry.includes(this.customEntryIdentifierComment))
      .map((entry) => ({ name: entry.split(' ')[1], port: entry.split('%')[1] })) // Extract domain names
  }

  /**
   * reads the content of hosts file.
   *
   * @returns {Promise<string[]>} Promise which when resolved returns array with each item as line in the file.
   */
  private async _readHostsFile(): Promise<string[]> {
    try {
      const data = fs.readFileSync(this.hostsFilePath, 'utf-8')
      return data.split('\n').filter((line: string) => line.trim() !== '')
    } catch (err: unknown) {
      if (err instanceof Error && 'code' in err) {
        if (err.code === 'ENOENT') throw new Error('DNS hosts file not found.')

        if (err.code === 'EPERM')
          throw new Error(
            'Missing permission to read DNS Hosts file, please try again with admin previlages.'
          )
      }
      console.error(err)
      throw new Error('Unknown exception occured while reading DNS hosts file.')
    }
  }

  /**
   * gets the dns entry in format - 127.0.0.1 $domainName # Local Custom Domain
   *
   * @param domainName The domain name whose entry is to be created in /etc/hosts.
   * @param port The port associated with domain name.
   * @returns {string} The entry for the local domain in /etc/hosts in valid format.
   */
  private _getDNSDomainEntry(domainName: string, port: number): string {
    return `${this.localIP} ${domainName} ${this.customEntryIdentifierComment} %${port}\n`
  }
}

export default LocalDNSService

// // Example usage:
// const dnsService = new LocalDNSService();

// // Add a domain
// dnsService.addDomain('my-local-domain.test');

// // Check if a domain exists
// console.log(dnsService.checkDomain('my-local-domain.test')); // true or false

// // Get all domains
// console.log(dnsService.getAllDomainsWithPort()); // Array of all local domains
