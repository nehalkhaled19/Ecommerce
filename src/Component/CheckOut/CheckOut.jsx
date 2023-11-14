import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { CartContext } from '../../Context/CartContext'
import { useParams } from 'react-router-dom'
import img1 from "../../imgs/5062532-fotor-2023110523261.jpg"
import { Helmet } from 'react-helmet'
export default function CheckOut() {

    let { CheckOut } = useContext(CartContext)


    let { id } = useParams()
    //  validation
    let validationSchema = Yup.object({
        details: Yup.string().required('Details is required'),
        phone: Yup.string().required("Phone is required").matches(/^01[1250][0-9]{8}$/, "Enter valid phone"),
        city: Yup.string().required('City is required').matches(/^[a-zA-Z]{2,16}$/, "Enter valid City"),
    })


    let forms = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        onSubmit: data,
        validationSchema
    })
    async function data(val) {
        let { data } = await CheckOut(id, val)
        if (data.status == 'success')
            window.location.href = data.session.url
    }



    return <>
     <Helmet>
            <title>Check out</title>
            <meta name="description" content="check out" />
        </Helmet>
         <div className='container mt-5' >
    <div  id='registerForm' className='d-flex shadow-lg px-4 rounded-5'>
  <div className='col-md-7 d-flex align-items-center'>
    <img src={img1} className='w-100' alt="logo2" />
    </div>
    <div className='col-md-5 d-flex align-items-center '>
      <div className='w-100'>
    <div className='py-3'>
    <h2 className='text-dark my-3 -position-relative  text-center '>Check Out Form</h2>
            <form onSubmit={forms.handleSubmit}>
                <div className='my-3'>
                    <input placeholder='Enter your details' onBlur={forms.handleBlur} onChange={forms.handleChange} type="text" className='form-control' name="details" id="details" />
                    {forms.touched.details ? <p className="mt-2 text-danger">{forms.errors.details}</p> : ""}

                </div>
                <div className='my-3'>
                    <input placeholder='Phone' onBlur={forms.handleBlur} onChange={forms.handleChange} type="tel" className='form-control' name="phone" id="phone" />
                    {forms.touched.phone ? <p className="mt-2 text-danger">{forms.errors.phone}</p> : ""}
                </div>

                <div className='my-3'>
    
                    <input placeholder='City' onBlur={forms.handleBlur} onChange={forms.handleChange} type="text" className='form-control' name="city" id="city" />
                    {forms.touched.city ? <p className="mt-2 text-danger">{forms.errors.city}</p> : ""}
                </div>
                <button  disabled={!(forms.isValid && forms.dirty)} type='submit' className='btn text-white bg-main mt-2 py-2 w-100 btn-sm d-flex align-items-center text-center justify-content-center'>
                    <div><i className="fa-brands fa-cc-visa mx-1"></i></div>
                    <span>Pay</span> </button>

            </form>

            </div>
            </div>
            </div>
            </div>
        </div>

    </>
}
