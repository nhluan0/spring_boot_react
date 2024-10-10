import { Link, NavLink, useNavigate } from 'react-router-dom'
import { apiLogout } from '../service/LoginService'

import GlobalContext from '../../UseContext'
import { setTokenGlobal } from '../login_logout/Login'

const Header = () => {
  const { username, setUsername, role, setRole, setToken } = GlobalContext()

  const navigator = useNavigate()

  // logout
  const handleLogout = async () => {
    await apiLogout()
      .then((response) => {
        setToken('')
        // xoar username
        setUsername('')
        // xoa role
        setRole('')
        setTokenGlobal('')
        console.log(response.data)
        navigator('/home')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // xem thong tin da dat tour
  const handleDetailTourBooked = () => {
    navigator('/home/info')
  }
  return (
    <nav className="navbar navbar-expand-lg head ">
      <NavLink className="navbar-brand" to="/home">
        Home
      </NavLink>
      <button
        className="navbar-toggler mx-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar_toggler"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbar_toggler">
        <ul className="navbar-nav ms-auto pl-1">
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/home/tour">
              Tours
            </Link>
          </li>

          {role == 'ADMIN' && (
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/users">
                Manager
              </Link>
            </li>
          )}

          {username && (
            <li className="nav-item">
              <div className="dropdown">
                <a
                  className="btn dropdown-toggle nav-link"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
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
          )}

          {!username && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                <button className="btn btn-sm btn-outline-dark">login</button>
              </NavLink>
            </li>
          )}
          {username && (
            <li className="nav-item">
              <a className="nav-link " href="#">
                <button
                  className="btn btn-sm btn-outline-dark"
                  onClick={handleLogout}
                >
                  logout
                </button>
              </a>
            </li>
          )}
          {!username && (
            <li className="nav-item">
              <NavLink className="nav-link " to="/dang-ky">
                <button className="btn btn-sm btn-outline-dark">
                  register
                </button>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Header
