const GetStartedButton = () => {
    return <a href="#_" className="w-72 text-center py-3 relative rounded-sm group  text-white text-2xl font-bold inline-block">
        <span className="absolute top-0 left-0 w-full h-full rounded-sm opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-sm opacity-50 from-purple-600 to-blue-500"></span>
        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-sm shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-sm bg-gradient-to-br to-purple-600 from-blue-500"></span>
        <span className="relative">GET STARTED</span>
    </a>
}

export default GetStartedButton