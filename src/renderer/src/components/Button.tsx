import { ComponentProps } from 'react'

const styles = {
  base: 'py-2 px-3 bg-gray-800 rounded-lg text-sm font-bold hover:active:opacity-[0.8]',
  active: 'bg-blue-800'
}

type IProps = ComponentProps<'button'> & {
  isActive?: boolean
}

// GET MORE BUTTON STYLES FROM
// https://devdojo.com/tailwindcss/buttons

const Button = ({ className, children, ...props }: IProps) => {
  return (
    <button
      className={[styles.base, props.isActive ?? styles.active, className].join(' ')}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
