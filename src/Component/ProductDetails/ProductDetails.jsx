import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import $ from 'jquery'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { CartContext } from '../../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { Helmet } from 'react-helmet'
export default function ProductDetails() {
    let { addToCart, addToWishList, deletePro, getWishListData, setNum } = useContext(CartContext)
    let [product, setProduct] = useState(null)
    let { id } = useParams()
    let x = []
    let [y, setY] = useState([])


    useEffect(() => {
        show(id)
        getWishData()
    }, [])
    async function getWishData() {
        let { data } = await getWishListData()
        data.data.forEach(e => {
            $(`#${e._id}`).addClass(localStorage.ClassName);
            x.push(e._id)
        })
        setY(x)
        x = []
    }
    function checkWishList(id) {
        if (y.indexOf(id) == -1) {
            addWish(id)
        }
        else {
            remove(id)
        }
        // add To WishList
        async function addWish(id) {
            let { data } = await addToWishList(id)
            toast.success(data.message)
            $(`#${id}`).addClass('text-danger')
            getWishData()
        }

        // remove from wishlist
        async function remove(id) {
            let { data } = await deletePro(id)
            $(`#${id}`).removeClass('text-danger')
            getWishData()
        }
    }


    // to get id
    async function show(id) {
        $('.loading').fadeIn(1000)
        let url = "https://ecommerce.routemisr.com"
        let { data } = await axios.get(`${url}/api/v1/products/${id}`)
        setProduct(data.data)
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

    return <>
        <Toaster />

        <div className='loading position-fixed top-0 end-0 start-0 bottom-0 '>
            <i className='fa-solid fa-spinner fa-spin fa-5x text-main'></i>
        </div>
        <div className="container">
            {product != null ? <div className="row align-items-center my-5  mt-5">
                <div className="col-md-3 my-3">
                    <Helmet>
                        <title>{product.title}</title>
                        <meta name="description" content={product.description} />
                    </Helmet>
                    <OwlCarousel className='owl-theme' items={1} loop  >
                        {product.images.map((e) => {
                            return <div key={product.title} className='item'>
                                <img src={e} className='w-100' alt={product.category.name} />
                            </div>
                        })}
                    </OwlCarousel>
                </div>
                <div className="col-md-9 mb-4">
                    <div>
                        <h3>{product.title}</h3>

                        <p className='text-muted'>{product.description}</p>

                        <span className='text-main font-sm fw-ligther'>{product.category.slug}</span>

                        <div className=' w-100 mt-3  d-flex justify-content-between'>
                            <span className='font-sm'> {product.price} EGP</span>
                            <span className='font-sm'>
                                {product.ratingsAverage}
                                <i className='fa-solid ms-1 fa-star rating-color'></i>
                            </span>
                        </div>
                        <div className='d-flex  justify-content-between  align-items-center mt-2 '>
                            <button onClick={() => add(product._id)} className='btn text-white bg-main w-75  btn-sm'>Add to cart</button>
                            <i id={product._id} onClick={() => checkWishList(product._id)} className='fa-solid ms-1 fa-heart fa-xl cursor-pointer'></i>

                        </div>

                    </div>
                </div>
            </div> : ""}
        </div>
    </>



}
