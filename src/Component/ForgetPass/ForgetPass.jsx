import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import img1 from "../../imgs/5062532-fotor-2023110523261.jpg"
import { Helmet } from 'react-helmet'

export default function ForgetPass() {

    let [emailError, setErrorMessage] = useState("")
    let [codeError, codeMessage] = useState("")
    let nav = useNavigate()


    // Base url
    let url = "https://ecommerce.routemisr.com"

    // -------------------------------------------------Email
    //  validation
    let validationSchema = Yup.object({
        email: Yup.string().required('email is required').email('enter valid email')
    })

    // formik
    let sendCode = useFormik({
        initialValues: {
            email: ""
        },
        onSubmit: sendData,
        validationSchema,
    })

    // send data
    async function sendData(val) {
        let { data } = await axios.post(`${url}/api/v1/auth/forgotPasswords`, val).catch((err) => {
            setErrorMessage(err.response.data.message)
            console.log(err.response.data.message);
        })
        document.getElementById("forCode").classList.remove('d-none')
        document.getElementById("forEmail").classList.add('d-none')
    }
    // ------------------------------------------------Code
    //  validation
    let validation = Yup.object({
        resetCode: Yup.string().required('code is required').matches(/^[0-9]+$/, "enter Valid code")
    })

    // formik
    let getCode = useFormik({
        initialValues: {
            resetCode: ""
        },
        onSubmit: code,
        validationSchema: validation,
    })

    // send data
    async function code(val) {
        let { data } = await axios.post(`${url}/api/v1/auth/verifyResetCode`, val).catch((err) => {
            codeMessage(err.response.data.message)
        })
        nav('../resetPass')
    }



    return <div className='container mt-5'>
         <Helmet>
            <title>Forget Password</title>
            <meta name="description" content="Forget Password" />
        </Helmet>
        <div  id='registerForm' className='d-flex shadow-lg px-4 rounded-5'>
    <div className='col-md-7 d-flex align-items-center'>
      <img src={img1} className='w-100' alt="logo2" />
      </div>
     <div className='col-md-5 d-flex align-items-center '>
      <div id='forEmail' className='w-100'>
      <h2 className='text-dark my-4 '>Forget your passowrd:</h2>

        <form onSubmit={sendCode.handleSubmit}>

            <div className='my-3'>
                {emailError != "" ? <div className='alert alert-danger'>{emailError}</div> : ""}
               
                <input placeholder='Enter your email' onChange={sendCode.handleChange} type="email" className='form-control mt-2' name="email" id="email" />
                <p className='mt-1 text-danger'>{sendCode.errors.email}</p>
            </div>
            <button disabled={!(sendCode.isValid && sendCode.dirty)} type='submit' className='btn my-4 rounded-4 m-auto text-white px-5 bg-main d-block' style={{fontSize:'16px'}}>Send</button>
        </form>
        <div>
        </div>
        </div>
        <div  id='forCode' className='d-none w-100'>
      <h2 className='text-dark my-4 position-relative'>Enter code:</h2>
            <form onSubmit={getCode.handleSubmit}>
                <div className='my-2'>
                {codeError != "" ? <div className='alert alert-danger'>{codeError}</div> : ""}

                    <input placeholder='code' onChange={getCode.handleChange} type="resetCode" className='form-control mt-2' name="resetCode" id="resetCode" />
                    <p className='mt-1 text-danger'>{getCode.errors.resetCode}</p>
                </div>
                <button disabled={!(getCode.isValid && getCode.dirty)} type='submit' className='btn my-4 rounded-4 m-auto text-white px-3 bg-main d-block' style={{fontSize:'16px'}}>Change Password</button>
            </form>
        </div>
    </div>
    </div>
    </div>


}
