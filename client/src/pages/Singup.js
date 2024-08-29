import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './singup.css'
import toast from 'react-hot-toast'
export const Singup = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate=useNavigate()
    //const API='http://localhost:5000/api/v1/register'
    async function submitHandler(e) {
        console.log("hi")
        e.preventDefault();
        try {
           
            if (!fullName || !email || !phone || !password || !confirmPassword) {
                toast.error('All field are required')
                return;
            }
            if (password !== confirmPassword) {
                toast.error('Password and confirmed password is not same')
                return;
            }
            console.log("24",fullName)
            const response = await axios.post('http://localhost:5000/api/v1/register', {
                fullName,
                email,
                phoneNumber: phone, 
                password,
            })
            if (response.status === 200) {
               toast.success('regitered success')
               navigate('/login')
            }
             else if (response.status === 400) {
                toast.error(response.data.message); 
            }

        }
        catch (error) {
            console.log(error)
        }


    }
    return (
        <div className='singup-bg'>
        <form  id="singup" className="form" onSubmit={submitHandler}>
            <p className="title"  style={{textAlign:"center"}}>Register </p>
            <p className="message">Signup now and get full access to our doorstep service. </p>

            <label>
                <input onChange={(e) => setFullName(e.target.value)} className="input" type="text" placeholder="" required="" />
                <span>FullName</span>
            </label>
            <label>
                <input onChange={(e) => setEmail(e.target.value)} className="input" type="email" placeholder="" required="" />
                <span>Email</span>
            </label>
            <label>
                <input onChange={(e) => setPhone(e.target.value)} className="input" type="text" placeholder="" required="" />
                <span>Phone</span>
            </label>

            <label>
                <input onChange={(e) => setPassword(e.target.value)} className="input" type="password" placeholder="" required="" />
                <span>Password</span>
            </label>
            <label>
                <input onChange={(e) => setConfirmPassword(e.target.value)} className="input" type="password" placeholder="" required="" />
                <span>Confirm password</span>
            </label>
            <button className="submit">Submit</button>
            <p className="signin">Already have an acount ? <Link to="/login">Signin</Link> </p>
        </form>
        </div>
    )
}
