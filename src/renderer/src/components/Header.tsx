import { NavButton1, NavButton2 } from '@/components'
import { useNavigate } from 'react-router-dom'

const styles = {
  container: 'px-8 py-6 flex items-center max-w-6xl ',
  title:
    'w-fit cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500',
  btnGroup: 'flex items-center gap-x-6'
}

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className="flex-1">
        <h1 className={styles.title} onClick={() => navigate('/')}>
          LCD
        </h1>
      </div>
      <div className={styles.btnGroup}>
        <NavButton1 onClick={() => navigate('/create')}>CREATE</NavButton1>
        <NavButton2 onClick={() => navigate('/domains')}>Your Domains</NavButton2>
      </div>
    </div>
  )
}

export default Header
