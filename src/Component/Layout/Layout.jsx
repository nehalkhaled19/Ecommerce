import React, { useEffect } from 'react'
import Nav from '../Nav/Nav'
import { Outlet, useLocation } from 'react-router-dom'
import $ from 'jquery'


export default function Layout({ userData, logout }) {
  
  return <>

    <div className='pt-5'>
      <Nav logout={logout} userData={userData}></Nav>
      <div>
        <Outlet />
      </div>
    </div>
    </>
}
