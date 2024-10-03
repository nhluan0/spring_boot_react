import { useEffect, useState } from 'react'
import {
  // apiGetAllUserByPage,
  // apiPaginateByPage,
  apiPatchById,
  apiSearchByUserNameOrPhoneNumber,
} from '../service/UserService'
import ModalAddOrUpdateUser from './ModalAddOrUpdateUser'
import { useNavigate } from 'react-router-dom'
import HeaderManager from '../../common/HeaderManager'
import PaginationUser from '../pagination/PaginationUser'

function ManagerUser() {
  const [users, setUsers] = useState([])

  const [showModalAddNewUser, setShowModalAddNewUser] = useState(false)
  const [refeshUser, setRefeshUser] = useState(true)

  // input search
  const [inputSearch, setInputSearch] = useState('')
  // hien thi loi search
  const [errorSearch, setErrorSearch] = useState('')
  // show modal update
  const [modalUpdate, setModalUpdate] = useState(false)

  const navigator = useNavigate()

  // useEffect(() => {
  //   if (refeshUser) {
  //     handleApiGetAllUser()
  //   }
  // }, [refeshUser])

  // // ham goi api get all user for first load page
  // const handleApiGetAllUser = async () => {
  //   await apiGetAllUserByPage().then((response) => {
  //     console.log(response)
  //     setUsers(response.data.content)
  //     const page = response.data.totalPages
  //     let arrPage = []
  //     if (page > 0) {
  //       for (let i = 1; i <= page; i++) {
  //         arrPage.push(i)
  //       }
  //     }
  //     // setTotalPage(arrPage)
  //   })
  //   setRefeshUser(false)
  // }
  // ham search
  const handleSearch = async (e) => {
    // kiem tra value input co gia tri khong va event co xay ra tren nut enter ko thi serach
    if (inputSearch && e.key == 'Enter') {
      await apiSearchByUserNameOrPhoneNumber(inputSearch)
        .then((response) => {
          const arrSearch = response.data
          if (arrSearch.length > 0) {
            setUsers(response.data)
            // set gia tri input search ve lai ""
            setInputSearch('')
            // setTotalPage([])
          }
        })
        .catch((err) => {
          setErrorSearch(err.response.data)
          console.error(err)
          setInputSearch('')
          setTimeout(() => {
            setErrorSearch('')
          }, 3000)
        })
    }
  }
  // show modal sua
  const handelShowModalUpdate = (id) => {
    setModalUpdate(true)
    navigator(`/users/${id}`)
  }
  // xu ly khoa or mo khoa
  const handleLockOrUnLock = async (id, index) => {
    await apiPatchById(id)
      .then((response) => {
        console.log(response.data)
        // coppy user cu
        let newUsers = [...users]
        // set thuoc tinh isLock cho usermoi
        newUsers[index].isLock = !newUsers[index].isLock
        // cap nhat users thanh user moi
        setUsers(newUsers)
      })
      .catch((err) => {
        // hien thi loi
        setErrorSearch(err.response.data)
        console.error(err)
        setTimeout(() => {
          setErrorSearch('')
        }, 3000)
      })
  }

  // // ham click phan trang
  // const handleClickPaginate = async (page) => {
  //   await apiPaginateByPage(page)
  //     .then((response) => {
  //       console.log(response)
  //       // to mau phan trang
  //       setPaintPhantrang(page)
  //       const userList = response.data.content
  //       // set lai user lay duoc
  //       setUsers(userList)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }
  // // nut next or prev phan trang click
  // const handleNext = async (page) => {
  //   if (page == totalPage.length) {
  //     page = 1
  //   } else {
  //     page += 1
  //   }
  //   handleClickPaginate(page)
  // }
  // // nut next or prev phan trang click
  // const handlePrev = async (page) => {
  //   if (page == 1) {
  //     page = totalPage.length
  //   } else {
  //     page -= 1
  //   }
  //   handleClickPaginate(page)
  // }
  return (
    <>
      <HeaderManager />
      <main className="container-lg">
        {(showModalAddNewUser || modalUpdate) && (
          <ModalAddOrUpdateUser
            setShowModal={setShowModalAddNewUser}
            setRefeshUser={setRefeshUser}
            setModalUpdate={setModalUpdate}
            showModalAddNewUser={showModalAddNewUser}
            modalUpdate={modalUpdate}
            setErrorSearch={setErrorSearch}
          />
        )}
        <br></br>
        {errorSearch && (
          <div className="alert alert-success">{errorSearch}</div>
        )}
        <div className="">
          <div className="d-flex align-items-center">
            <button
              onClick={() => setShowModalAddNewUser(true)}
              className="btn btn-sm btn-secondary"
            >
              Thêm
            </button>
            <div className="col-md-2 ms-auto">
              <input
                type="text"
                className="rounded px-1 form-control"
                placeholder="Search..."
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>
          <div className="table-responsive">
            <PaginationUser
              handelShowModalUpdate={handelShowModalUpdate}
              handleLockOrUnLock={handleLockOrUnLock}
              setErrorSearch={setErrorSearch}
              refeshUser={refeshUser}
              users={users}
              setUsers={setUsers}
            />
          </div>
          {/* phan trang
          {totalPage.length > 0 && (
            <nav aria-label="navigation">
              <ul className="pagination">
                <li
                  className="page-item"
                  onClick={() => handlePrev(paintPhantrang)}
                >
                  <a className="page-link " style={{ cursor: 'pointer' }}>
                    {'<<'}
                  </a>
                </li>

                {totalPage.map((page) => (
                  <li
                    key={page}
                    className="page-item"
                    onClick={() => handleClickPaginate(page)}
                    style={{ cursor: 'pointer' }}
                  >
                    <a
                      className={
                        paintPhantrang === page
                          ? 'page-link bg-info'
                          : 'page-link '
                      }
                    >
                      {page}
                    </a>
                  </li>
                ))}

                <li
                  className="page-item"
                  onClick={() => handleNext(paintPhantrang)}
                >
                  <a className="page-link" style={{ cursor: 'pointer' }}>
                    {'>>'}
                  </a>
                </li>
              </ul>
            </nav>
          )} */}
        </div>
      </main>
    </>
  )
}

export default ManagerUser
