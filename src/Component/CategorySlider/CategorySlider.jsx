import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/owl.carousel.js'
import { useDispatch, useSelector } from 'react-redux';
import { categoryData } from '../../Redux/CategorySlice';


export default function CategorySlider() {

    let { list } = useSelector((e) => e.category)
    let dispat = useDispatch()
    useEffect(() => {
        dispat(categoryData())
    }, [])
    return <div key={'CategorySliderSection'}>
        <OwlCarousel className=' owl-carousel owl-reponsive-breakpoint owl-theme my-5 ' responsive={{ 0: { items: 1 } , 480: { items: 2 }, 767: { items: 4 } , 990: { items: 6 }}}  loop dots={true} >
            {list?.map((e) => {
                return <div class='item'>
                    <img className='small-img' src={e.image} alt="img1" />
                    <h5 className='mt-2'>{e.name}</h5>
                </div>
            })}
        </OwlCarousel>
    </div >
}
