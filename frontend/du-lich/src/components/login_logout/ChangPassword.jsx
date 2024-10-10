import { useState } from 'react'
import Header from '../home/Header'
import { apiChangePassword } from '../service/UserService'
import { useNavigate } from 'react-router-dom'
import { IoMdEye } from 'react-icons/io'
import { IoIosEyeOff } from 'react-icons/io'

const ChangPassword = () => {
  const [messErr, setMessErr] = useState('')
  const [messSuccess, setMessSuccess] = useState('')
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [reEnterPw, setReEnterPw] = useState('')
  const [oldPasswork, setOldPassword] = useState('')
  const [oldpw, setOldpw] = useState(false)
  const [newPw, setNewPw] = useState(false)
  const [reNewPw, setReNewPw] = useState(false)
  const navigator = useNavigate()

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault()
    if (
      usernameOrEmail == '' ||
      password == '' ||
      reEnterPw == '' ||
      oldPasswork == ''
    ) {
      alert('dien day du thong tin truoc khi gui di!')
      return
    }
    const user = {
      usernameOrEmail: usernameOrEmail,
      oldPassword: oldPasswork,
      newPassword: password,
      reNewPassword: reEnterPw,
    }
    // send to backend handle change password
    await apiChangePassword(user)
      .then((response) => {
        console.log(response.data)
        setMessSuccess(response.data + ' dang chuyen huong den trang login')
        setTimeout(() => {
          setMessSuccess('')
          navigator('/login')
        }, 4000)
      })
      .catch((err) => {
        console.log(err.response.data)
        setMessErr(err.response.data)
        setTimeout(() => {
          setMessErr('')
        }, 4000)
      })
  }
  const handleHiddenShow = (type) => {
    if (type == 'oldpw') {
      setOldpw(!oldpw)
    } else if (type == 'newPw') {
      setNewPw(!newPw)
    } else if (type == 'reNewPw') {
      setReNewPw(!reNewPw)
    }
  }
  return (
    <div className="container-lg bg-light">
      <div className="bg-info">
        <Header />
      </div>
      <div
        className="row justify-content-center align-items-center mx-1 "
        style={{ height: '100vh' }}
      >
        <div className="card col-lg-6 ">
          <div className="card-body">
            <h3 className="text-center text-danger my-3">Thay Đổi Mật Khẩu</h3>
            {messSuccess && (
              <div className="alert text-primary alert-success">
                {messSuccess}
              </div>
            )}
            {messErr && (
              <div className="alert text-success alert-danger">{messErr}</div>
            )}
            <form onSubmit={handleSubmitChangePassword}>
              <label className="form-label" htmlFor="userOrEmail">
                Tên đăng nhập or email
              </label>
              <input
                className="form-control"
                id="userOrEmail"
                type="text"
                placeholder="Nhap ten or email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              ></input>
              <label className="form-label" htmlFor="pwold">
                Mật khẩu cũ
              </label>
              <div className="position-relative">
                <input
                  id="pwold"
                  className="form-control "
                  placeholder="Nhập mật khẩu cũ"
                  type={oldpw ? 'text' : 'password'}
                  value={oldPasswork}
                  onChange={(e) => setOldPassword(e.target.value)}
                ></input>
                {oldpw ? (
                  <IoIosEyeOff
                    className=" cursor-icon position-absolute top-50 end-0 translate-middle mx-1"
                    onClick={() => handleHiddenShow('oldpw')}
                  />
                ) : (
                  <IoMdEye
                    className="cursor-icon position-absolute top-50 end-0 translate-middle mx-1"
                    onClick={() => handleHiddenShow('oldpw')}
                  />
                )}
              </div>

              <label className="form-label" htmlFor="pw">
                Mật khẩu mới
              </label>
              <div className="position-relative">
                <input
                  className="form-control"
                  id="pw"
                  type={newPw ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu mới"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <label className="form-label" htmlFor="repw">
                Nhập lại mật khẩu mới
              </label>
              <div className="position-relative">
                <input
                  className="form-control"
                  id="repw"
                  type={reNewPw ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu mới"
                  value={reEnterPw}
                  onChange={(e) => setReEnterPw(e.target.value)}
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
              <div className="d-grid">
                <button className="btn btn-danger btn-block mt-2" type="submit">
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangPassword
