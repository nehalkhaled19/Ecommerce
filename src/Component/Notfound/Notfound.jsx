import React from 'react'
import error from '../../images/error.svg'

export default function Notfound() {
  return (
    <div key={'notfoundPage'} className='container py-5 mt-5 d-flex justify-content-center'>
      <img src={error} alt="NotFound" />
    </div>
  )
}
