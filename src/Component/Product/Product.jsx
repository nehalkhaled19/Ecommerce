import React, { useContext } from 'react'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'
import Footer from '../Footer/Footer'

export default function Product() {


  return <>
    <div className='container mt-5'>
      <FeaturedProduct></FeaturedProduct>
      
    </div>
    <Footer></Footer>
  </>
}
