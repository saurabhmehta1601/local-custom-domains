import { ComponentProps } from 'react'

const styles = {
  container: 'bg-gray-700 '
}

const Card = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={[styles.container, className ?? ''].join(' ')} {...props}>
      {props.children}
    </div>
  )
}

export default Card
