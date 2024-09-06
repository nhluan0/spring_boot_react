
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { apiLogout, getRole, getUserFromSession, logout } from '../service/LoginService'
import { useEffect, useState } from 'react'


const Header = () => {
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("")
    useEffect(() => {
        // lay username tu session 
        const user = getUserFromSession()
        setUsername(user)
        // lay role 
        const vaitro = getRole()
        setRole(vaitro)
    }, [])
    const navigator = useNavigate()

    // logout
    const handleLogout = async () => {
        await apiLogout().then(response => {
            // xoa token va session
            logout()
            setUsername("")
            setRole("")
            console.log(response.data)
        }).catch(err => {
            console.log(err)
        })
    }
    // xem thong tin da dat tour
    const handleDetailTourBooked = () => {
        navigator("/home/info")
    }
    return (
        <nav className='navbar navbar-expand-lg head '>
            <NavLink className='navbar-brand' to="/home">Home</NavLink>

            <ul className="navbar-nav ms-auto">
                {role == "ADMIN" &&
                    <li className="nav-item">
                        <Link className="nav-link " aria-current="page" to="/users">Manager</Link>
                    </li>
                }

                {username && <li className="nav-item" >

                    <div className='dropdown'>
                        <a className="btn dropdown-toggle nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {username}
                        </a>

                        <ul className="dropdown-menu">
                            <li className="nav-item">
                                <a
                                    className="dropdown-item nav-link text-dark"
                                    href="#"
                                    onClick={handleDetailTourBooked}
                                >
                                    Tour đã booked
                                </a>
                            </li>

                        </ul>
                    </div>
                </li>

                }



                {!username &&
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">
                            <button className='btn btn-sm btn-outline-dark'>login</button>
                        </NavLink>
                    </li>
                }
                {username &&
                    <li className="nav-item">
                        <a className="nav-link " href="#">
                            <button className='btn btn-sm btn-outline-dark' onClick={handleLogout}>logout</button>
                        </a>
                    </li>
                }
                {!username &&
                    <li className="nav-item">
                        <NavLink className="nav-link " to="/dang-ky">
                            <button className='btn btn-sm btn-outline-dark'>register</button>
                        </NavLink>
                    </li>
                }

            </ul>
        </nav >
    )
}

export default Header
