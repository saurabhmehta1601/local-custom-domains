import { ComponentProps } from "react"

const btnStyles = "inline-block py-3 text-xl text-white bg-gray-800 px-7 hover:bg-gray-700 rounded-xl"

const NavButton2 = (props: ComponentProps<'a'>) => {
    return (
        <a
            href="#_"
            className={btnStyles}
            {...props}
        />
    )
}

export default NavButton2