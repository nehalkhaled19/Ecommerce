import React from 'react'
import Nav from '../Nav/Nav'

export default function AllOrders() {
  return <>

    <div className='container mt-5 py-2'>
        <div className='row align-items-center'>
            <div className='col-6'>
            <h3>Order Id:</h3>
        <span className='text-muted'>Order date: 2023-09-19</span>
            </div>
            
        </div>
        
        <div>
            <div className="row m-0 bg-light py-2 border-bottom align-items-center ">
          <div className="col-md-6">
            <div className="row py-2 align-items-center">
              <div className="col-lg-2 col-md-3 ">
                <img src='' className='w-100 my-2' alt="product-image" />
              </div>
              <div className="col-lg-9 col-md-8">
                <h6>Title</h6>
                <p className='text-main'>catergory</p>

              </div>
            </div>
          </div>

          <div className="col-md-6 ms-auto bg-info text-end">
          
            <h4>Total Price: 3000</h4>
        
          </div>

        </div>
        </div>
    </div>
    
    </>
}
