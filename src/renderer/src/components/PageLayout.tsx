import { ComponentProps } from 'react'
import Header from './Header'

const styles = {

}

const PageLayout = (props: ComponentProps<"div">) => {
    return (
        <div className='h-screen'>
            <Header />
            {props.children}
        </div>
    )
}

export default PageLayout