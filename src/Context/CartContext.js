import axios from "axios";
import { createContext,  useState , useEffect} from "react";
export let CartContext = createContext()

export default function CartContextProvider(props) {

    // head
    let head = {
        token: localStorage.getItem('userToken')
    }
    let [num, setNum] = useState(localStorage.getItem('cartNum'))
    let x;
    async function getAllData() {
        let myReq = await getData().catch((err) => {
            console.log('Sorry you arenot user');
            localStorage.setItem('cartNum', 0)
            x = 0
            setNum(localStorage.getItem('cartNum'))
        })
        if (x != 0 || x == undefined) {
            localStorage.setItem('cartNum', myReq.data.numOfCartItems)
            x = myReq.data.numOfCartItems
            setNum(myReq.data.numOfCartItems)
         
        }
        clearConsole()
    }
   
    function clearConsole() { 
        if(window.console || window.console.firebug) {
           console.clear();
        }
    }
 
        getAllData()
   





    // delete from cart
    function deleteData(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers: head
        }
        )
    }
    //clear cart
    function clearCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: head
        }
        )
    }
    // get cart data
    function getData() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: head
        })
        // .then((response)=>{
        //     console.log(response);
        // })
    }
    // get wishlist data
    function getWishListData() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: head
        }
        )
    }
    // delete from wishList
    function deletePro(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers: head
        }
        )
    }
    // add to cart
    function addToCart(id) {
        let body = {
            "productId": id
        }
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', body, {
            headers: head
        }
        )
    }
    // add to WishList
    function addToWishList(id) {
        let body = {
            "productId": id
        }
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', body, {
            headers: head
        }
        )
    }
    // change quantity
    function updataProduct(id, count) {
        let body = {
            "count": count
        }
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, body, {
            headers: head
        }
        )

    }


    //  checkout   
    function CheckOut(id, data) {
        let body = {
            shippingAddress: data
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, body, {
            headers: head
        }
        )

    }

    return <CartContext.Provider value={{ num, setNum, clearCart, deletePro, getWishListData, addToWishList, addToCart, getData, deleteData, updataProduct, CheckOut }}>
        {props.children}
    </CartContext.Provider>
}
