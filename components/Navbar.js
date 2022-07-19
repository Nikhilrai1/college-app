import React, { useState, useEffect } from 'react';
import Link from "next/Link";
import { useRouter } from "next/router"
import { FaUserCircle } from 'react-icons/fa';
import { GrNotification } from 'react-icons/gr';


const Navbar = () => {
    const { asPath } = useRouter();
    const router = useRouter();
    const [signOut,setSignOut] = useState(false);
    const [token, setToken] = useState(null)
    const [auth, setAuth] = useState("")

    // useEffect for getting token
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(JSON.parse(localStorage.getItem('token')));
        }
        getProfile();
        setSignOut(false);
    }, [signOut,router.asPath])

    const signout = () => {
        localStorage.removeItem("token");
        setSignOut(true)
        router.push("/");
    }

    // useEffect for profile
    // useEffect(() => {
    // },[token,asPath]);

    const getProfile = async () => {
        try {
            console.log(token)
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/tokendecrypt`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            let data = await res.json();
            console.log(data)
            setAuth(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <nav
            style={{
                height: "75px",
                width: "100vw",
                position: "fixed",
                zIndex: 100,
                top: 0
            }}
            className="bg-gray-50 border-gray-200 px-2 sm:px-4 py-3 rounded dark:bg-gray-800">
            <div className="flex flex-wrap justify-between items-center mx-auto">
                <div className="logo">
                    <Link href={"/"}>
                        <img
                            style={{
                                height: "50px",
                                width: "200px",
                                objectFit: "contain"
                            }}
                            src="/logo.png"
                            alt="logo"
                            className='cursor-pointer'
                        />
                    </Link>
                </div>

                <div className="hidden flex-initial w-full md:block md:w-auto mx-2" id="mobile-menu">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li>
                            <Link href={"/students"}><a href="#" className={`block ${asPath == "/students" ? "text-blue-500" : "text-gray-700"} py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} >Students</a></Link>
                        </li>
                        <li>
                            <Link href={"/notice"}><a href="#" className={`block ${asPath == "/notice" ? "text-blue-500" : "text-gray-700"} py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} >Notice</a></Link>
                        </li>
                        <li>
                            {token && <Link href={auth.isTeacher || auth.isAdmin ? "/postassignment" : "/studentassignment"}><a href="#" className={`block ${asPath == "/assignment" ? "text-blue-500" : "text-gray-700"} py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Assignment</a></Link>}
                        </li>
                        <li>
                            <Link href={"/gallary"}><a href="#" className={`block ${asPath == "/gallary" ? "text-blue-500" : "text-gray-700"} py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} >Gallary</a></Link>
                        </li>
                        {!token && <li className="relative group cursor-pointer hover:text-blue-500">
                            Signup
                            <div className={`mt-1 w-56 absolute hidden group-hover:block rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">
                                    <Link href={"/signup"}><a href="#" className="hover:text-blue-500 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Student Signup</a></Link>
                                    <Link href={"/teachersignup"}><a href="#" className="hover:text-blue-500 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Teacher Signup</a></Link>
                                </div>
                            </div>
                        </li>}
                        {!token && <li className="relative group cursor-pointer hover:text-blue-500">
                            Login
                            <div className={`mt-1 w-56 absolute hidden group-hover:block rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">
                                    <Link href={"/login"}><a href="#" className="hover:text-blue-500 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Student Login</a></Link>
                                    <Link href={"/teacherlogin"}><a href="#" className="hover:text-blue-500 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Teacher Login</a></Link>
                                </div>
                            </div>
                        </li>}
                    </ul>

                </div>
                <div className="flex justify-between items-center text-gray-600">
                    <div className="relative cursor-pointer m-3">
                        <GrNotification className="h-7 w-7 rounded-full" />
                        <span className="absolute h-4 w-4 text-xs rounded-full bg-red-500 flex justify-center items-center p-1 text-white top-0 right-0">1</span>
                    </div>
                    <div className="relative group cursor-pointe hover:text-blue-500 m-3">
                        <FaUserCircle className="cursor-pointer h-7 w-7 rounded-full" />
                        <div style={{ right: "-5px", width: "120px" }} className={`mt-1 absolute hidden group-hover:block rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-1 " role="none">
                                {!token && <Link href={"/login"}><a href="#" className="hover:text-blue-500 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Student Login</a></Link>}
                                {!token && <Link href={"/teacherlogin"}><a href="#" className="hover:text-blue-500 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Teacher Login</a></Link>}
                                {token && <Link href={"/profile"}><a href="#" className="hover:text-blue-500 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Profile</a></Link>}
                                {token && <Link href={"/settings"}><a href="#" className="hover:text-blue-500 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Settings</a></Link>}
                                {token && <button onClick={signout} className="hover:text-blue-500 cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">Sign out</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default Navbar

