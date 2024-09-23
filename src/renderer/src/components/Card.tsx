import { ComponentProps } from 'react'

const styles = {
    container: 'bg-gray-700 '
}

const Card = (props: ComponentProps<'div'>) => {
    return (
        <div className={[styles.container, props.className ?? ""].join(" ")}>
            {props.children}
        </div>
    )
}

export default Card