import fs from 'fs/promises'
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
   */
  async addDomain(domainName: string, port: number): Promise<void> {
    await this._appendHostsFile(domainName, port)
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
      const data = await fs.readFile(this.hostsFilePath, 'utf-8')
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

  private async _appendHostsFile(domainName: string, port: number): Promise<void> {
    try {
      const entry = this._getDNSDomainEntry(domainName, port)
      fs.appendFile(this.hostsFilePath, entry, { flag: 'a' })
    } catch (err) {
      if (err instanceof Error && 'code' in err) {
        if (err.code === 'ENOENT') throw new Error('Failed to find hosts file to write DNS Entry.')

        if (err.code === 'EPERM')
          throw new Error(
            'Permission denied to create DNS entry, please run application as Administrator.'
          )
      }
      console.error(err)
      throw new Error('Unknown exception occurred, failed to add domain name.')
    }
  }

  /**
   * gets the dns entry in supported format with IP 127.0.0.1 or localhost. Appends comment at the end of each DNS entry containing port number with prefix %
   *
   * @param domainName The domain name whose entry is to be created in /etc/hosts.
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
