import React, { useState, useEffect } from 'react'
import mongoose from "mongoose";
import Student from '../models/Student';
import Link from "next/Link"



const students = ({ allstudents }) => {
    const [allStudents, setAllStudents] = useState(allstudents);
    const [sortBy, setSortBy] = useState("all");
    const [subsort, setSubsort] = useState("");
    const handleSubsort = (e) => {
        console.log(e.target.value)
        setSubsort(e.target.value)
    }
    const sortStudent = (sortBy,subsort) => {
        if(sortBy == "grade"){
            console.log(subsort)
            setAllStudents(allStudents.filter((student) => student.grade == subsort));
            console.log(allStudents)
        }
        else{
            setAllStudents(allstudents);
        }
    }
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="text-center mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Our Students</h1>
                        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Herald Internal College</p>
                        <div className='mx-auto max-w-fit'>
                            <span className='text-black mx-1'>Sort By:</span>
                            <select name="sort" id="name" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='border border-black mx-1'>
                                <option value="all">All</option>
                                <option value="name">Name</option>
                                <option value="grade">Grade</option>
                            </select>
                            {sortBy == "grade" &&
                                <select name="sort" id="name" value={subsort} onChange={handleSubsort} className='border border-black mx-1'>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            }

                            {subsort != "" && <button onClick={() => sortStudent(sortBy,subsort)} className="w-full mt-3 cursor-pointer px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                                sort
                            </button>
                            }

                        </div>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {
                            allStudents.map((data) => {
                                return (
                                    <div key={data.email} className="lg:w-1/4 md:w-1/2 p-4 w-full m-2 bg-white shadow-xl rounded-lg py-3">
                                        <div className="photo-wrapper p-2">
                                            <img className="w-32 h-32 rounded-full mx-auto" src={data.profile == "" ? "/user.webp" : data.profile} alt="profile" />
                                        </div>
                                        <div className="p-2">
                                            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{data.name}</h3>
                                            <div className="text-center text-gray-400 text-xs font-semibold">
                                                <p>{data.isStudent ? "Student" : "Teacher"}</p>
                                            </div>
                                            <table className="text-xs mx-auto my-3">
                                                <tbody>
                                                    <tr>
                                                        <td className="px-2 py-2 text-gray-500 font-semibold">Stream</td>
                                                        <td className="px-2 py-2">: {data.stream}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-2 py-2 text-gray-500 font-semibold">Group</td>
                                                        <td className="px-2 py-2">: {data.group}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                                                        <td className="px-2 py-2">: {data.address}</td>
                                                    </tr>
                                                </tbody></table>

                                            <div className="text-center my-3">
                                                <Link href={`student/${data.email}`}><a className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a></Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default students
export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    const allstudents = await Student.find();
    return {
        props: { allstudents: JSON.parse(JSON.stringify(allstudents)) },
    }
}