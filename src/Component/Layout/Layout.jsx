import React, { useContext, useEffect } from 'react'
import Nav from '../Nav/Nav'
import { Outlet, useLocation } from 'react-router-dom'
import $ from 'jquery'
import { Offline } from "react-detect-offline";

export default function Layout({ userData, logout }) {


  // at changing path
  const ScrollToTop = () => {
    // Extracts pathname property(key) from an object
    const { pathname } = useLocation();

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
      $("html,body").animate({ scrollTop: 0 }, { duration: 0, queue: false })
    }, [pathname]);
  }
  ScrollToTop()


  return <>

    <div className='pt-5'>
      <Nav logout={logout} userData={userData}></Nav>
      <div>
        <Outlet />
      </div>
      <Offline>
        <div className='network'>

          <i className='fas fa-wifi'></i>  

          Your are offline (surprise!)
        </div>
      </Offline>

    </div>
  </>
}
