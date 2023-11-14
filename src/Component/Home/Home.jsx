import React, { useEffect } from 'react'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'
import MainSlider from '../MainSlider/MainSlider'
import Footer from '../Footer/Footer'
import { Helmet } from 'react-helmet'
export default function Home() {

  return <>
   <Helmet>
            <title>Shopify home</title>
            <meta name="description" content="Shopify home" />
        </Helmet>
    <div className='container mt-5'>
      <MainSlider></MainSlider>
      <FeaturedProduct />
    </div>
    <Footer></Footer>
  </>

}
