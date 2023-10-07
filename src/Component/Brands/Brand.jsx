import axios from 'axios'
import React, { useEffect, useState } from 'react'
import $ from 'jquery'

export default function Brand() {

    let [brands, setBrands] = useState(null)
    let [brandDetails, setBrand] = useState(null)


    useEffect(() => {
        close()
        brandsData()
    }, [])
    function close() {
   $('#exampleModal1').hide();
    }
    // all brands
    async function brandsData() {
        $('.loading').fadeIn(1000)
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        setBrands(data.data)
        $('.loading').fadeOut(500)
    }
    //specific brand
    async function brand(id) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
        setBrand(data.data)
        $('#exampleModal1').show();

    }

    return <>
        <div className='loading position-fixed top-0 end-0 start-0 bottom-0 '>
            <i className='fa-solid fa-spinner fa-spin fa-5x text-main'></i>
        </div>
        <div className='container my-5' key={'brandSection'} >
            <h1 className='text-main text-center my-4' id='sub'>All Brands</h1>
            <div className="row gy-3">
                {brands?.map((el) => {
                    return <div className="col-lg-3 col-md-4 cursor-pointer " onClick={() => brand(el._id)}  >
                        <div className='border border-1 rounded-2 cardshadow'>
                            <img src={el.image} className='w-100' alt="brand" />
                            <p className='text-center  m-3'>{el.name}</p>
                        </div>
                    </div>
                })}
            </div>

        </div>
        {brandDetails != null ? <div key={'model'} class="modal bg " id="exampleModal1" >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" onClick={close}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6 d-flex flex-column justify-content-center ">
                                <h1 className='text-main'>{brandDetails.name}</h1>
                                <p>{brandDetails.slug}</p>
                            </div>
                            <div className="col-md-6 ">

                                <img src={brandDetails.image} className='w-100' alt="" />

                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={close} id="modal">Close</button>
                    </div>
                </div>
            </div>
        </div> : ""}

    </>

}
