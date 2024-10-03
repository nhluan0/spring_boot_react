import { IoBookSharp } from 'react-icons/io5'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const TourCard = ({ tour, index }) => {
  const navigator = useNavigate()
  const handleClickDetail = (e) => {
    const id = e.currentTarget.id

    navigator(`/home/detail/${id}`)
  }
  return (
    <div
      id={tour.id}
      className="card mx-1 my-1"
      style={{ overflow: 'hidden', cursor: 'pointer' }}
      key={index}
      onClick={(e) => handleClickDetail(e)}
    >
      <img
        src={`data:image/jpeg;base64,${tour.image}`}
        style={{ height: '150px', width: 'auto' }}
      />
      <div className="row  ps-1">
        <h5 className="col-8 ">{tour.name}</h5>
        <h6 className="text-center col-4 text-danger">{tour.price}</h6>
      </div>
      <div className="row ps-1 justify-content-center">
        <div className=" col-8 ">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              className={index + 1 <= tour.rate ? 'text-warning' : ''}
            />
          ))}

          <label className="form-label ps-2">5 sao</label>
        </div>
        <div className="text-center text-info col-4">VND</div>
      </div>
      <div className="ps-1">
        from {tour.start_date} to {tour.end_date}
      </div>
      <hr style={{ margin: '0', padding: '0' }}></hr>
      <div className="row ps-1 justify-content-center my-2">
        <div className="col-8">
          <IoBookSharp /> {tour.address}
        </div>
        <div className="col-4 ">
          <button className="btn btn-success btn-sm">Book now</button>
        </div>
      </div>
    </div>
  )
}

export default TourCard
