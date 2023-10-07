import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { CartContext } from '../../Context/CartContext'
import { useParams } from 'react-router-dom'

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
            details: "details",
            phone: "01010700999",
            city: "Cairo"
        },
        onSubmit: data,
        validationSchema
    })
    async function data(val) {
        let { data } = await CheckOut(id, val)
        if (data.status == 'success')
            window.location.href = data.session.url
    }




    return (
        <div className='py-5' key={'checkoutSection'}>

            <form onSubmit={forms.handleSubmit}>
                <div className='my-2'>
                    <label htmlFor="details">Enter your details</label>
                    <input onBlur={forms.handleBlur} onChange={forms.handleChange} type="text" className='form-control' name="details" id="details" />
                    {forms.touched.details ? <p class="mt-2 text-danger">{forms.errors.details}</p> : ""}

                </div>
                <div className='my-2'>
                    <label htmlFor="phone">Phone</label>
                    <input onBlur={forms.handleBlur} onChange={forms.handleChange} type="tel" className='form-control' name="phone" id="phone" />
                    {forms.touched.phone ? <p class="mt-2 text-danger">{forms.errors.phone}</p> : ""}
                </div>

                <div className='my-2'>
                    <label htmlFor="city">City</label>
                    <input onBlur={forms.handleBlur} onChange={forms.handleChange} type="text" className='form-control' name="city" id="city" />
                    {forms.touched.city ? <p class="mt-2 text-danger">{forms.errors.city}</p> : ""}
                </div>
                <button  disabled={!(forms.isValid && forms.dirty)} type='submit' className='btn text-white bg-main mt-2 py-2 w-100 btn-sm d-flex align-items-center text-center justify-content-center'>
                    <div><i class="fa-brands fa-cc-visa mx-1"></i></div>
                    <span>Pay</span> </button>

            </form>


        </div>
    )
}
