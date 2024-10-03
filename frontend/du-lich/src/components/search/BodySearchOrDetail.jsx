import { FaStar } from 'react-icons/fa'
import { IoBookSharp } from 'react-icons/io5'
import TourCard from '../home/TourCard'

export default function BodySearchOrDetail({ tours }) {
  return (
    <div className="silde-tour bg-light ">
      {tours.length > 0 &&
        tours.map((tour, index) => {
          return (
            <>
              <TourCard tour={tour} index={index} />
            </>
          )
        })}
    </div>
  )
}
