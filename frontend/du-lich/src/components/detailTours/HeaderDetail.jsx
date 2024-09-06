
import Header from '../home/Header'

export default function HeaderDetail({ title }) {
    return (
        <div className='top-home-page'>
            <Header />
            <div className='location'>
                <h3 className='text-white text-uppercase text-center' >{title}</h3>
            </div>
        </div>
    )
}
