import { useEffect, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import {
  apiAddNewUser,
  apiGetById,
  apiUpdateUserById,
} from '../service/UserService'

import { useNavigate, useParams } from 'react-router-dom'
import { IoEyeOutline } from 'react-icons/io5'
import { FaRegEyeSlash } from 'react-icons/fa'

const ModalAddOrUpdateUser = ({
  setShowModal,
  setRefeshUser,
  setModalUpdate,
  showModalAddNewUser,
  modalUpdate,
  setErrorSearch,
}) => {
  const [user, setUser] = useState({
    fullName: '',
    userName: '',
    password: '',
    email: '',
    phoneNumber: '',
    address: '',
    roles: '',
  })
  const [error, setError] = useState({
    fullName: '',
    userName: '',
    password: '',
    email: '',
    phoneNumber: '',
    address: '',
    roles: '',
  })
  const { id } = useParams()
  const navigator = useNavigate()
  const [show, setShow] = useState(true)
  const refInput = useRef()
  useEffect(() => {
    if (modalUpdate) {
      handleGetUserById(id)
    }
  }, [id])
  setRefeshUser(false)

  // handle change input
  const handleInputChange = (e) => {
    const name = e.target.name
    let value = e.target.value
    setUser({ ...user, [name]: value })
  }
  // handle submit and add a new user
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Gọi API để thêm mới người dùng
    if (showModalAddNewUser) {
      await apiAddNewUser(user)
        .then((response) => {
          console.log('Phản hồi từ API:', response)
          setShowModal(false) // dong modal
          setRefeshUser(true)
          setErrorSearch('Thêm user thanh cong')
          setTimeout(() => {
            setErrorSearch('')
          }, 3000)
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            const errr = err.response.data
            const resetError = {
              fullName: '',
              userName: '',
              password: '',
              email: '',
              phoneNumber: '',
              address: '',
              roles: '',
            }
            // Cập nhật state  va reset lai error voi gia tri ban dau với lỗi từ API
            setError({ ...resetError, ...errr })
          }
        })
    }
    if (modalUpdate && id) {
      await apiUpdateUserById(id, user)
        .then((response) => {
          console.log('Phản hồi từ API:', response.data)

          setRefeshUser(true)
          setModalUpdate(false)
          setErrorSearch('Update user thanh cong')
          setTimeout(() => {
            setErrorSearch('')
          }, 3000)
          navigator('/users')
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            const errr = err.response.data
            const resetError = {
              fullName: '',
              userName: '',
              password: '',
              email: '',
              phoneNumber: '',
              address: '',
              roles: '',
            }
            // Cập nhật state  va reset lai error voi gia tri ban dau với lỗi từ API
            setError({ ...resetError, ...errr })
          }
        })
    }
  }
  async function handleGetUserById(id) {
    if (id) {
      await apiGetById(id)
        .then((response) => {
          const userGetted = response.data
          console.log(userGetted)
          setUser({ ...user, ...userGetted })
          console.log(user)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  // click vao mat
  const handleShowPassword = (event) => {
    const currentId = event.target.id // Lấy id của phần tử mà sự kiện xảy ra
    console.log(currentId)

    if (currentId === 'eye1') {
      setShow(!show)
      refInput.current.type = show ? 'text' : 'password' // Chuyển đổi giữa 'text' và 'password'
    }
  }
  const handleHiddenPassword = (event) => {
    const currentId = event.target.id // Lấy id của phần tử mà sự kiện xảy ra
    console.log(currentId)
    if (currentId == 'eye_1') {
      setShow(!show)
      refInput.current.type = show ? 'text' : 'password' // Chuyển đổi giữa 'text' và 'password'
    }
  }
  return (
    <div className=" modal-background ">
      <div className="container-lg row justify-content-center ">
        <div className="col-lg-8 main-modal">
          <div className=" d-flex align-items-center">
            <h5 className="mb-0">Thêm mới</h5>
            <IoMdClose
              className="ms-auto m-1 fs-1 x_close"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setShowModal(false)
                setModalUpdate(false)
                navigator('/users')
              }}
            />
          </div>
          <hr></hr>
          <form>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label" htmlFor="fullname">
                  Họ và tên:
                </label>
                <input
                  id="fullname"
                  className="form-control"
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleInputChange}
                ></input>
                {error.fullName && (
                  <p className="text-danger">{error.fullName}</p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="email">
                  Email:
                </label>
                <input
                  id="email"
                  className="form-control"
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                ></input>
                {error.email && <p className="text-danger">{error.email}</p>}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label" htmlFor="phone">
                  Số điện thoại:
                </label>
                <input
                  id="phone"
                  className="form-control"
                  type="number"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleInputChange}
                ></input>
                {error.phoneNumber && (
                  <p className="text-danger">{error.phoneNumber}</p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="address">
                  Địa chỉ:
                </label>
                <input
                  id="address"
                  className="form-control"
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleInputChange}
                ></input>
                {error.address && (
                  <p className="text-danger">{error.address}</p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label" htmlFor="account">
                  Tài khoản:
                </label>
                <input
                  id="account"
                  className="form-control"
                  type="text"
                  name="userName"
                  value={user.userName}
                  onChange={handleInputChange}
                ></input>
                {error.userName && (
                  <p className="text-danger">{error.userName}</p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="password">
                  Mật khẩu:
                </label>
                <div className="input_pw">
                  <input
                    id="password"
                    className="form-control"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                    ref={refInput}
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

                {error.password && (
                  <p className="text-danger">{error.password}</p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label" htmlFor="role">
                  Vai trò:
                </label>
                <select
                  className="form-select"
                  id="role"
                  name="roles"
                  value={user.roles}
                  onChange={handleInputChange}
                >
                  <option value="">Vai trò</option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
                {error.roles && <p className="text-danger">{error.roles}</p>}
              </div>
            </div>
            <hr></hr>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-sm btn-secondary mx-1 "
                onClick={() => {
                  setShowModal(false)
                  setModalUpdate(false)
                  navigator('/users')
                }}
              >
                Đóng
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-sm btn-success "
              >
                {showModalAddNewUser && 'Thêm'}
                {modalUpdate && 'Cập Nhật'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ModalAddOrUpdateUser
