import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function FeaturedProduct() {
    let { addToCart, setCartCount, addToWishList, getWishListData, deletePro } = useContext(CartContext)
    let [allProduct, setProduct] = useState([])
    let [someProduct, setSomeProduct] = useState([])
    let [y, setY] = useState([])
    let search = []
    let x = []
    localStorage.ClassName = "text-danger";

    // to show products
    useEffect(() => {
        getProductes()
        $('.pages').on('click', (e) => {
            let page = $(e.target).html()
            getProductes(page)
        })
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
    // for pages
    async function getProductes(page = 1) {
        $('.loading').fadeIn(1000)
        let url = "https://ecommerce.routemisr.com"
        let { data } = await axios.get(`${url}/api/v1/products?page=${page}`)
        setProduct(data.data)
        setSomeProduct(data.data)
        $('.loading').fadeOut(500)
            AOS.init()
    }

    // add to cart
    async function add(id) {
        let { data } = await addToCart(id)
        localStorage.setItem('haveCart', 'yes')
        if (data.status == 'success') {
            setCartCount(data.numOfCartItems)
            toast.success(data.message)
        }
    }

    //WishList
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

    // searching
    function searching() {
        let value = $('#productName').val().toLowerCase()
        if (value != '') {
            someProduct.forEach(element => {
                let result = element.title.toLowerCase().includes(value)
                if (result == true) {
                    search.push(element)
                }
                setProduct(search)
            })

        }

    }


    return (
        <>
            <Toaster />
            <div className='loading position-fixed top-0 end-0 start-0 bottom-0 '>
                <i className='fa-solid fa-spinner fa-spin fa-5x text-main'></i>
            </div>

            <input type="text" onKeyUp={searching} id='productName' placeholder='search....' className='form-control w-75 m-auto my-5' />
            <div>
                <div>
                    <div key={'ProductSection'} className="row my-3 gy-3">

                        {allProduct.map((e) => <div key={e._id} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 ">
                            <div className="product p-2 cursor-pointer overflow-hidden ">
                                <Link to={'../productDetails/' + e._id}>

                                    <img src={e.imageCover} className='w-100 mb-2' alt={e.title} />
                                    <span className='text-main font-sm fw-ligther'>{e.category.slug}</span>

                                    <h6 className='m-0 p-0'>{e.title.split(" ").slice(0, 2).join(" ")}</h6>

                                    <div className=' w-100 mt-3  d-flex justify-content-between'>
                                        <span className='font-sm'> {e.price} EGP</span>
                                        <span className='font-sm'>
                                            {e.ratingsAverage}
                                            <i className='fa-solid ms-1 fa-star rating-color'></i>

                                        </span>
                                    </div>
                                </Link>
                                <div className='d-flex  justify-content-between  align-items-center mt-2 '>
                                    <button onClick={() => add(e._id)} className='btn text-white bg-main w-75  btn-sm'>Add to cart</button>
                                    <i id={e._id} onClick={() => checkWishList(e._id)} className='fa-solid ms-1 fa-heart fa-xl cursor-pointer'></i>

                                </div>
                            </div>
                        </div>
                        )}

                    </div>
                </div>
            </div>

            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a className="page-link text-main" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link text-main pages cursor-pointer" >1</a></li>
                    <li className="page-item"><a className="page-link text-main pages cursor-pointer" >2</a></li>
                    <li className="page-item">
                        <a className="page-link text-main" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}
