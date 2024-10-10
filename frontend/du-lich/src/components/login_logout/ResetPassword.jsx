import { useState } from 'react'
import Header from '../home/Header'
import { IoMdEye } from 'react-icons/io'
import { IoIosEyeOff } from 'react-icons/io'
import { apiResetPassword } from '../service/UserService'

const ResetPassword = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [reNewPassword, setReNewPassword] = useState('')
  const [err, setErr] = useState(false)
  const [success, setSuccess] = useState(false)
  const [newPw, setNewPw] = useState(false)
  const [reNewPw, setReNewPw] = useState(false)

  // reset password
  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (emailOrUsername == '' || newPassword == '' || reNewPassword == '') {
      alert('Nhap day du thong tin')
      return
    }
    const resetPassword = {
      usernameOrEmail: emailOrUsername,
      password: newPassword,
      rePassword: reNewPassword,
    }
    // create object param
    const params = new URLSearchParams(window.location.search)
    // get param token
    const token = params.get('token')
    console.log(token)
    if (!token) {
      setErr('ma token ko hop le')
      setTimeout(() => {
        setErr('')
      }, 3000)
      return
    }
    // token hop le thi thuc hien gui
    await apiResetPassword(token, resetPassword)
      .then((response) => {
        console.log(response.data)
        setSuccess(response.data)
        setTimeout(() => {
          setSuccess('')
        }, 5000)
      })
      .catch((err) => {
        console.log(err.response.data)
        setErr(err.response.data)
        setTimeout(() => {
          setErr('')
        }, 5000)
      })
  }
  const handleHiddenShow = (type) => {
    if (type == 'newPw') {
      setNewPw(!newPw)
    } else if (type == 'reNewPw') {
      setReNewPw(!reNewPw)
    }
  }
  return (
    <div className="container-lg">
      <div className="bg-info">
        <Header />
      </div>
      <div className=" bg-light vh-100 position-relative">
        <div className="card col-12 col-md-6 position-absolute top-50 start-50 translate-middle p-5">
          <h1 className="text-center text-danger">Quên mật khẩu</h1>
          {success && <div className="alert alert-success">{success}</div>}
          {err && <div className="alert alert-danger">{err}</div>}
          <form onSubmit={handleResetPassword}>
            <label htmlFor="email" className="form-label opacity-75">
              Email hoặc tên đăng nhập
            </label>
            <input
              className="form-control"
              type="text"
              id="email"
              placeholder="email hoặc tên đăng nhập"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />

            <label className="form-label  opacity-75" htmlFor="pw">
              Mật khẩu mới
            </label>
            <div className="position-relative">
              <input
                className="form-control"
                id="pw"
                type={newPw ? 'text' : 'password'}
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              ></input>
              {newPw ? (
                <IoIosEyeOff
                  className="cursor-icon position-absolute top-50 end-0 translate-middle mx-1"
                  onClick={() => handleHiddenShow('newPw')}
                />
              ) : (
                <IoMdEye
                  className="cursor-icon position-absolute top-50 end-0 translate-middle mx-1"
                  onClick={() => handleHiddenShow('newPw')}
                />
              )}
            </div>
            <label className="form-label opacity-75" htmlFor="repw">
              Nhập lại mật khẩu mới
            </label>
            <div className="position-relative">
              <input
                className="form-control"
                id="repw"
                type={reNewPw ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu"
                value={reNewPassword}
                onChange={(e) => setReNewPassword(e.target.value)}
              ></input>{' '}
              {reNewPw ? (
                <IoIosEyeOff
                  className="cursor-icon position-absolute top-50 end-0 translate-middle mx-1 "
                  onClick={() => handleHiddenShow('reNewPw')}
                />
              ) : (
                <IoMdEye
                  className=" cursor-icon position-absolute top-50 end-0 translate-middle mx-1 "
                  onClick={() => handleHiddenShow('reNewPw')}
                />
              )}
            </div>
            <div className="d-grid mt-3">
              <button className="btn btn-danger btn-block mt-2" type="submit">
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
