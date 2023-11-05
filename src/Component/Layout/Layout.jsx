import React, { useEffect } from 'react'
import Nav from '../Nav/Nav'
import { Outlet, useLocation } from 'react-router-dom'
import $ from 'jquery'


export default function Layout({ userData, logout }) {
  return (
    <div className='py-5'>
      <Nav logout={logout} userData={userData}></Nav>
      <div className='container mt-5'>
        <Outlet />
      </div>
    </div>
  )
}
