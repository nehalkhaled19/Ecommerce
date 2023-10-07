import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { categoryData } from '../../Redux/CategorySlice';
import axios from 'axios';
import $ from 'jquery'


export default function Category() {

  let [subCategiry, setSubCategiry] = useState(null)

  let { list } = useSelector((e) => e.category)
  let dispat = useDispatch()
  useEffect(() => {
    $('.loading').fadeIn(1500)
    dispat(categoryData())
    $('.loading').fadeOut(500)

  }, [])


  async function subcategories(id, categoryName) {
    $('.loading').fadeIn(1000)
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    document.getElementById('sub').innerHTML = categoryName + ' subcategories'
    $('#subcategoty').removeClass('d-none')
    setSubCategiry(data.data)
    $('.loading').fadeOut(500)

  }

  return <>
    <div className='loading position-fixed top-0 end-0 start-0 bottom-0 '>
      <i className='fa-solid fa-spinner fa-spin fa-5x text-main'></i>
    </div>

    <div className="container">
      <div className="row gy-3">
        {list.map((el) => {
          return <div key={'categorySection'} className="col-lg-4 col-md-6 cursor-pointer " onClick={() => subcategories(el._id, el.name)}>
            <div className='border border-1 rounded-2 card cardshadow'>
              <img className='w-100 small-img' src={el.image} alt="category" />
              <p className='text-center text-main m-3'>{el.name}</p>
            </div>
          </div>
        })}

      </div>
    </div>
    <div className='container my-5 d-none' id='subcategoty' >
      <h2 className='text-main text-center m-3' id='sub'></h2>
      <div className="row gy-3">
        {subCategiry?.map((el) => {
          return <div className="col-md-4 cursor-pointer ">
            <div className='border border-1 rounded-2 card'>
              <p className='text-center  m-3'>{el.name}</p>
            </div>
          </div>
        })}
      </div>

    </div>
  </>
}
