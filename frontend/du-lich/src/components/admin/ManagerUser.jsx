import { useEffect, useState } from 'react'
import { apiGetAllUserByPage, apiPatchById, apiSearchByUserNameOrPhoneNumber } from '../service/UserService'
import ModalAddOrUpdateUser from './ModalAddOrUpdateUser'
import { useNavigate } from 'react-router-dom'

function ManagerUser() {
    const [users, setUsers] = useState([])
    const [totalPage, setTotalPage] = useState([])
    const [showModalAddNewUser, setShowModalAddNewUser] = useState(false)
    const [refeshUser, setRefeshUser] = useState(true)
    const [paintPhantrang, setPaintPhantrang] = useState(1)
    // input search 
    const [inputSearch, setInputSearch] = useState("")
    // hien thi loi search 
    const [errorSearch, setErrorSearch] = useState("")
    // show modal update
    const [modalUpdate, setModalUpdate] = useState(false)

    const navigator = useNavigate()

    useEffect(() => {
        if (refeshUser) {
            handleApiGetAllUser();
        }

    }, [refeshUser])

    // ham goi api get all user for first load page
    const handleApiGetAllUser = async () => {

        await apiGetAllUserByPage().then(response => {
            console.log(response)
            setUsers(response.data.content)
            const page = response.data.totalPages
            let arrPage = []
            if (page > 0) {
                for (let i = 1; i <= page; i++) {
                    arrPage.push(i)
                }
            }
            setTotalPage(arrPage)
        })
        setRefeshUser(false)
    }
    // ham search 
    const handleSearch = async (e) => {
        // kiem tra value input co gia tri kho va event co xay ra tren nut enter ko thi serach
        if (inputSearch && e.key == "Enter") {
            await apiSearchByUserNameOrPhoneNumber(inputSearch).then(
                response => {
                    const arrSearch = response.data
                    if (arrSearch.length > 0) {
                        setUsers(response.data)
                        // set gia tri input search ve lai ""
                        setInputSearch("")
                        setTotalPage([])
                    }

                }
            ).catch(err => {
                setErrorSearch(err.response.data)
                console.error(err)
                setInputSearch("")
                setTimeout(() => {
                    setErrorSearch("")

                }, 3000)
            }

            )
        }
    }
    // show modal sua
    const handelShowModalUpdate = (id) => {
        setModalUpdate(true)
        navigator(`/users/${id}`)
    }
    // xu ly khoa or mo khoa
    const handleLockOrUnLock = async (id) => {

        await apiPatchById(id).then(response => {
            console.log(response.data)
            setRefeshUser(true)
        }).catch(err => {
            console.error(err)
        })
    }
    return (
        <main className='container-lg'>
            {(showModalAddNewUser || modalUpdate) &&
                <ModalAddOrUpdateUser
                    setShowModal={setShowModalAddNewUser}
                    setRefeshUser={setRefeshUser}
                    setModalUpdate={setModalUpdate}
                    showModalAddNewUser={showModalAddNewUser}
                    modalUpdate={modalUpdate}
                    setErrorSearch={setErrorSearch}
                />}
            <br></br>
            {errorSearch &&
                <div className='alert alert-success'>{errorSearch}</div>
            }
            <div className=''>
                <div className='d-flex align-items-center'>
                    <button onClick={() => setShowModalAddNewUser(true)} className='btn btn-sm btn-secondary'>Thêm</button>
                    <div className='col-md-2 ms-auto'>
                        <input
                            type='text'
                            className='rounded px-1 form-control'
                            placeholder='Search...'
                            value={inputSearch}
                            onChange={(e) => setInputSearch(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>

                </div>

                <table className='table table-response '>
                    <thead>
                        <tr>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Tài khoản</th>
                            <th>Vai trò</th>
                            <th>Trạng thái</th>
                            <th style={{ minWidth: "180px" }}>Hành động</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 &&
                            users.map((user) =>
                                <tr key={user.id}>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.roles}</td>
                                    {!user.isLock ? <td className='text-success fw-bold'>Hoạt động</td> :
                                        <td className='text-danger fw-bold'>khóa</td>}
                                    <td >
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm mx-1"
                                            onClick={() => handelShowModalUpdate(user.id)}
                                        >
                                            Sửa
                                        </button>

                                        {!user.isLock ?
                                            <button onClick={() => handleLockOrUnLock(user.id)} type="button" className="btn btn-success btn-sm ">Khóa</button>
                                            : <button onClick={() => handleLockOrUnLock(user.id)} type="button" className="btn btn-danger btn-sm">Mở</button>}

                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
                {/* phan trang */}
                {totalPage.length > 0 &&
                    <nav aria-label="navigation" >
                        <ul className="pagination" >
                            <li className="page-item"><a className="page-link " href="#">{"<<"}</a></li>

                            {totalPage.map(page =>
                                <li
                                    key={page}
                                    className="page-item"
                                    onClick={() => {
                                        setPaintPhantrang(page)
                                    }}
                                >
                                    <a className={paintPhantrang === page ? "page-link bg-info" : "page-link "} href="#">
                                        {page}
                                    </a>
                                </li>
                            )}

                            <li className="page-item"><a className="page-link" href="#">{">>"}</a></li>
                        </ul>
                    </nav>}


            </div>

        </main>
    )
}

export default ManagerUser
