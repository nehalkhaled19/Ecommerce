import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import Footer from '../Footer/Footer';


export default function AllOrders({ userData }) {
  let idForUser = userData?.id
  function getAllOrders(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }

  let { isLoading, data } = useQuery('AllOrders', () => getAllOrders(idForUser))
  
  return <>
    {isLoading ? <div className='loading position-fixed top-0 end-0 start-0 bottom-0 '>
      <i className='fa-solid fa-spinner fa-spin fa-5x text-main'></i>
    </div> : <div>
      <div className='container mt-5 py-2'>
        <h2 className='text-center my-3'>Your <span className='text-main'>O</span>rders Summry</h2>
        {data?.data.map((e) => {
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
                        <h6> {e.product.title}</h6>
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
      </div>
      <Footer></Footer>
    </div>}




  </>
}
