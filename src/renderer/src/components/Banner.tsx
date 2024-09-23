import { GetStartedButton, ReadDocsButton } from "@/components"

const styles = {
    banner: "mt-64 flex justify-center items-center",
    btnGroup: "flex gap-x-8 items-center"
}

const Banner = () => {
    return (
        <div className={styles.banner}>
            <div className={styles.btnGroup}>
                <GetStartedButton />
                <ReadDocsButton />
            </div>
        </div>
    )
}

export default Banner