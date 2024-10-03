import { useRef, useState } from 'react'
import { apiRegisterUser } from '../service/RegisterNewUserService'
import { Link } from 'react-router-dom'
import Header from '../home/Header'
import { CgSpinner } from 'react-icons/cg'
import { IoEyeOutline } from 'react-icons/io5'
import { FaRegEyeSlash } from 'react-icons/fa'

const Register = () => {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [messSuccess, setMessSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(true)
  const [show2, setShow2] = useState(true)
  const refInput1 = useRef()
  const refInput2 = useRef()

  const [errorMess, setErrorMess] = useState({
    email: '',
    fullName: '',
    userName: '',
    password: '',
    rePassword: '',
    phoneNumber: '',
    address: '',
  })
  // xu ly submit
  const handleSubmitRegisterNew = async (e) => {
    setLoading(true)
    e.preventDefault()

    const userRequest = {
      email: email,
      fullName: fullName,
      userName: userName,
      password: password,
      phoneNumber: phoneNumber,
      address: address,
    }

    await apiRegisterUser(userRequest)
      .then((response) => {
        setLoading(false)
        console.log(response.data)
        if (response.status == 201) {
          setMessSuccess(response.data)
          setTimeout(() => {
            setMessSuccess('')
          }, [10000])
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
        const error = err.response.data
        let messError = {
          email: error.email,
          fullName: error.fullName,
          userName: error.userName,
          password: error.password,
          rePassword: '',
          phoneNumber: error.phoneNumber,
          address: error.address,
        }
        // check mat khau co trung hay khong
        if (password != rePassword) {
          messError.rePassword = 'mat khau ko khop'
        }
        setErrorMess(messError)
        setTimeout(() => {
          setErrorMess({
            email: '',
            fullName: '',
            userName: '',
            password: '',
            rePassword: '',
            phoneNumber: '',
            address: '',
          })
        }, [10000])
      })
  }
  // click vao mat
  const handleShowPassword = (event) => {
    const currentId = event.target.id // Lấy id của phần tử mà sự kiện xảy ra
    console.log(currentId)

    if (currentId === 'eye1') {
      setShow(!show)
      refInput1.current.type = show ? 'text' : 'password' // Chuyển đổi giữa 'text' và 'password'
    }
    if (currentId === 'eye2') {
      setShow2(!show2)
      refInput2.current.type = show2 ? 'text' : 'password' // Chuyển đổi giữa 'text' và 'password'
    }
  }
  const handleHiddenPassword = (event) => {
    const currentId = event.target.id // Lấy id của phần tử mà sự kiện xảy ra
    console.log(currentId)
    if (currentId == 'eye_1') {
      setShow(!show)
      refInput1.current.type = show ? 'text' : 'password' // Chuyển đổi giữa 'text' và 'password'
    }
    if (currentId == 'eye_2') {
      setShow2(!show2)
      refInput2.current.type = show2 ? 'text' : 'password' // Chuyển đổi giữa 'text' và 'password'
    }
  }

  return (
    <div className="container-lg bg-light">
      <div className="bg-info">
        <Header />
      </div>

      <div
        className="row flex-wrap align-content-center justify-content-center"
        style={{ height: 'auto' }}
      >
        <form className="col-lg-6 my-3">
          <div className="card ">
            <div className="card-header">
              <h2 className="text-center">Đăng Ký</h2>
            </div>
            <div className="card-body">
              {loading && (
                <div className="text-center text-danger fs-2">
                  <CgSpinner className="spinner" />
                </div>
              )}
              {messSuccess && (
                <h3 className="form-label text-danger ">{messSuccess}</h3>
              )}

              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                className="form-control"
                id="email"
                placeholder="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              {/* hien thi loi email */}
              {errorMess.email && (
                <div className="text-danger">{errorMess.email}</div>
              )}

              <label htmlFor="fullname" className="form-label">
                Họ và tên
              </label>
              <input
                className="form-control"
                id="fullname"
                placeholder="Họ và tên"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              ></input>
              {/* hien thi loi fullname */}
              {errorMess.fullName && (
                <div className="text-danger">{errorMess.fullName}</div>
              )}

              <label htmlFor="username" className="form-label">
                Tên đăng nhập
              </label>
              <input
                className="form-control"
                id="username"
                placeholder="username"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              ></input>
              {/* hien thi loi username */}
              {errorMess.userName && (
                <div className=" text-danger">{errorMess.userName}</div>
              )}

              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <div className="input_pw">
                <input
                  className="form-control"
                  id="password"
                  placeholder="Mật khẩu"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  ref={refInput1}
                ></input>
                {show ? (
                  <IoEyeOutline
                    className="icon_eye"
                    onClick={handleShowPassword}
                    id="eye1"
                  />
                ) : (
                  <FaRegEyeSlash
                    className="icon_eye"
                    onClick={handleHiddenPassword}
                    id="eye_1"
                  />
                )}
              </div>
              {/* hien thi loi password */}
              {errorMess.password && (
                <div className=" text-danger">{errorMess.password}</div>
              )}
              <label htmlFor="repw" className="form-label">
                Nhập lại mật khẩu
              </label>
              <div className="input_pw">
                <input
                  className="form-control"
                  id="repw"
                  placeholder="Nhập lại mật khẩu"
                  type="password"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  ref={refInput2}
                ></input>
                {show2 ? (
                  <IoEyeOutline
                    className="icon_eye"
                    onClick={handleShowPassword}
                    id="eye2"
                  />
                ) : (
                  <FaRegEyeSlash
                    className="icon_eye"
                    onClick={handleHiddenPassword}
                    id="eye_2"
                  />
                )}
              </div>

              {/* hien thi loi nhap lai pass word */}
              {errorMess.rePassword && (
                <div className=" text-danger">{errorMess.rePassword}</div>
              )}

              <label htmlFor="phonenumber" className="form-label">
                Số điện thoại
              </label>
              <input
                className="form-control"
                id="phonenumber"
                placeholder="Số điện thoại"
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              ></input>
              {/* hien thi loi phonenumber */}
              {errorMess.phoneNumber && (
                <div className=" text-danger">{errorMess.phoneNumber}</div>
              )}

              <label htmlFor="address" className="form-label">
                Địa chỉ
              </label>
              <input
                className="form-control"
                id="address"
                placeholder="Địa chỉ"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
              {/* hien thi loi address */}
              {errorMess.address && (
                <div className="text-danger">{errorMess.address}</div>
              )}
            </div>
            <div className="card-footer">
              <button
                type="submit"
                className="btn btn-xl btn-danger"
                onClick={(e) => handleSubmitRegisterNew(e)}
              >
                Đăng ký
              </button>
              <Link to="/home" className="btn btn-success mx-1">
                Home
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
