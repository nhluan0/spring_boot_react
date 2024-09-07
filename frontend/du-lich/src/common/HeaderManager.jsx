
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { apiLogout } from '../components/service/LoginService'
import GlobalContext from '../UseContext'
import { setTokenGlobal } from '../components/login_logout/Login'

const HeaderManager = () => {
    const { username, setUsername, setRole, setToken } = GlobalContext()
    const navigator = useNavigate()


    const handleLogout = async () => {
        // log out
        await apiLogout().then(response => {
            setToken("")
            // xoar username 
            setUsername("")
            // xoa role
            setRole("")
            setTokenGlobal("")
            console.log(response.data)
            navigator("/home")
        }).catch(err => {
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
                        {username &&
                            <li className='nav-item'>
                                <NavLink className="nav-link" to="" >{username}</NavLink>

                            </li>
                        }
                        {username &&
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
