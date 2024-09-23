import { Button } from "@/components"

const styles = {
    container: "px-8 py-6 flex items-center max-w-6xl",
    title: "text-4xl flex-1",
    btnGroup: "flex gap-x-2"
}

const Header = () => {
    return (
        <div className={[styles.container].join(" ")}>
            <h3 className={styles.title}>LCD</h3>
            <div className={styles.btnGroup}>
                <Button isActive={true}>Button 1</Button>
                <Button>Button 2</Button>
                <Button>Button 3</Button>
            </div>
        </div>
    )
}

export default Header