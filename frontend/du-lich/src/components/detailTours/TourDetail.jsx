import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetTourById } from '../service/TourService'
import HeaderDetail from './HeaderDetail'
import Footer from '../home/Footer'
import { FaStar } from 'react-icons/fa'
import Booking from '../booking/Booking'
import Comment from '../comment/Comment'

export default function TourDetail() {
  const [tour, setTour] = useState({})
  const [priceAdult, setPriceAdult] = useState('')
  const [priceChildren, setPriceChildren] = useState('')
  const { id } = useParams()
  useEffect(() => {
    getTourById()
  }, [])

  const getTourById = async () => {
    if (id) {
      await apiGetTourById(id)
        .then((respone) => {
          console.log(respone.data)
          setTour(respone.data)
          setPriceAdult(respone.data.priceAdult)
          setPriceChildren(respone.data.priceChildren)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <div className="container-lg">
      <HeaderDetail title={tour.name} />

      <div className="bg-light p-4">
        <h3 className="px-4">{tour.name}</h3>
        <div className="d-flex px-4">
          <div>Đánh giá </div>
          <div className="px-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className={index + 1 <= tour.rate ? 'text-warning' : ''}
              />
            ))}
          </div>
        </div>
        <div className="px-4 fw-bold text-info">Giá: {tour.price} VND</div>

        {
          <Booking
            priceAdult={priceAdult}
            priceChildren={priceChildren}
            id={id}
            tour={tour}
          />
        }

        <div
          className="p-4"
          dangerouslySetInnerHTML={{ __html: tour.description }}
        />
      </div>
      {id && (
        <div className="bg-light p-4">
          <Comment id={id} />
        </div>
      )}

      <Footer />
    </div>
  )
}
