import React, { useState, useEffect } from 'react'
import Link from "next/Link";
import { FaEllipsisV } from 'react-icons/fa';


const GetAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        getAssignments();
    }, [])

    const getAssignments = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getassignment`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            })
            let postData = await res.json();
            console.log(postData.info)
            setAssignments(postData.info)
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {
                        assignments.map((data) => {
                            return (
                                <div key={data._id} className="xl:w-1/3 md:w-1/2 p-2">
                                    <div className="border border-gray-200 p-6 rounded-lg">
                                        <div className="flex p-1 justify-between items-center">
                                            <span className="w-1/6">
                                                <img src={data.creatorProfile == "" ?  "user.webp" : data.creatorProfile} className={"cursor-pointer h-7 w-7 rounded-full"} />
                                            </span>
                                            <span className='flex justify-start items-center w-3/6'>
                                                <h1 className="text-sm font-md">{data.creatorName}</h1>
                                            </span>
                                            <span className="w-2/6 flex justify-end items-center">
                                                <FaEllipsisV className="cursor-pointer" />
                                            </span>
                                        </div>
                                        <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{data.title}</h2>
                                        <p className="leading-relaxed text-base">{data.desc}</p>
                                        <span className="cursor-pointer text-sm text-blue-500 hover:text-blue-600 mt-2">View Assignment</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default GetAssignments;
