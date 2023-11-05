import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import { useState } from 'react'
import { useEffect } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'



export default function Cart() {
  let { getData, deleteData, updataProduct, setCartCount, clearCart, cartCount } = useContext(CartContext)
  let [list, setList] = useState(null)
  let [count, setCount] = useState('')




  useEffect(() => {
    if (cartCount != 0) {
      $('.loading').fadeIn(1500)
      cartData()
    }
    check()
  }, [])
  function check() {
    if (localStorage.getItem('haveCart') == 'no' || cartCount == 0) {
      // $('.loading').fadeIn(1500)
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
    setCartCount(data.numOfCartItems)
    setList(data.data)
    $('.loading').fadeOut(500)
  }

  // delete product
  async function DeleteProduct(id) {
    $('.loading').fadeIn(500)
    let { data } = await deleteData(id)
    setList(data.data)
    setCartCount(data.numOfCartItems)
    setCount(data.numOfCartItems)
    $('.loading').fadeOut(500)
  }
  // clear cart
  async function DeleteCart() {
    localStorage.setItem('haveCart', 'no')
    let { data } = await clearCart()
    $('#existcart').addClass('d-none')
    $('#emptycart').removeClass('d-none')
    setList(null)
    setCartCount(0)
    setCount(0)


  }

  // change quantity
  async function toAdd(id, count) {
    let { data } = await updataProduct(id, count)
    setList(data.data)
  }
  async function toRemove(id, count) {
    if (document.getElementById("productNum").innerHTML == 1) {
      DeleteProduct(id)
    }
    // let { data } = await updataProduct(id, count)
    // setList(data.data)
  }


  return <>
    <div className='loading position-fixed top-0 end-0 start-0 bottom-0 '>
      <i className='fa-solid fa-spinner fa-spin fa-5x text-main'></i>
    </div>
    <div id='existcart' className='mt-5  py-2'>
      <h1 className=' my-3'>My Cart</h1>
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
            <span onClick={() => toRemove(e.product._id, e.count - 1)} className='btn mx-3  text-white bg-danger'>-</span>


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
    <div id='emptycart' className='mt-5  p-2 d-none'>
      <h1 className=' my-3'>Your Cart is empty</h1>
    </div>
  </>
}


