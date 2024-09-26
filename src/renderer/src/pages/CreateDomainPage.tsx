import { FormControl } from "@/components"
import PageLayout from "@renderer/components/PageLayout";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// FORM STYLES FROM https://flowbite.com/docs/components/forms/
const styles = {
    form: "mt-32 max-w-md mb-20 mx-auto flex flex-col gap-y-5",
    formBtn: "text-white rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center focus:ring-4 focus:outline-none",
    goBackBtn: "bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800",
    createBtn: "bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
    btnGroup: "flex justify-between mt-12"
}

function CreateDomainPage() {

    const navigate = useNavigate()

    const [port, setPort] = useState("")
    const [domain, setDomain] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await window.context.createDomain(domain, port)
            console.log({ res })

            res.error ? toast.error(res.error) : toast.success(res.data)
        }
        catch (err) {
            toast.error("Failed to create domain, unknown exception occurred.")
        }
        finally {
            setPort("")
            setDomain("")
        }

    }

    return (
        <PageLayout>
            <ToastContainer />
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
                <div className={styles.btnGroup}>
                    <button
                        onClick={() => navigate("/")}
                        type="button"
                        className={[styles.formBtn, styles.goBackBtn].join(" ")}
                    >
                        Go Back
                    </button>
                    <button
                        type="submit"
                        className={[styles.formBtn, styles.createBtn].join(" ")}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </PageLayout>
    )
}

export default CreateDomainPage