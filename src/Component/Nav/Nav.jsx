import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../images/freshcart-logo.svg'
import { CartContext } from '../../Context/CartContext'

export default function Nav({ userData, logout }) {

  let { cartCount } = useContext(CartContext)

  return (
    <div>
      <nav key={'navbar'} className="navbar navbar-expand-lg bg-body-tertiary fixed-top py-3">
        <div className="container">

          <Link className='nav-brand ' to={"home"}>
            <img className='object' src={logo} alt="logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className='m-auto'>
              {userData != null ?
                <ul className="navbar-nav mb-2 mb-lg-0 ">
                  <NavLink className={({ isActive }) => isActive ? "nav-link text-main" : 'nav-link '} to={'home'}>Home</NavLink>
                  <NavLink className={({ isActive }) => isActive ? "nav-link text-main" : 'nav-link '} to={'product'}>Products</NavLink>
                  <NavLink className={({ isActive }) => isActive ? "nav-link text-main" : 'nav-link '} to={'cart'}>Cart</NavLink>
                  <NavLink className={({ isActive }) => isActive ? "nav-link text-main" : 'nav-link '} to={'brands'}>Brands</NavLink>
                  <NavLink className={({ isActive }) => isActive ? "nav-link text-main" : 'nav-link '} to={'category'}>Categories</NavLink>
                  <NavLink className={({ isActive }) => isActive ? "nav-link text-main" : 'nav-link '} to={'wishList'}>Wish List</NavLink>
                </ul> : ""}
            </div>

            <ul className="navbar-nav mb-2 mb-lg-0">

              {userData == null ?
                <>
                  <NavLink className={({ isActive }) => isActive ? "nav-link text-main" : 'nav-link '} to={' '}>Register</NavLink>
                  <NavLink className={({ isActive }) => isActive ? "nav-link text-main" : 'nav-link '} to={'login'}>Login</NavLink>
                </>

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
