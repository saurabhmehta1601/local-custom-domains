import { LocalDNSService } from '@/services'
import express, { Request } from 'express'

const PORT = 80
const app = express()
app.use(express.json())

const dnsService = new LocalDNSService()

app.get('*', async function (req: Request, res) {
  const hostname = req.hostname
  const domainNameFound = await dnsService.checkDomain(hostname)

  const allDomains = await dnsService.getAllDomainsWithPort()
  const matchedDomain = allDomains.find((d) => d.name.toLowerCase() === hostname.toLowerCase())

  if (matchedDomain) {
    return res.redirect('http://localhost:' + matchedDomain.port)
  } else {
    res.status(404).json({
      error: 'Domain not found.'
    })
  }

  // res.send("Hello from locally running DNS server 👋.No matter where you Go I will follow")

  if (domainNameFound) {
    return res.send('Found domain name')
  } else {
    return res.send('Domain name not found')
  }
})

export const startServer = () => {
  return app.listen(PORT, '0.0.0.0', () => {
    console.info(':) Running Local DNS Server of PORT ' + PORT)
  })
}
