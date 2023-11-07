import React, { useEffect } from 'react'
import img1 from '../../imgs/sample-1 (1).jpg'
import img2 from '../../imgs/sample-2 (1).jpg'
import img3 from '../../imgs/sub-banner-1 (1).jpg'
import img4 from '../../imgs/sub-banner-2 (1).jpg'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import CategorySlider from '../CategorySlider/CategorySlider'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import $ from 'jquery'



export default function MainSlider() {
   

    return (
        <div >
            <div className="row gx-0 ">
                <div className="col-md-9  my-2 pe-md-4 ">

                    <div className=' rounded-3 position-relative overflow-hidden imgSlider' >
                        <img className='rounded-3 w-100 ' src={img1} style={{ transition: ' all 0.6s ease 0s' }} alt="slider-1" />
                        <div className='slider-layer'>
                            <p data-aos="fade-left" data-aos-duration='500' data-aos-delay="0">
                                Big Saving Days Sale</p>
                            <h3 data-aos="fade-left" data-aos-duration='500' data-aos-delay="400">Women Solid Round
                                Green T-Shirt
                            </h3>
                            <p data-aos="fade-left" data-aos-duration='500' data-aos-delay="800">Starting At Only <span> $59.00</span></p>
                            <Link to={'../home'}>
                                <button className='btn btn-shop bg-main main-btn'> SHOP NOW</button>
                            </Link>
                        </div>
                    </div>



                </div>
        
                <div className="col-md-3 my-2 slider d-flex flex-md-column">
                    <div  className='imgSlider object-fit-cover pb-0 ' >
                    <div className='position-relative overflow-hidden'  >
                        <img className='w-100 rounded-2  ' style={{ transition: ' all 0.6s ease 0s' }} src={img3} alt="camira" />
                        <div className='slider-layer slider2-layer'>
                            <h6 className='layer-h3'>Samsung Gear
                                VR Camera
                            </h6>
                            <span className='layer-span' > $129.00</span>

                        </div>
                    </div>

                    </div>
                    <div  className='imgSlider object-fit-cover align-self-end m-auto mb-0'>
                    <div  className='position-relative overflow-hidden mt-md-2 w-100'>
                        <img  className='w-100 rounded-2 ' style={{ transition: ' all 0.6s ease 0s' }} src={img4} alt="chair" />
                        <div className='slider-layer'>

                            <h6 className='layer-h3'> Dining
                                Room Chair
                            </h6>
                            <span className='layer-span' > $129.00</span>

                        </div>
                    </div>

                    </div>
                </div>
            </div>
            <CategorySlider></CategorySlider>
        </div>
    )
}
