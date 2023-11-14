import axios from 'axios'
import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import Footer from '../Footer/Footer'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet'

export default function Brand() {

    let [brandDetails, setBrand] = useState(null)



    // all brands
    function brandsData() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }
    let { isLoading, data, isFetching, isFetched } = useQuery('brands', brandsData, {
        refetchOnMount: false,
        staleTime:60000
    })

    //specific brand
    async function brand(id) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
        setBrand(data.data)
        $('#exampleModal1').fadeIn(500);
    }
    // close model
    function close() {
        $('#exampleModal1').fadeOut(1000);
    }


    return <>
      <Helmet>
            <title>Brands</title>
            <meta name="description" content="Shopify brands" />
        </Helmet>
        {isLoading ? <div className='loading position-fixed top-0 end-0 start-0 bottom-0 '>
            <i className='fa-solid fa-spinner fa-spin fa-5x text-main'></i>
        </div> : <div className='container my-5'>
            <h1 className='text-main text-center my-4' id='sub'>All Brands</h1>
            <div className="row gy-3">
                {data?.data.data?.map((el) => {
                    return <div key={el._id} className="col-lg-3 col-md-4 cursor-pointer " onClick={() => brand(el._id)}  >
                        <div className='border border-1 rounded-2 cardshadow'>
                            <img src={el.image} className='w-100' alt="brand" />
                            <p className='text-center  m-3'>{el.name}</p>
                        </div>
                    </div>
                })}
            </div>

        </div>
        }
        {brandDetails != null ? <div key={'model'} className="modal bg " id="exampleModal1" >
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
        <Footer></Footer>
    </>

}
