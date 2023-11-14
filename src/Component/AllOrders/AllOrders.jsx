import axios from 'axios';
import React, { useEffect, useState } from 'react'

import Footer from '../Footer/Footer';
import $ from 'jquery'
import cart from '../../imgs/cart1.png'
import { Helmet } from 'react-helmet'



export default function AllOrders({ userId }) {
  let idForUser = userId
 
  let [orders, setOrders] = useState([])
  
  useEffect(() => {
    $('.loading').fadeIn(1000)
    getAllOrders(idForUser)
  }, [])
  // get data
  async function getAllOrders(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    setOrders(data)
   
    if (data.length == 0){
      $('#haveOrders').addClass('d-none')
      $('#noOrders').removeClass('d-none')
    }
    if (data.length != 0){
    $('#haveOrders').removeClass('d-none')
    $('#noOrders').addClass('d-none')
    }
  $('.loading').fadeOut(500)

}


return <> 
  <Helmet>
            <title>All orders</title>
            <meta name="description" content="user's orders " />
        </Helmet>
  <div className='loading position-fixed top-0 end-0 start-0 bottom-0 '>
      <i className='fa-solid fa-spinner fa-spin fa-5x text-main'></i>
    </div>
    <div className='container mt-5 py-2'>
      <div id='haveOrders'>
        <h2 className='text-center my-3'>Your <span className='text-main'>O</span>rders Summry</h2>
        {orders?.map((e) => {
          return <div key={e._id} className='mb-5 mt-4 border-end border-start'>
            <div className='row mx-0 align-items-center bg-light py-4'>

              <div className='col-sm-6 py-2'>
                <h3 >Order ID: {e.id}</h3>
                <span className='text-muted'>Order date : {e.paidAt.split('T').slice(0, 1).join('')}</span>
              </div>

              <div className="col-sm-6 py-2   text-sm-end text-start">

                <h5 className='centerd  text-muted'>Total Price </h5>
                <h5 className='centerd  text-muted'> {e.totalOrderPrice} EGP</h5>

              </div>

            </div>
            {e.cartItems.map((e) => {
              return <div key={e._id} >
                <div className="row m-0  py-2 border-bottom border-end border-start align-items-center ">
                  <div className="col-sm-6">
                    <div className="row py-2 align-items-center">
                      <div className="col-lg-2 col-md-3 ">
                        <img src={e.product.imageCover} className='w-100 my-2' alt="product-image" />
                      </div>
                      <div className="col-lg-9 col-md-8">
                        <h6> {e.product.title.split(" ").slice(0, 2).join(" ")}</h6>
                        <p className='text-main'>{e.product.category.slug} | {e.product.brand.name} </p>

                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 ms-auto text-sm-end text-start">

                    <h5> {e.price} EGP</h5>

                  </div>
                </div>
              </div>
            })}
          </div>
        })}
      </div >
      <div id='noOrders' className='container mt-5 py-2 text-center d-none'>  <img src={cart} className='m-auto  object' alt="empty cart" />
        <p className='my-3 text-main' style={{ fontSize: '30px' }}>No Orders Delivered Yet</p>
      </div>

    </div>









  <Footer></Footer>


</>
}
