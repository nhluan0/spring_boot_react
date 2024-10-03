import ReactPaginate from 'react-paginate'
import PaginationUserItems from './PaginationUserItems'
import { useEffect, useState } from 'react'
import {
  apiGetListUserByNumPagePaginate,
  apiPatchById,
} from '../service/UserService'

const PaginationUser = ({
  handelShowModalUpdate,
  setErrorSearch,
  refeshUser,
  users,
  setUsers,
}) => {
  const [pageCount, setPageCount] = useState(0)
  const [numpage, setNumpage] = useState(0)

  useEffect(() => {
    handleGetUser(numpage)
  }, [numpage, refeshUser])
  const handleGetUser = async (page) => {
    await apiGetListUserByNumPagePaginate(page)
      .then((reponse) => {
        console.log(reponse.data)
        setUsers(reponse.data.content)
        console.log(reponse.data.totalPages)
        setPageCount(reponse.data.totalPages)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
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
  const handlePageClick = (event) => {
    console.log(event.selected)
    setNumpage(event.selected)
  }

  return (
    <>
      {/* <Items currentItems={currentItems} /> */}
      <PaginationUserItems
        users={users}
        handelShowModalUpdate={handelShowModalUpdate}
        handleLockOrUnLock={handleLockOrUnLock}
      />
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLinkClassName="page-link"
        activeClassName="active"
      />
    </>
  )
}

export default PaginationUser
