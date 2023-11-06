import React from 'react'
import  img1 from'../../imgs/pay-removebg-preview.png'
import  img2 from'../../imgs/app-removebg-preview (1).png'

export default function Footer() {
  return (
    <footer className='bg-body-tertiary p-5'>
        
        <h3>Get the FreshCart app</h3>
        <p className='text-muted'>We will send you a link, open it on your phone to download the app</p>
        <div className='mb-3 d-flex justify-content-between'>
        <input placeholder='Email..' className='form-control w-75' type="text" />
        <button className='btn text-center rounded-2 text-white px-2 bg-main ms-auto main-btn'>Share App Link</button>
        </div>
      
        <div className='row footer-row'>
            <div className='col-sm-6'>
            <p className='text-muted d-inline'>Payment Partners</p>
            <img src={img1} className='w-25 cursor-pointer mx-2' alt="pay" />
            </div>
            <div className='col-sm-6 d-flex justify-content-end'>
            <p className='text-muted m-0'>Get deliveries with FreshCart</p>
            <img src={img2} className='w-25 cursor-pointer mx-2 ' alt="stors" />
            </div>
        </div>
        <div className="conatiner text-center">
                    <p className='m-auto p-2 forget' >© 2023 - Ecommerce software by PrestaShop™</p>
                    <div className='d-flex my-1 justify-content-center '>
                        <div className='icon-holder icon-facebook mx-1 d-flex justify-content-center align-items-center '>
                            <i className='fa-brands fa-sm fa-facebook-f '></i>
                        </div>
                        <div className='icon-holder icon-google mx-1 d-flex justify-content-center align-items-center '>
                            <i className='fa-brands fa-sm fa-google '></i>
                        </div>  <div className='icon-holder icon-tumblr mx-1 d-flex justify-content-center align-items-center '>
                            <i className='fa-brands fa-sm fa-tumblr '></i>
                        </div>  <div className='icon-holder icon-twitter mx-1 d-flex justify-content-center align-items-center '>
                            <i className='fa-brands fa-sm fa-twitter '></i>
                        </div>

                    </div>
                </div>
    </footer>
  )
}
