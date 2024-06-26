import React, {useContext, useState} from 'react'
import {AuthContext} from "../context/AuthContext";

export const Login = () => {
    const { login, logout } = useContext(AuthContext)

    const [email, setEmail] = useState('test@example.com')
    const [password, setPassword] = useState('password')

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }



    return (
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor={"email"} >Email:</label>
                <input type={"text"} value={email} onChange={updateEmail}/>
            </div>
            <div>
                <label htmlFor={"password"}>Password:</label>
                <input type={"text"} value={password} onChange={updatePassword}/>
            </div>
            <div>
                <button onClick={async ()=> await login(email, password)}>Login</button>
            </div>
            <div>
                <button onClick={async ()=> await logout(email, password)}>Logout</button>
            </div>
        </div>
    )
}