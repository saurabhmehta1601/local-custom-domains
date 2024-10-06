import { PageLayout, Table } from "@/components"
import { useEffect, useState } from "react"

const ListDomainsPage = () => {
    const [allDomains, setAllDomains] = useState<{ name: string, port: string }[]>([])
    const [_error, setError] = useState("")
    const [_isLoading, setIsLoading] = useState(true)

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
            <Table
                className="mt-8 w-fit mx-auto"
                headers={["DOMAIN", "PORT"]}
                rows={allDomains.map((domain) => ([domain.name, domain.port]))}
            />
        </PageLayout>
    )
}

export default ListDomainsPage