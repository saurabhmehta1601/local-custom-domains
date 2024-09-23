import { ComponentProps } from "react"

const NavButton1 = (props: ComponentProps<'button'>) => {
    return (
        <a href="#_" className="relative inline-flex items-center justify-center px-12 py-2 text-lg font-bold  text-white bg-gray-800 rounded-md group">
            <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-purple-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-purple-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
            <span className="relative text-purple-600 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
                {props.children}
            </span>
        </a>

    )
}

export default NavButton1