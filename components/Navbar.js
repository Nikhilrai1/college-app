import React from 'react';
import Link from "next/Link";
import { useRouter } from "next/router"


import { AiOutlineSearch } from 'react-icons/ai';

const Navbar = () => {
    const { asPath } = useRouter();
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
                            <Link href={"/assignment"}><a href="#" className={`block ${asPath == "/assignment" ? "text-blue-500" : "text-gray-700"} py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Assignment</a></Link>
                        </li>
                        <li>
                            <Link href={"/gallary"}><a href="#" className={`block ${asPath == "/gallary" ? "text-blue-500" : "text-gray-700"} py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} >Gallary</a></Link>
                        </li>
                        <li>
                            <Link href={"/teachersignup"}><a href="#" className={`block ${asPath == "/teachersignup" ? "text-blue-500" : "text-gray-700"} py-2 pr-4 pl-3  hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>Teacher Signup</a></Link>
                        </li>
                        <li>
                            <Link href={"/signup"}><a href="#" className={`block ${asPath == "/signup" ? "text-blue-500" : "text-gray-700"} py-2 pr-4 pl-3  hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>Student Signup</a></Link>
                        </li>
                        <li>
                            <Link href={"/login"}><a href="#" className={`block ${asPath == "/login" ? "text-blue-500" : "text-gray-700"} py-2 pr-4 pl-3  hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>Login</a></Link>
                        </li>
                    </ul>

                </div>
                <div className="relative text-gray-600">
                    <input type="search" name="serch" placeholder="Search" className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none" />
                    <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                        <AiOutlineSearch />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

