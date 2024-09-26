import fs from "fs/promises"
import path from "path";

class LocalDNSService {
    private localIP: string;
    private hostsFilePath: string;
    private customEntryIdentifierComment: string;

    constructor() {
        this.customEntryIdentifierComment = "# Local Custom Domain"
        this.localIP = '127.0.0.1'; // Localhost IP
        if(process.platform === "win32"){
            this.hostsFilePath = path.join("C:", "Windows", "System32", "drivers", "etc", "hosts");
        } else{
            this.hostsFilePath = '/etc/hosts';
        }
    }

    /**
     * Check if a domain exists in the hosts file  
     * @param {string} domainName Then domain name whose availability needs to be checked.
     * @returns {Promise<boolean>} Resolved with value true if check is successfull and domain found else rejects.
     */
    async checkDomain(domainName: string): Promise<boolean> {
        const entries = await this._readHostsFile();
        return  entries.some(entry => entry.includes(domainName));
    }

    /**
     * Adds domain name to your system.
     * 
     * @param {string} domainName  The domain name to be added.
     * @returns {Promise<void>} Resolved if domain name added successfully else rejects if domain already exists or failed to add domain.
     */
    async addDomain(domainName: string): Promise<void>  {
        try{
            const entry = this._getDNSDomainEntry(domainName);
            await fs.appendFile(this.hostsFilePath, entry, { flag: 'a' });
        }
        catch(err: any){

            if(err.code === "ENOENT"){
                throw new Error("Failed to find hosts file to write DNS Entry.")
            }

            if(err.code === "EPERM"){
                throw new Error("Permission denied to create DNS entry, please run application as Administrator.")
            }
            console.error(err)
            throw new Error("Unknown exception occurred, failed to add domain name.") 
        }
    }

    /**
     * Get all domains from the hosts file.
     * 
     * @returns {Promise<string[]>} Resolved to array with each item as added domain name.
     */
    async getAllDomains(): Promise<string[]> {
        try{
            const entries = await this._readHostsFile();
            return entries
                .filter((entry: string) => entry.includes(this.customEntryIdentifierComment))
                .map(entry => entry.split(' ')[1]); // Extract domain names
        }
        catch(err: unknown){
            console.error(err)
            throw new Error("Failed to get all domains.")
        }
    }

    /**
     * reads the content of hosts file. 
     * 
     * @returns {Promise<string[]>} Promise which when resolved returns array with each item as line in the file.
     */
    private async _readHostsFile(): Promise<string[]> {
        const data = await fs.readFile(this.hostsFilePath, 'utf-8');
        return data.split('\n').filter((line: string) => line.trim() !== '');
    }

    /**
     * gets the domain name entry in valid format for given domainName in file /etc/hosts
     * 
     * @param domainName The domain name whose entry is to be created in /etc/hosts.
     * @returns {string} The entry for the local domain in /etc/hosts in valid format.
     */
    private _getDNSDomainEntry(domainName: string): string{
        return `${this.localIP} ${domainName} ${this.customEntryIdentifierComment} \n`
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
// console.log(dnsService.getAllDomains()); // Array of all local domains