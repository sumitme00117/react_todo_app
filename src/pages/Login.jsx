import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import toast from "react-hot-toast"
import axios from "axios"
import {server} from "../main"
import { Navigate } from 'react-router-dom'

const Login = () => {
    const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context)
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandler = async (e)=>{
        setLoading(true)
        e.preventDefault()
        try {
        
        const {data} = await axios.post(`${server}/users/login`, {
            email, password
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true, 
        })
        toast.success(data.message)
        setIsAuthenticated(true)
        setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false)
            setIsAuthenticated(false)
        }
    }
    if(isAuthenticated) return <Navigate to={"/"}/>

  return (
    <div className="login">
        <section>
            <form onSubmit={submitHandler}>
            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Email" required/>
            <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" required/>
                <button disabled={loading} type="submit">Login</button>
                <h4>Or</h4>
                <Link to="/register">Sign up</Link>
            </form>
        </section>
      
    </div>
  )
}

export default Login
