import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import { useState } from 'react'
import { useEffect } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import cart from '../../imgs/cart1.png'
import Footer from '../Footer/Footer'
import { Helmet } from 'react-helmet'


export default function Cart() {
  let { getData, deleteData, updataProduct, clearCart, setNum } = useContext(CartContext)
  let [list, setList] = useState(null)
  let [count, setCount] = useState('')


  useEffect(() => {
    if (localStorage.getItem('cartNum') != 0) {
      $('.loading').fadeIn(1500)
      cartData()
    }
    else {
      check()

    }
  }, [])
  function check() {
    if (localStorage.getItem('cartNum') == 0) {
      $('#existcart').addClass('d-none')
      $('#emptycart').removeClass('d-none')
      $('.loading').fadeOut(500)
    }

  }
  check()



  // get data
  async function cartData() {
    $('.loading').fadeIn(1500)
    let { data } = await getData()
    setCount(data.numOfCartItems)
    localStorage.setItem('cartNum', data.numOfCartItems)
    setNum(data.numOfCartItems)


    setList(data.data)
    $('.loading').fadeOut(500)
  }

  // delete product
  async function DeleteProduct(id) {
    $('.loading').fadeIn(500)
    let { data } = await deleteData(id)
    setList(data.data)
    setCount(data.numOfCartItems)
    localStorage.setItem('cartNum', data.numOfCartItems)
    setNum(data.numOfCartItems)


    $('.loading').fadeOut(500)
  }
  // clear cart
  async function DeleteCart() {
    $('.loading').fadeIn(500)
    let { data } = await clearCart()
    $('#existcart').addClass('d-none')
    $('#emptycart').removeClass('d-none')
    setList(null)
    localStorage.setItem('cartNum', 0)
    setNum(0)
    setCount(0)


  }

  // change quantity
  async function toAdd(id, count) {
    let { data } = await updataProduct(id, count)
    setList(data.data)
  }
  function toRemove(id, count2, count) {
    count == 1 ? DeleteProduct(id) : toAdd(id, count2)
  }


  return <>
    <Helmet>
            <title>Cart</title>
            <meta name="description" content="user's cart" />
        </Helmet>
    <div className='loading position-fixed top-0 end-0 start-0 bottom-0 '>
      <i className='fa-solid fa-spinner fa-spin fa-5x text-main'></i>
    </div>
    <div id='existcart' className='py-2 pb-5 container mt-5'>
      <h1 className=' my-3 text-center'>My <span className='text-main'>C</span>art</h1>
      {list?.products.map((e) => {
        return <div key={e._id} className="row m-0 bg-light py-2 border-bottom align-items-center ">
          <div className="col-md-6">
            <div className="row py-2 align-items-center">
              <div className="col-lg-2 col-md-3 ">
                <img src={e.product.imageCover} className='w-100 my-2' alt="product-image" />
              </div>
              <div className="col-lg-9 col-md-8">
                <h6>{e.product.title}</h6>
                <p className='text-main'>{e.price} EGP</p>

                <div className='cursor-pointer' onClick={() => DeleteProduct(e.product._id)}> <i className='fa-solid fa-trash text-danger fa-sm me-2 '> </i><span>Remove</span></div>

              </div>
            </div>
          </div>

          <div className="col-md-6 ms-auto text-end">
            <span onClick={() => toAdd(e.product._id, e.count + 1)} className='btn mx-3  text-white bg-main'> + </span>
            <span id='productNum'>{e.count}</span>
            <span onClick={() => toRemove(e.product._id, e.count - 1, e.count)} className='btn mx-3  text-white bg-danger'>-</span>


          </div>

        </div>


      })}
      <div className='bg-light p-2 py-4' >
        <h5>Total Price:
          <span className='text-main'> {list?.totalCartPrice}</span>
        </h5>
        <h6>Total number of item:
          <span className='text-main'> {count}</span>
        </h6>
        <div className='row'>
          <div className="col-md-6 justify-space-between">
            <Link to={'../checkOut/' + list?._id}> <button className='btn text-white bg-main mt-2 w-100 py-1'>CheckOut</button></Link>

          </div>
          <div className="col-md-6">
            <button onClick={() => DeleteCart()} className='btn text-white btn-danger mt-2 w-100 py-1'>Clear Cart</button>

          </div>

        </div>

      </div>
    </div>
    <div id='emptycart' className='mt-5 pb-5 container text-center d-none'>
      <img src={cart} className='m-auto  object' alt="empty cart" />
      <p className='my-3 text-main' style={{ fontSize: '30px' }}>Your Cart is Empty</p>
    </div>
    <Footer></Footer>
  </>
}


