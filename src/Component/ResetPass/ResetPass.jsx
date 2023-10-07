import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"


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
    nav('/login')
  }

  return (
    <div key={'ResetPassForm'} className='py-5 mt-5'>
      <h2>Reset password</h2>
      <form onSubmit={resetPass.handleSubmit} >
        <div className='my-2'>
          <label htmlFor="email" className='my-2'>Enter your email</label>
          <input type="email" onBlur={resetPass.handleBlur} onChange={resetPass.handleChange} className='form-control my-1' name="email" id="email" />
          {resetPass.touched.email ? <p class="mt-2 text-danger">{resetPass.errors.email}</p> : ""}


        </div>
        <div className='my-2'>
          <label htmlFor="newPassword">new Password</label>
          <input type="password" onBlur={resetPass.handleBlur} onChange={resetPass.handleChange} className='form-control my-1' name="newPassword" id="newPassword" />
          {resetPass.touched.newPassword ? <p class="mt-2 text-danger">{resetPass.errors.newPassword}</p> : ""}
        </div>

        <button disabled={!(resetPass.dirty && resetPass.isValid)} type='submit' className='btn my-4  text-white bg-main d-block ms-auto'>Reset Password</button>

      </form>

    </div >
  )
}
