import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import img1 from "../../imgs/5062532-fotor-2023110523261.jpg"
import { Helmet } from 'react-helmet'

export default function ResetPass() {

  let nav = useNavigate()

  // Base url
  let url = "https://ecommerce.routemisr.com"

  // -------------------------------------------------Email
  //  validation
  let validationSchema = Yup.object({
    email: Yup.string().required('email is required').email('enter valid email'),
    newPassword: Yup.string().required('password is required').matches(/^[a-z0-9]{6,16}$/, "enter Valid Passowrd"),
  })

  // formik
  let resetPass = useFormik({
    initialValues: {
      email: "",
      newPassword: ""
    },
    onSubmit: reset,
    validationSchema,
  })

  async function reset(val) {
    const { data } = await axios.put(`${url}/api/v1/auth/resetPassword`, val).catch((e)=>{
    })
    nav('../login')
  }

  return (
    <div className='container mt-5'>
         <Helmet>
            <title> Reset Password</title>
            <meta name="description" content=" Reset Password" />
        </Helmet>
          <div  id='registerForm' className='d-flex shadow-lg px-4 rounded-5'>
    <div className='col-md-7 d-flex align-items-center'>
      <img src={img1} className='w-100' alt="logo2" />
      </div>
     <div className='col-md-5 d-flex align-items-center '>
      <div id='forEmail' className='w-100'>
      <h2 className='text-dark my-4 text-center '>Reset password</h2>

      <form onSubmit={resetPass.handleSubmit} >
        <div className='my-3'>
          <input type="email" onBlur={resetPass.handleBlur} onChange={resetPass.handleChange} placeholder='enter your email' className='form-control my-1' name="email" id="email" />
          {resetPass.touched.email ? <p className="mt-2 text-danger">{resetPass.errors.email}</p> : ""}


        </div>
        <div className='my-3'>

          <input type="password" onBlur={resetPass.handleBlur} placeholder='new password' onChange={resetPass.handleChange} className='form-control my-1' name="newPassword" id="newPassword" />
          {resetPass.touched.newPassword ? <p className="mt-2 text-danger">{resetPass.errors.newPassword}</p> : ""}
        </div>

        <button disabled={!(resetPass.dirty && resetPass.isValid)} type='submit' className='btn my-4 rounded-4 m-auto text-white px-3 bg-main d-block'>Reset Password</button>

      </form>

    </div >
    </div >
    </div >
    </div >
  )
}
