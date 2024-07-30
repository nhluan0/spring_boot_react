

import { Link, useNavigate } from 'react-router-dom'

const PaginationItems = ({ currentItems }) => {
    const navigator = useNavigate()
    function handleUpdateTour(id) {
        navigator(`/tours/update/${id}`)
    }

    return (

        <div className='table-responsive'>
            <table className='table  table-bordered '>
                <thead>
                    <tr>
                        <th style={{ minWidth: "180px" }}>Tên chuyến du lịch</th>
                        <th style={{ minWidth: "120px" }}>Giá (VND)</th>
                        <th>Ảnh chuyến đi</th>
                        <th style={{ minWidth: "180px" }}>Mô tả chi tiết</th>
                        <th style={{ minWidth: "150px" }}>Ngày bắt đầu</th>
                        <th style={{ minWidth: "150px" }}>Ngày kết thúc</th>
                        <th style={{ minWidth: "150px" }}>Địa chỉ</th>
                        <th style={{ minWidth: "120px" }}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems &&
                        currentItems.map((t) => {
                            const tour = JSON.parse(t)

                            return < tr key={tour.id} >
                                <td>{tour.name}</td>
                                <td>{tour.price}</td>
                                <td>
                                    <div className='d-flex justify-content-center'>
                                        <img
                                            src={`data:image/jpeg;base64,${tour.image}`}
                                            style={{ maxHeight: "150px", width: "200px" }}
                                        />
                                    </div>
                                </td>
                                <td><Link to={`/tours/view/detail/${tour.id}`}>Xem chi tiết</Link></td>
                                <td>{tour.start_date}</td>
                                <td>{tour.end_date}</td>
                                <td>{tour.address}</td>
                                <td >
                                    <button
                                        onClick={() => handleUpdateTour(tour.id)}
                                        className='btn btn-sm btn-success'
                                    >
                                        sửa
                                    </button>
                                    <button
                                        className='btn btn-sm btn-danger mx-1'
                                    >
                                        xóa
                                    </button>
                                </td>
                            </tr>
                        }
                        )
                    }
                </tbody>
            </table>
        </div>

    );
}

export default PaginationItems
