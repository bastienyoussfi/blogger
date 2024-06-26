import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function handleLogin(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        })
        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            });
        } else {
            alert('Login failed');
        }
    }

    if (redirect) {
        return <Navigate to="/" />
    }

    return (
        <div className="w-full max-w-[400px] mt-48 mx-[auto] my-[0] font-mono">
            <form className="bg-[#1d1d1d] shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                <label className="block text-white text-sm mb-2" htmlFor="username">
                    Username
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" 
                placeholder="Username"
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
                />
                </div>
                <div className="mb-6">
                <label className="block text-white text-sm mb-2" htmlFor="password">
                    Password
                </label>
                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                type="password" 
                placeholder="******************"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                />
                <p className="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
                <div className="flex items-center justify-between px-2">
                <button onClick={(e) => handleLogin(e)} className="text-white hover:underline font-bold rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign In
                </button>
                <a className="inline-block align-baseline font-bold text-white hover:underline" href="/">
                    Forgot Password?
                </a>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2024 Bastien Youssfi. All rights reserved.
            </p>
        </div>
    )
}