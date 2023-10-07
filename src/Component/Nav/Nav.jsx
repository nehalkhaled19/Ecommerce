import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import x from '../../images/freshcart-logo.svg'
import { CartContext } from '../../Context/CartContext'

export default function Nav({ userData, logout }) {

  let {cartCount} = useContext(CartContext)

  return (
    <div>
      <nav key={'navbar'} className="navbar navbar-expand-lg bg-body-tertiary fixed-top py-3">
        <div className="container">
          
        <Link className='nav-brand  ' to={"home"}>
            <img src={x} alt="logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className=''>
            {userData != null ?
              <ul className="navbar-nav mb-2 mb-lg-0">
                <Link className='nav-link' to={"home"}>Home</Link>

                <Link className='nav-link' to={"product"}>Products</Link>
                <Link className='nav-link' to={"Cart"}>Cart</Link>
                <Link className='nav-link' to={"Brands"}>Brands</Link>
                <Link className='nav-link' to={"Category"}>Categories</Link>
                <Link className='nav-link' to={"WishList"}>Wish list</Link>



              </ul> : ""}
              </div>
              
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      
              {userData == null ?
                <> <Link className='nav-link' to={""}>Register</Link>
                  <Link className='nav-link' to={"login"}>Login</Link>  </>

                : <>
                  <Link className='nav-link ' to={"cart"}>
                    <div className='position-relative mx-3'>
                    <i class="fa-solid fa-cart-shopping text-main fa-lg"></i>

                    <span class="bg-main number  badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                    
                    </div>
                  </Link>
                  <span onClick={logout} className='nav-link cursor-pointer'>SignOut</span>  </>}




            </ul>
           
          </div>
        </div>
      </nav>
    </div>
  )
}
