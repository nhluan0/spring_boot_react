import { useState } from 'react'
import { apiLogin } from '../service/LoginService'
import { jwtDecode } from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom'
import GlobalContext from '../../UseContext'
import Header from '../home/Header'
let tokenGlobal = ""
// Hàm để cập nhật giá trị của tokenGlobal
export const setTokenGlobal = (newToken) => {
    tokenGlobal = newToken;
};
const Login = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("")
    const [password, setPassword] = useState("")
    const [messErr, setMessErr] = useState("")
    const navigator = useNavigate()

    const { setToken, setUsername, setRole } = GlobalContext()
    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        // check if chua dien het thong tin thi hien thi thong bao nguoi dung nen dien day du thonng tin

        if (usernameOrEmail == "" || password == "") {
            alert("Dien day du thong tin!")

        } else {
            let loginRequest = {
                userNameOrEmail: usernameOrEmail,
                password: password
            }

            await apiLogin(loginRequest).then(response => {

                const data = response.data
                // lay token
                let token = data.token
                // set token dang bearer
                token = `Bearer ${token}`
                // luu vao localstorage
                setToken(token)
                tokenGlobal = token
                console.log(token)
                // giai ma token
                const decodedToken = jwtDecode(token)
                // lay role luu trong token
                const role = decodedToken.scope
                // lay user name trong token
                const username = decodedToken.sub
                // luu username vao session 
                setUsername(username)
                // luu vai tro user vao local 
                setRole(role)
                console.log(username)
                // if user la admin thi dieu huong sang trang quan ly 
                if (role == 'ADMIN') {
                    navigator("/users")
                } else {
                    // if user ko phai admin thi dieu huong sang trang home
                    navigator("/home")
                }

            }).catch(err => {
                console.error(err)
                tokenGlobal = ""
                const messError = err.response.data
                setMessErr(messError)
                setTimeout(() => {
                    setMessErr("")
                }, 5000)

            })
        }

    }
    return (
        <div className='container-lg bg-light'>
            <div className='bg-info' >
                <Header />
            </div>

            <div className='row justify-content-center align-items-center mx-1 ' style={{ height: "100vh" }}>

                <div className='card col-lg-6 '>

                    <div className='card-body'>
                        <h3>Dang Nhap</h3>
                        {messErr && <div className='alert text-danger alert-success'>{messErr}</div>}
                        <form >
                            <label className='form-label' htmlFor='userOrEmail'>UserName or email:</label>
                            <input
                                className='form-control'
                                id="userOrEmail"
                                type='text'
                                placeholder='Nhap ten or email'
                                value={usernameOrEmail}
                                onChange={(e) => setUsernameOrEmail(e.target.value)}
                            >
                            </input>
                            <label className='form-label' htmlFor='pw'>Password:</label>
                            <input
                                className='form-control'
                                id="pw"
                                type='password'
                                placeholder='Nhap password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </input>

                            <button className="btn btn-danger btn-block mt-2" type='submit' onClick={(e) => handleSubmitLogin(e)}>Login</button>
                            <Link to="/home" className='btn btn-success mt-2 mx-1'>Home</Link>


                        </form>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

const GlobalToken = () => {

    return tokenGlobal
}
export { GlobalToken }