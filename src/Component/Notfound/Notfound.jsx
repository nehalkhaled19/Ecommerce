import React from 'react'
import error from '../../images/error.svg'
import { Helmet } from 'react-helmet'


export default function Notfound() {
  return <>

<Helmet>
            <title>Not Found</title>
            <meta name="description" content="user's orders " />
        </Helmet>
     <div  className='container py-5 mt-5 d-flex justify-content-center'>
      <img src={error} className='w-100' alt="NotFound" />
    </div>
    
    </> 
}
