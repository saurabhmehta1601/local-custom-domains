import { FormControl } from "@/components"
import { useState } from "react"

// FORM STYLES FROM https://flowbite.com/docs/components/forms/
const styles = {
    page: "h-full grid place-items-center",
    form: "max-w-sm mx-auto flex flex-col gap-y-5",
    goBackBtn: "text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800",
    createBtn: "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
}

function CreateDomainPage() {

    const [port, setPort] = useState("")
    const [domain, setDomain] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert("Form is submitted")
    }

    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <FormControl
                    type="text"
                    inputValue={domain}
                    onInputValueChange={(e) => setDomain(e.target.value)}
                    isRequired={true}
                    label="Your Local Domain"
                    id="domain"
                    placeholder="E.g. localhost, mystore.site, etc"
                />
                <FormControl
                    type="number"
                    inputValue={port}
                    onInputValueChange={(e) => setPort(e.target.value)}
                    isRequired={true}
                    label="Port"
                    id="port"
                    placeholder="E.g. 3000, 5555, 8080, 5432"
                />
                <div className="flex justify-between">
                    <button
                        onClick={() => window.history.back()}
                        type="button"
                        className={styles.goBackBtn}
                    >
                        Go Back
                    </button>
                    <button
                        type="submit"
                        className={styles.createBtn}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateDomainPage