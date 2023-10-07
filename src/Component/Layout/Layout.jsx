import React from 'react'
import Nav from '../Nav/Nav'
import { Outlet } from 'react-router-dom'



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
