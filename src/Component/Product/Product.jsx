import React, { useContext } from 'react'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'
import Footer from '../Footer/Footer'
import { Helmet } from 'react-helmet'

export default function Product() {

  
  return <>
  <Helmet>
  <title>Products</title>
  <meta name="description" content="shopify products" />
</Helmet>
    <div className='container mt-5'>
      <FeaturedProduct></FeaturedProduct>
      
    </div>
    <Footer></Footer>
  </>
}
