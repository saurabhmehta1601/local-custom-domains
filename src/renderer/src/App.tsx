import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div>
      <h1 className='my-8 font-bold text-4xl text-blue-500 text-center '>Hello from Electron</h1>
    </div>
  )
}

export default App
