
import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import Home from './Component/Home/Home'
import Cart from './Component/Cart/Cart'
import Product from './Component/Product/Product'
import Register from './Component/Register/Register'
import Notfound from './Component/Notfound/Notfound'
import Login from './Component/Login/Login';
import Signout from './Component/Signout/Signout';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ForgetPass from './Component/ForgetPass/ForgetPass';
import ResetPass from './Component/ResetPass/ResetPass';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext'
import CheckOut from './Component/CheckOut/CheckOut';
import Category from './Component/Category/Category';
import { Provider } from 'react-redux';
import { categoryConfigureStore } from './Redux/store';
import Brand from './Component/Brands/Brand';
import WishList from './Component/WishList/WishList';
import AllOrders from './Component/AllOrders/AllOrders';


function App() {
  let [userData, setData] = useState(null)
  let [userId, setUserId] = useState(null)
  

  // check users
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      let token = localStorage.getItem("userToken")
      let data = jwtDecode(token)
      saveData(data)
      setUserId(data.id)
    }
  }, [])


  // to save user
  function saveData(x) {
    setData(x)
  }

  // to open home
  function SaveUser(x) {
    if (localStorage.getItem("userToken")) {
      return <Navigate to='../home' />
    }
    else {
      return x.children
    }
  }

  // to protect router
  function ProtectedRouter(x) {
    if (localStorage.getItem("userToken")) {
      return x.children
    
    }
    else {
      return <Navigate to='../login' />
    }
  }

  // logout
  function logout() {
    localStorage.removeItem("userToken")
    saveData(null)
    localStorage.removeItem('ClassName')
    localStorage.removeItem("cartNum")
    return <Navigate to='../login' />
  }

  // rooting
  let routes = createBrowserRouter([
    {
    path: '/', element: <Layout logout={logout} userData={userData} />, children: [
      { path: 'home', element: <ProtectedRouter>< Home userData={userData} /></ProtectedRouter> },
      { path: 'cart', element: <ProtectedRouter><Cart /></ProtectedRouter> },
      { path: 'brands', element: <ProtectedRouter><Brand /></ProtectedRouter> },
      { path: 'product', element: <ProtectedRouter><Product /></ProtectedRouter> },
      { path: 'wishlist', element: <ProtectedRouter><WishList /></ProtectedRouter> },
      { path: 'checkOut/:id', element: <ProtectedRouter><CheckOut /></ProtectedRouter> },
      { path: 'productDetails/:id', element: <ProtectedRouter><ProductDetails /></ProtectedRouter> },
      { path: 'category', element: <ProtectedRouter><Category /></ProtectedRouter> },
      { path: 'forgetPass', element: <ForgetPass /> },
      { path: 'resetPass', element: <ResetPass /> },
      { path: '*', element: <Notfound /> },
      { path: 'Ecommerce', element: <SaveUser><Register /></SaveUser> },
      { path: 'login', element: <Login saveData={saveData} /> },
      { path: 'signout', element: <Signout /> },
      {path: 'allorders', element: <ProtectedRouter>< AllOrders userId={userId} /></ProtectedRouter> }
    ]
    },
   

  ])
return (
  <>
    <Provider store={categoryConfigureStore}>
      <CartContextProvider>
        <RouterProvider router={routes} />
      </CartContextProvider>
    </Provider>

  </>
)
}

export default App;
