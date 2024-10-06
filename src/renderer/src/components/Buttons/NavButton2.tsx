import { ComponentProps } from 'react'

const btnStyles =
  'py-3 px-7 inline-block text-xl text-white hover:opacity-60 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-900'

const NavButton2 = (props: ComponentProps<'a'>) => {
  return <a href="#_" className={btnStyles} {...props} />
}

export default NavButton2
