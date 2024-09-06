

import { Link } from 'react-router-dom'

export default function HeaderSearch({ search, keys }) {



    return (
        <div className='top-home-page'>

            <div className='content-head d-flex' >
                <h5 className='text-white' >
                    <Link to="/home" className='text-white' style={{ textDecoration: 'none' }}>Home</Link>

                </h5>
                {search &&
                    <h5 className='text-white mx-3'>{search}</h5>
                }

            </div>
            <div className='location'>
                <h3 className='text-white text-uppercase text-center' >Khoa tiem kiem: {keys}</h3>
            </div>

        </div>
    )
}
