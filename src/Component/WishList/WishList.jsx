import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import { useState } from 'react'
import { useEffect } from 'react'
import $ from 'jquery'
import toast, { Toaster } from 'react-hot-toast';
import img from '../../imgs/cart1.png'
import Footer from '../Footer/Footer'
import { Helmet } from 'react-helmet'

export default function WishList() {
    let { getWishListData, addToCart, deletePro, setNum} = useContext(CartContext)
    let [list, setList] = useState(null)

    // get data
    async function Data() {
        let { data } = await getWishListData()
        setList(data.data)
        if (data.count == 0) {
            $('#full').addClass('d-none')
            $('#empty').removeClass('d-none')
        }
        $('.loading').fadeOut(500)

    }
    // add to cart
    async function add(id) {
        let { data } = await addToCart(id)
        if (data.status == 'success') {
            localStorage.setItem('cartNum', data.numOfCartItems)
            setNum(data.numOfCartItems)
            toast.success(data.message)
        }
    }
    // delete 
    async function remove(id) {
        $('.loading').fadeIn(1000)
        let { data } = await deletePro(id)
        Data()


    }

    useEffect(() => {
        $('.loading').fadeIn(1000)
        Data()
    }, [])
    return <>
        <Toaster />
        <Helmet>
            <title>Wish List</title>
            <meta name="description" content="Wish List" />
        </Helmet>
        <div className='loading position-fixed top-0 end-0 start-0 bottom-0 '>
            <i className='fa-solid fa-spinner fa-spin fa-5x text-main'></i>
        </div>
        <div className='container mt-5 pb-5'>
            <div id='full' className='mt-5 py-1 px-3'>
                <h1 className='my-3 text-center '>My <span className='text-main'>W</span>ish List</h1>

                {list?.map((e) => {
                    return <div key={e._id} className="row bg-light py-2  border-bottom align-items-center ">
                        <div className="col-md-6">
                            <div className="row py-2 align-items-center">
                                <div className="col-md-2  ">
                                    <img src={e.imageCover} className='w-100 my-2' alt="product-image" />
                                </div>
                                <div className="col-md-9">
                                    <h6>{e.title}</h6>
                                    <p className='text-main'>{e.price} EGP</p>

                                    <div className='cursor-pointer' onClick={() => remove(e._id)} > <i className='fa-solid fa-trash text-danger fa-sm me-2 '> </i><span>Remove</span></div>


                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 ms-auto text-end">
                            <span className='btn btn-wish mx-lg-3 my-2 text-white bg-main' onClick={() => add(e._id)}> Add to cart</span>




                        </div>
                    </div>


                })}</div>
            <div id='empty' className='mt-5 py-1 px-3 d-none text-center'>
                <img src={img} className='object ' alt="empty wishlist" />
                <p className='my-3 text-main' style={{ fontSize: '30px' }}>Your Wish List is Empty</p>


            </div>
        </div>
        <Footer></Footer>

    </>
}
