import { useEffect, useState } from "react"

const ListDomainsPage = () => {
    const [allDomains, setAllDomains] = useState([])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const listAllDomains = async () => {

        try{
            const res = await window.context.getAllDomains()
            if(res.data){
                setAllDomains(res.data)
            }
            else{
                setError("Error while loading domains")
            }
        }
        catch(err){

        }
        finally{
            setIsLoading(false)
        }
    }
    useEffect(() => {
        listAllDomains()
    }, [])
    return (
        <div>
            {JSON.stringify({allDomains, error, isLoading})}
        </div>
    )
}

export default ListDomainsPage