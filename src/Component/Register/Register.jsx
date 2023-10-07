import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

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
    name: Yup.string().required('name is required').min(3, 'min length 3').max(12, 'max length 12'),
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
    <div key={'registerForm'} className='py-lg-5 py-3'>
      <h2>Register Form</h2>
      {errMessage == "" ? null : <div className='alert alert-danger'>{errMessage}</div>}
      <form onSubmit={forms.handleSubmit}>
        <div className='my-2'>
          <label htmlFor="name">name</label>
          <input onBlur={forms.handleBlur} onChange={forms.handleChange} type="text" className='form-control' name="name" id="name" />
          {forms.touched.name ? <p class="mt-2 text-danger">{forms.errors.name}</p> : ""}
        </div>
        <div className='my-2'>
          <label htmlFor="email">email</label>
          <input onBlur={forms.handleBlur} onChange={forms.handleChange} type="email" className='form-control' name="email" id="email" />
          {forms.touched.email ? <p class="mt-2 text-danger">{forms.errors.email}</p> : ""}
        </div>
        <div className='my-2'>
          <label htmlFor="password">password</label>
          <input onBlur={forms.handleBlur} onChange={forms.handleChange} type="password" className='form-control' name="password" id="password" />
          {forms.touched.password ? <p class="mt-2 text-danger">{forms.errors.password}</p> : ""}
        </div>
        <div className='my-2'>
          <label htmlFor="rePassword">repassword</label>
          <input onBlur={forms.handleBlur} onChange={forms.handleChange} type="password" className='form-control' name="rePassword" id="rePassword" />
          {forms.touched.rePassword ? <p class="mt-2 text-danger">{forms.errors.rePassword}</p> : ""}
        </div>
        <div className='my-2'>
          <label htmlFor="phone">phone</label>
          <input onBlur={forms.handleBlur} onChange={forms.handleChange} type="tel" className='form-control' name="phone" id="phone" />
          {forms.touched.phone ? <p class="mt-2 text-danger">{forms.errors.phone}</p> : ""}
        </div>
        {loading ? <button type='button' className='btn  text-white bg-main ms-auto d-block'>
          <i className='fa-solid fa-spinner fa-spin'></i>
        </button> : <button disabled={!(forms.isValid && forms.dirty)} type='submit' className='btn my-4  text-white bg-main d-block ms-auto'>Register</button>}

      </form>

    </div>
  )
}
