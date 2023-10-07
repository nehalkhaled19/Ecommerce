import React from 'react'
import img1 from '../../images/images/slider-image-1.jpeg'
import img2 from '../../images/images/slider-image-2.jpeg'
import img3 from '../../images/images/slider-image-3.jpeg'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function MainSlider() {
    return (
        <div>
            <div key={'mainSliderSection'} className="row g-0">
                <div className="col-md-9">
                    <OwlCarousel className='owl-theme' items={1} autoplay autoplayTimeout={1000} loop dots={false} >
                    <div class='item'>
                        <img className='w-100 main-img' src={img1} alt="img1" />
                        </div>
                        <div class='item'>
                        <img className='w-100 main-img' src={img2} alt="img2" />
                        </div>
                        <div class='item'>
                        <img className='w-100 main-img' src={img3} alt="img3" />
                        </div>
                        
                    </OwlCarousel>

                </div>
                <div className="col-md-3">
                    <img className='w-100 small-img' src={img2} alt="img2" />
                    <img className='w-100 small-img' src={img3} alt="img3" />
                </div>
            </div>
        </div>
    )
}
