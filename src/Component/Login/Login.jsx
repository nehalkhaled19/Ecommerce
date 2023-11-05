import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

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
    <div className='py-3'>
      <h2 className='mb-3'>Login Form</h2>
      {errMessage == "" ? null : <div className='alert alert-danger'>{errMessage}</div>}
      <form key={'loginForm'} onSubmit={forms.handleSubmit}>
        <div className='my-2'>
          <label htmlFor="email">Enter your email:</label>
          <input onBlur={forms.handleBlur} onChange={forms.handleChange} type="email" className='form-control' name="email" id="email" />
          {forms.touched.email ? <p class="mt-2 text-danger">{forms.errors.email}</p> : ""}

        </div>
        <div className='my-2'>
          <label htmlFor="password">password</label>
          <input onBlur={forms.handleBlur} onChange={forms.handleChange} type="password" className='form-control' name="password" id="password" />
          {forms.touched.password ? <p class="mt-2 text-danger">{forms.errors.password}</p> : ""}
        </div>

        <Link to={"../forgetPass"} className='forget'>Forget Password?</Link >
        {loading ? <button type='button' className='btn  text-white bg-main ms-auto d-block'>
          < i className='fa-solid fa-spinner fa-spin' />
        </button> : <button disabled={!(forms.isValid && forms.dirty)} type='submit' className='btn my-4 text-white bg-main d-block ms-auto'>Login</button>}

      </form>

    </div >
  )
}
