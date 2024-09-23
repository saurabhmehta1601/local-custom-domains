import { ComponentProps } from "react"

const NavButton2 = (props: ComponentProps<'button'>) => {
    return (
        <a href="#_" className="inline-block py-3 text-xl text-white bg-gray-800 px-7 hover:bg-gray-700 rounded-xl">
            {props.children}
        </a>
    )
}

export default NavButton2