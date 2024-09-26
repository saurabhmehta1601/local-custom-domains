import { ComponentProps } from 'react'
import Header from './Header'

const PageLayout = (props: ComponentProps<"div">) => {
    return (
        <div>
            <Header />
            {props.children}
        </div>
    )
}

export default PageLayout