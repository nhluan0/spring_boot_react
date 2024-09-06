import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { apiLogout, getUserFromSession, logout } from '../components/service/LoginService'

const HeaderManager = () => {
    const [user, setUser] = useState("")

    useEffect(() => {
        const username = getUserFromSession()
        setUser(username)
    }, [])

    const handleLogout = async () => {
        // log out
        await apiLogout().then(
            response => {
                // xoa token va session 
                logout()
                setUser("")
                console.log(response.data)
            }
        ).catch(err => {
            console.log(err)
        })
    }
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-success navbar-fixed '>
            <div className='container-fluid'>
                <Link className='navbar-brand' to="/home" >Home</Link>
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
                        {user &&
                            <li className='nav-item'>
                                <NavLink className="nav-link" to="" >{user}</NavLink>

                            </li>
                        }
                        {user &&
                            <li className='nav-item'>
                                <NavLink className="nav-link" to="" onClick={handleLogout}>Log out</NavLink>

                            </li>
                        }


                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default HeaderManager
