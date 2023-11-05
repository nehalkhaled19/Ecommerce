import React from 'react'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'

export default function Home() {
  return (
    <div>
      <MainSlider></MainSlider>
  
      <FeaturedProduct />
    </div>
  )
}
