import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const HeaderManager = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-success navbar-fixed '>
            <div className='container-fluid'>
                <Link className='navbar-brand' to="#" href="#">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar_toggler">
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id="navbar_toggler">
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className="nav-link" to="/tours">Tours</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className="nav-link" to="/users">Users</NavLink>
                        </li>
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item'>
                            <NavLink className="nav-link" to="">Log out</NavLink>

                        </li>

                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default HeaderManager
