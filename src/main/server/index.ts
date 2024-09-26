import { LocalDNSService } from "@/services"
import express, {Request} from "express"

const PORT = 80
const app = express()
app.use(express.json())

const dnsService = new LocalDNSService()

app.get("/all", async (_req, res) => {
    try{
        const allDomains = await dnsService.getAllDomainsWithPort()
        return res.status(200).json({
            domains: allDomains
        })
    }
    catch(err: any){
        return res.status(500).json({
            err: err.message
        })
    }
})

app.get("*", async function(req: Request, res){
    const hostname = req.hostname
    const domainNameFound = await dnsService.checkDomain(hostname)

    // res.send("Hello from locally running DNS server 👋.No matter where you Go I will follow")

    if(domainNameFound){
        return res.send("Found domain name")
    }
    else{
        return res.send("Domain name not found")
    }
})

export const startServer = () => {
    return app.listen(PORT, "0.0.0.0", () => {
        console.info(":) Running Local DNS Server of PORT " + PORT)
    })
}