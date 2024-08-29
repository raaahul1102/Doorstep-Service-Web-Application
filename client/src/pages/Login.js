import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'
import toast from 'react-hot-toast';
import { addUserDetails, removeUserDetails } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
export const Login = () => {
  const dispatch=useDispatch()
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  console.log("Loginpage")
  localStorage.getItem('user')
async function submitHandler(e){
  e.preventDefault()
  try{
    console.log(phone,password)
    if(!phone || !password){
      toast.error('All field are required')
    }
    const response=await axios.post('http://localhost:5000/api/v1/login',{
      phone,
      password,
    })

    console.log(response.data.success); 
    if (!response.data.success) {
      toast.error(response.data.message);
    } else {
      const refreshToken=response.data.refreshToken
      dispatch(addUserDetails(response.data.user._id))
      console.log("31",response.data.user._id)
       localStorage.setItem("Token", refreshToken)
      console.log("21", response);
      toast.success('Login successfully');
      if(response.data.user.role=='Admin'){
        navigate('/admindashboard')
      }
      else if(response.data.user.role=='Service Provider'){
        navigate('/providerdashboard')
      }
      else{
        navigate('/');
      }
    
    }

  }
  catch(error){
    console.log(error)
  }
}
  return (
    <div className='background'>
    <div className="content">
      <div className="text" style={{textAlign:"center"}}>
        Login
      </div>
      <form onSubmit={submitHandler}>
        <div className="field">
          <input onChange={(e)=>setPhone(e.target.value)}  required type="text" className="input" value={phone}/>
          <span className="span">
            <svg className="" xmlSpace="preserve" style={{ enableBackground: 'new 0 0 512 512' }} viewBox="0 0 512 512" y="0" x="0" height="20" width="50" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path className="" dataOriginal="#000000" fill="#595959" d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805z"></path>
              </g>
            </svg>
          </span>
          <label className="label">Phone</label>
        </div>
        <div className="field">
          <input onChange={(e)=>setPassword(e.target.value)} required type="password" className="input" value={password}/>
          <span className="span">
            <svg className="" xmlSpace="preserve" style={{ enableBackground: 'new 0 0 512 512' }} viewBox="0 0 512 512" y="0" x="0" height="20" width="50" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path className="" dataOriginal="#000000" fill="#595959" d="M336 192h-16v-64C320 57.406 262.594 0 192 0S64 57.406 64 128v64H48c-26.453 0-48 21.523-48 48v224c0 26.477 21.547 48 48 48h288c26.453 0 48-21.523 48-48V240c0-26.477-21.547-48-48-48zm-229.332-64c0-47.063 38.27-85.332 85.332-85.332s85.332 38.27 85.332 85.332v64H106.668zm0 0"></path>
              </g>
            </svg>
          </span>
          <label className="label">Password</label>
        </div>
        <div className="forgot-pass">
          <Link to="/forgotpassword">Forgot Password?</Link>
        </div>
        <button className="button">Sign in</button>
        <div className="sign-up">
          Not a member?
          <Link to="/singup">signup now</Link>
        </div>
      </form>
    </div>
    </div>
  );
};
