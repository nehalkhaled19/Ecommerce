import React from 'react'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'
import MainSlider from '../MainSlider/MainSlider'
import Footer from '../Footer/Footer'


export default function Home() {
  return (
    <div>
      <MainSlider></MainSlider>
      <FeaturedProduct />
      <Footer></Footer>
    </div>
  )
}
