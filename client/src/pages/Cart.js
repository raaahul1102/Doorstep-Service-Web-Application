import React, { useEffect, useState } from 'react';
import CartCard from '../components/CartCard';
import { useSelector } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
// import './Cart.css'
import { Checkout } from './Checkout';
  
const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.cart);
   const [totalAmount,setTotalAmount]=useState(0);
     function getTotalAmount(){
      let amount=0;
      cart.map((data)=>{
           amount=amount+data.price;
      })
      setTotalAmount(amount)
     }
     useEffect(()=>{
      getTotalAmount()
     },[cart])
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-light">
        <BiArrowBack className="icons cursor-pointer" onClick={() => navigate('/')} style={{ fontSize: '2rem' }} />
        <div className="text-lg mt-2 ">Go to Home Page</div>
      </div>
    );
  }
function gotoLogin(){
  navigate('/login')
}
  return (
    <div className='cart-bg'>
    {
      localStorage.getItem("Token")?(
        <>
        <div className="py-3 py-md-5 bg-light mt-8 mb-10">
     
     {cart.map((data, index) => (
       <CartCard key={index} data={data} />
     ))}
</div>
<Checkout totalAmount={totalAmount}/></>
      ):(
        <> <div className="py-3 py-md-5 bg-light mt-8 ">
     
        {cart.map((data, index) => (
          <CartCard key={index} data={data} />
        ))}
   </div>
   <div class="flex justify-center">
  <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-20" onClick={gotoLogin}>Login to Checkout</button>
</div>

</>
      )

    }
    
    </div>
  );
};

export default Cart;
