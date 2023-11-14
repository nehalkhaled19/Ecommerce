import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import img1 from "../../imgs/5062532-fotor-2023110523261.jpg"
import { Helmet } from 'react-helmet'

export default function Login({ saveData }) {


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
    email: Yup.string().required('email is required').email('enter valid email'),
    password: Yup.string().required('password is required').matches(/^[a-z0-9]{6,16}$/, "enter Valid Passowrd"),
  })

  // formik
  let forms = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: sendData,
    validationSchema,

  })

  // send data
  async function sendData(values) {
    setLoading(true)
    let { data } = await axios.post(`${url}/api/v1/auth/signin`, values).catch((err) => {
      console.log(err);
      setErrorMessage(err.response.data.message)
      setLoading(false)
    })
    localStorage.setItem("userToken", data.token)
    saveData(data.user)
    nav('../home')
    setLoading(false)

  }


  return (
    
    <div className='container mt-5' >
       <Helmet>
            <title>Login</title>
            <meta name="description" content="Login" />
        </Helmet>
    <div  id='registerForm' className='d-flex shadow-lg px-4 rounded-5'>
  <div className='col-md-7 d-flex align-items-center'>
    <img src={img1} className='w-100' alt="logo2" />
    </div>
    <div className='col-md-5 d-flex align-items-center '>
      <div className='w-100'>
    <div className='py-3'>
    <h2 className='text-dark my-3 -position-relative  text-center '>Login Form</h2>

      {errMessage == "" ? null : <div className='alert alert-danger'>{errMessage}</div>}
      <form  onSubmit={forms.handleSubmit}>
        <div className='my-4'>
          <input onBlur={forms.handleBlur} placeholder='email' onChange={forms.handleChange} type="email" className='form-control' name="email" id="email" />
          {forms.touched.email ? <p className="mt-2 text-danger">{forms.errors.email}</p> : ""}

        </div>
        <div className='my-4'>
          <input onBlur={forms.handleBlur} placeholder='password'  onChange={forms.handleChange} type="password" className='form-control' name="password" id="password" />
          {forms.touched.password ? <p className="mt-2 text-danger">{forms.errors.password}</p> : ""}
        </div>

        <Link to={"../forgetPass"} className='forget'>Forget Password?</Link >
        {loading ? <button type='button' className='btn my-4 rounded-4 m-auto text-white px-3 bg-main d-block'>
          < i className='fa-solid fa-spinner fa-spin' />
        </button> : <button disabled={!(forms.isValid && forms.dirty)} type='submit' className='btn my-4 rounded-4 m-auto text-white px-5 bg-main d-block' style={{fontSize:'18px'}}>Login</button>}

      </form>
      </div >
      </div >
      </div >
      </div >
    </div >
  )
}
