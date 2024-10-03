import { useEffect, useState } from 'react'
import {
  // apiGetAllUserByPage,
  // apiPaginateByPage,
  apiPatchById,
  apiSearchByUsernameOrPhoneNumberv2,
} from '../service/UserService'
import ModalAddOrUpdateUser from './ModalAddOrUpdateUser'
import { useNavigate } from 'react-router-dom'
import HeaderManager from '../../common/HeaderManager'
import PaginationUser from '../pagination/PaginationUser'

function ManagerUser() {
  const [users, setUsers] = useState([])

  const [showModalAddNewUser, setShowModalAddNewUser] = useState(false)
  const [refeshUser, setRefeshUser] = useState(true)
  const [pageCount, setPageCount] = useState(0)
  // input search
  const [inputSearch, setInputSearch] = useState('')
  // hien thi loi search
  const [errorSearch, setErrorSearch] = useState('')
  // show modal update
  const [modalUpdate, setModalUpdate] = useState(false)
  const [booleanSearch, setBooleanSearch] = useState(false)
  const [searchPage, setSearchPage] = useState(0)
  const navigator = useNavigate()

  useEffect(() => {
    // Kiểm tra xem có cần reset booleanSearch khi component mount không
    setBooleanSearch(false)
  }, [])
  const searchApi = async () => {
    const search = {
      usernameOrPhoneNumber: inputSearch,
    }
    setBooleanSearch(true)
    await apiSearchByUsernameOrPhoneNumberv2(searchPage, search)
      .then((response) => {
        console.log(response)
        const arrSearch = response.data.content

        setUsers(arrSearch)
        setPageCount(response.data.totalPages)
        // set gia tri input search ve lai ""
        // setInputSearch('')
      })
      .catch((err) => {
        setBooleanSearch(false)
        setErrorSearch(err.response.data)
        console.error(err)
        setInputSearch('')
        setTimeout(() => {
          setErrorSearch('')
        }, 3000)
      })
  }
  // ham search
  const handleSearch = (e) => {
    // kiem tra value input co gia tri khong va event co xay ra tren nut enter ko thi serach
    if (inputSearch && e.key == 'Enter') {
      searchApi()
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
                onKeyDown={(e) => handleSearch(e)}
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
              pageCount={pageCount}
              setPageCount={setPageCount}
              booleanSearch={booleanSearch}
              setSearchPage={setSearchPage}
              searchApi={searchApi}
              searchPage={searchPage}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default ManagerUser
