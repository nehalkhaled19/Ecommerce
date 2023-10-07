import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

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
        nav('/ResetPass')
    }



    return <div>
        <form key={'forgetPassForm'} id='forEmail' onSubmit={sendCode.handleSubmit}>

            <div className='my-5'>
                {emailError != "" ? <div className='alert alert-danger'>{emailError}</div> : ""}
                <label htmlFor="email">Enter your email:</label>
                <input onChange={sendCode.handleChange} type="email" className='form-control mt-2' name="email" id="email" />
                <p className='mt-1 text-danger'>{sendCode.errors.email}</p>
            </div>
            <button disabled={!(sendCode.isValid && sendCode.dirty)} type='submit' className='btn my-4  text-white bg-main d-block ms-auto'>Send</button>
        </form>
        <div id='forCode' key={'codeForm'} className='d-none'>
            <form onSubmit={getCode.handleSubmit}>
                <div className='my-5'>
                {codeError != "" ? <div className='alert alert-danger'>{codeError}</div> : ""}

                    <label htmlFor="resetCode">Enter Code:</label>
                    <input onChange={getCode.handleChange} type="resetCode" className='form-control mt-2' name="resetCode" id="resetCode" />
                    <p className='mt-1 text-danger'>{getCode.errors.resetCode}</p>
                </div>
                <button disabled={!(getCode.isValid && getCode.dirty)} type='submit' className='btn my-4  text-white bg-main d-block ms-auto'>Change Password</button>
            </form>
        </div>
    </div>

}
