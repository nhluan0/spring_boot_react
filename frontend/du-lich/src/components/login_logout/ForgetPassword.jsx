import { useState } from 'react'
import Header from '../home/Header'
import { apiForgetPassword } from '../service/UserService'
import { FaSpinner } from 'react-icons/fa6'

const ForgetPassword = () => {
  const [messErr, setMessErr] = useState('')
  const [messSuccess, setMessSuccess] = useState('')
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [load, setLoad] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const forgetPassword = {
      usernameOrEmail: emailOrUsername,
    }
    setLoad(true)
    await apiForgetPassword(forgetPassword)
      .then((response) => {
        console.log(response.data)
        setLoad(false)
        setMessSuccess(response.data)
        setTimeout(() => {
          setMessSuccess('')
        }, 10000)
      })
      .catch((err) => {
        console.log(err.response.data)
        setLoad(false)
        setMessErr(err.response.data)
        setTimeout(() => {
          setMessErr('')
        }, 4000)
      })
  }
  return (
    <div className="container-lg">
      <div className="bg-info">
        <Header />
      </div>
      <div className=" bg-light vh-100 position-relative">
        <div className="card col-12 col-md-6 position-absolute top-50 start-50 translate-middle p-5">
          <h1 className="text-center text-danger">Quên Mật Khẩu</h1>
          {load && (
            <div className="text-center">
              <FaSpinner className="spinner text-success fs-3" />
            </div>
          )}
          {messErr && <div className="alert alert-danger">{messErr}</div>}
          {messSuccess && (
            <div className="alert alert-success">{messSuccess}</div>
          )}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label fs-5 opacity-50 ">
              Email hoặc số điện thoại
            </label>
            <input
              className="form-control"
              id="email"
              type="text"
              placeholder="Nhập email hoặc số điện thoại"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
            <div className="d-grid my-2">
              <button type="submit" className="btn btn-sm btn-danger my-2">
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
