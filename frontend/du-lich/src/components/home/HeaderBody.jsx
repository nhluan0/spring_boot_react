import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HeaderBody() {
    const [addressOrPrice, setAddressOrPrice] = useState("")
    const [date, setDate] = useState("")
    const navigator = useNavigate()

    const handleSearchByAddressOrPrice = () => {
        if (addressOrPrice) {
            navigator(`/home/search/${addressOrPrice}`)
        }
    }
    const handleSearchByDate = () => {
        if (date) {
            navigator(`/home/search/start/${date}`)
        }
    }
    return (
        <div className='content-head '>
            <h1 className='text-white'>Explore Your wonderful trip</h1>
            <h5 className='text-white'>Find great places to eat,stay,shop or visit from local experts</h5>
            <div className='d-flex '>
                <input
                    className='form-control'
                    placeholder='Ex name, price ...'
                    type='text'
                    value={addressOrPrice}
                    onChange={(e) => setAddressOrPrice(e.target.value)}
                ></input>
                <button className='btn btn-danger' onClick={handleSearchByAddressOrPrice}>Search</button>
            </div>
            <div className='d-flex mt-2'>
                <input
                    type='date'
                    className='form-control'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                ></input>
                <button className='btn btn-danger ' onClick={handleSearchByDate}>Search</button>
            </div>
        </div>
    )
}
