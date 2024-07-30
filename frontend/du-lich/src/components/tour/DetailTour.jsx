import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetTourById } from '../service/TourService'
import HeaderManager from '../../common/HeaderManager'

const DetailTour = () => {
    const [detailTour, setDeTailTour] = useState({})
    const [errorMess, setErrorMess] = useState("")
    const { id } = useParams()
    console.log(id)
    useEffect(() => {
        if (id) {
            getDetailTour(id)
        }
    }, [id])
    async function getDetailTour(id) {
        await apiGetTourById(id).then(
            response => {
                setErrorMess("")
                console.log(response)
                setDeTailTour(response.data)
            }
        ).catch(err => {
            console.log(err)
            setErrorMess(err.response.data)
        }
        )
    }
    return (
        <div>
            <HeaderManager />
            <div className='container-lg'>
                <h1>{detailTour.name}</h1>
                <div className='container-lg ' dangerouslySetInnerHTML={{ __html: detailTour.description }} />
                {errorMess && <div className='alert alert-success mt-2'>nhap ma chuyen du lich khac, ma hien tai ko ton tai</div>}
            </div>


        </div>
    )
}

export default DetailTour
