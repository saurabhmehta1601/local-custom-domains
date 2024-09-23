import { NavButton1, NavButton2 } from "@/components"

const styles = {
    container: "px-8 py-6 flex items-center max-w-6xl",
    title: "text-4xl flex-1",
    btnGroup: "flex items-center gap-x-6"
}

const Header = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>LCD</h3>
            <div className={styles.btnGroup}>
                <NavButton1>CREATE</NavButton1>
                <NavButton2>Your Local Customs Domains</NavButton2>
            </div>
        </div>
    )
}

export default Header