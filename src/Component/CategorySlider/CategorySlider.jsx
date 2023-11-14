import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/owl.carousel.js'
import { useQuery } from 'react-query';
import axios from 'axios';

// import { useDispatch, useSelector } from 'react-redux';
// import { categoryData } from '../../Redux/CategorySlice';


export default function CategorySlider() {

    // let { list } = useSelector((e) => e.category)
    // let dispat = useDispatch()
    // useEffect(() => {
    //     dispat(categoryData())
    // }, [])
    function categoryData() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      }
    
      let { data, isLoading } = useQuery('category',categoryData,{
        refetchOnMount: false,
        staleTime:80000
      })
   
       
    return <div >
          {isLoading ? <div className='loading position-fixed top-0 end-0 start-0 bottom-0  '>
                <i className='fa-solid fa-spinner fa-spin fa-5x text-main'></i>
            </div> :<OwlCarousel className=' owl-carousel owl-reponsive-breakpoint owl-theme my-5 ' autoplay={true}
        autoplayTimeout={2500} responsive={{ 0: { items: 1 } , 480: { items: 2 }, 767: { items: 3 } , 990: { items: 5 }, 1200: { items: 6 }}}  loop dots={true} >
            {data?.data.data.map((e) => {
                return <div className='category item mx-2 img-category' key={e.name} id='catergorySlider'>
                    <img className='small-img rounded-1 ' src={e.image} alt="img1" />
                    <h5 className='mt-2 text-center'>{e.name}</h5>
                </div>
            })}
        </OwlCarousel>
}
    </div >
}
