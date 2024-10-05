import { PageLayout, Table } from "@/components"
import { useEffect, useState } from "react"


const styles = {
    noDomainsBannerContainer: "w-96 p-16 border-2 border-white rounded-lg mx-auto mt-32",
    noDomainHeadingText: "text-center",
    domainDataTable: "mt-8 w-fit mx-auto"

}

const ListDomainsPage = () => {
    const [allDomains, setAllDomains] = useState<{ name: string, port: string }[]>([])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const listAllDomains = async () => {

        try {
            const res = await window.context.getAllDomainsWithPort()
            if (res.data) {
                setAllDomains(res.data)
            }
            else {
                setError("Error while loading domains")
            }
        }
        catch (err) {

        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        listAllDomains()
    }, [])
    return (
        <PageLayout>
            {
                allDomains.length > 0 ? 
                <Table
                    className={styles.domainDataTable}
                    headers={["DOMAIN", "PORT"]}
                    rows={allDomains.map((domain) => ([domain.name, domain.port]))} 
                />
                
            }

        </PageLayout>
    )
}

export default ListDomainsPage