// BUTTON STYLES FROM https://devdojo.com/tailwindcss/buttons 
const ReadDocsButton = () => {
    return (
        <a href="#_" className="w-72 text-center relative inline-flex items-center justify-center  py-4 overflow-hidden font-mono font-bold  text-white text-2xl bg-gray-800 rounded-lg group">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-96 group-hover:h-56"></span>
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span className="relative">READ DOCS</span>
        </a>
    )
}

export default ReadDocsButton