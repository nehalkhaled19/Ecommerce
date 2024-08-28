import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import img1 from "../../imgs/5062532-fotor-2023110523261.jpg"
import { Helmet } from 'react-helmet'

export default function Register() {


  let [errMessage, setErrorMessage] = useState("")
  let [loading, setLoading] = useState(false)
  let nav = useNavigate()

  // Base url
  let url = "https://ecommerce.routemisr.com"



  // sumbit
  function sumbit(val) {
    sendData(val)
  }
  //  validation
  let validationSchema = Yup.object({
    name: Yup.string().required('name is required').matches(/^[a-zA-Z]{3,15}[ ]?[a-zA-Z]*$/, "Enter valid name"),
    email: Yup.string().required('email is required').email('enter valid email'),
    password: Yup.string().required('password is required').matches(/^[a-z0-9]{6,16}$/, "enter Valid Passowrd"),
    rePassword: Yup.string().required('repassword is required').oneOf([Yup.ref('password')], 'enter matched Password'),
    phone: Yup.string().required("phone Required").matches(/^01[1250][0-9]{8}$/, "Phone not Valid")
  })

  // fotmik
  let forms = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    onSubmit: sendData,
    validationSchema,
  })

  // send data
  async function sendData(values) {
    setLoading(true)
    let { data } = await axios.post(`${url}/api/v1/auth/signup`, values).catch((err) => {
      setErrorMessage(err.response.data.message)
      setLoading(false)
    })
    nav('/login')
    setLoading(false)

  }


  return (
    
    <div className='container mt-5'>
      <Helmet>
            <title>Shopify Register</title>
            <meta name="description" content="Shopify Register" />
        </Helmet>
      <div  id='registerForm' className='d-flex shadow-lg px-4 rounded-5'>
    <div className='col-md-7 d-flex align-items-center'>
      <img src={img1} className='w-100' alt="logo2" />
      </div>
     <div className='col-md-5 d-flex align-items-center '>
      <div className='w-100'>
      <h2 className='text-dark mt-5 position-relative  text-center '>Register Form</h2>

      {errMessage == "" ? null : <div className='alert alert-danger'>{errMessage}</div>}
      <form className='mt-4' onSubmit={forms.handleSubmit}>
        <div className='my-4'>
       
          <input onBlur={forms.handleBlur} onChange={forms.handleChange} type="text" placeholder='name' className='form-control' name="name" id="name" />
          {forms.touched.name ? <p className="text-danger">{forms.errors.name}</p> : ""}
        </div>
        <div className='my-4'>
       
          <input onBlur={forms.handleBlur} onChange={forms.handleChange} type="email" placeholder='email' className='form-control' name="email" id="email" />
          {forms.touched.email ? <p className="text-danger">{forms.errors.email}</p> : ""}
        </div>
        <div className='my-4'>
         
          <input onBlur={forms.handleBlur} onChange={forms.handleChange} type="password" placeholder='password' className='form-control' name="password" id="password" />
          {forms.touched.password ? <p className="text-danger">{forms.errors.password}</p> : ""}
        </div>
        <div className='my-4'>
          
          <input onBlur={forms.handleBlur} onChange={forms.handleChange} type="password" placeholder='repassword' className='form-control' name="rePassword" id="rePassword" />
          {forms.touched.rePassword ? <p className="text-danger">{forms.errors.rePassword}</p> : ""}
        </div>
        <div className='my-4'>
          
          <input onBlur={forms.handleBlur} onChange={forms.handleChange} type="tel" placeholder='phone' className='form-control' name="phone" id="phone" />
          {forms.touched.phone ? <p className="text-danger">{forms.errors.phone}</p> : ""}
        </div>
        {loading ? <button type='button' className='btn my-4 rounded-4 m-auto text-white px-3 bg-main d-block'>
          <i className='fa-solid fa-spinner fa-spin'></i>
        </button> : <button disabled={!(forms.isValid && forms.dirty)} type='submit' className='btn my-4 rounded-4 m-auto text-white px-3 bg-main d-block '>Register</button>}

      </form>
      </div>
    

      </div>
    </div>
    </div>
  )
}
