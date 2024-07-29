import { useEffect, useState } from 'react'
import { apiGetAllTour, apiSearchTourByAddress } from '../service/TourService'
import { Link, useNavigate } from 'react-router-dom'
import PaginationCommon from '../pagination/PaginationCommon'

const ManagerTour = () => {
    const [tours, setTours] = useState([])
    const [search, setSearch] = useState("")
    const [messAlerts, setMeeAlerts] = useState("")
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const navigator = useNavigate()

    useEffect(() => {

        getAllTours()

    }, [])

    // get all tours
    const getAllTours = async () => {
        await apiGetAllTour().then(response => {
            console.log(response.data)
            const arr = response.data.map(tour => JSON.stringify(tour))
            setTours(arr)
        }).catch(err => {
            console.log(err)

        })
    }

    // search Tour By address
    const handleKeyPress = async (e) => {
        if (e.key === "Enter") {
            await apiSearchTourByAddress(search).then(
                response => {

                    const arr = response.data.map(tour => JSON.stringify(tour))
                    setTours(arr)
                    setItemOffset(0);
                    setCurrentPage(0); // Đặt lại currentPage về 0
                    console.log(arr)
                    setSearch("")
                }
            ).catch(err => {
                console.log(err)
                setSearch("")
                setMeeAlerts(err.response.data)
                setTimeout(() => {
                    setMeeAlerts("")

                }, 3000)
            })
        }

    }
    // chuyen huong toi trang add
    const handleNavigationAdd = () => {
        navigator("/tours/add-new")
    }
    return (
        <div className='container-lg'>
            <br></br>
            {messAlerts && <div className='alert alert-success'>{messAlerts}</div>}
            <div className='d-flex py-2'>
                <button
                    className='btn btn-sm btn-info '
                    onClick={handleNavigationAdd}
                >Thêm</button>
                <input
                    className='form-control ms-auto'
                    style={{ maxWidth: "250px" }}
                    placeholder='Tìm Kiếm'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e)}
                ></input>
            </div>

            <PaginationCommon
                itemsPerPage={3}
                items={tours}
                isTour="true"
                itemOffset={itemOffset}
                setItemOffset={setItemOffset}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage} // Truyền thêm currentPage và setCurrentPage
            >

            </PaginationCommon>


        </div >
    )
}

export default ManagerTour
