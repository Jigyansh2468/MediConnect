"use client";
import React, { useState, useEffect } from "react";
import gsap from "gsap";
import axios from "axios";
import "./Searchbar.css";
// import { FaSearch } from "react-icons/fa";
import Image from 'next/image'
import { useRouter } from "next/navigation";

const Searchbar = () => {
    const Route = useRouter();
    const [Results, setResults] = useState([]);
    const [input, setInput] = useState({
        specialization: "",
    });
    const clearResults = () => {
        setResults([]);
    };
    const [nodoc, setnodoc] = useState(false);
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        clearResults();
    };
    const searchonlinedoctor = () => {
        console.log(input);
        axios.get('http://localhost:8080/doctor/getonlinedoctor', {
            params: {
                specialization: input.specialization
            },
            withCredentials: true,
        })
            .then((response) => {
                setResults(response.data)
                if (Results.length === 0) {
                    setnodoc(true);
                }
            })
            .catch(error => { console.log(error) })
    }
    useEffect(() => {
        animateResults();
    }, [Results]);
    const animateResults = () => {
        const tl = gsap.timeline();
        tl.set(".results-container", { autoAlpha: 0, maxHeight: 0 });
        tl.to(".results-container", {
            duration: 0.5,
            autoAlpha: 1,
            maxHeight: "200px",
            ease: "power1.inOut",
        });
        tl.play();
    };
    const consultdoctor = () => {
        Route.push('/RoomPage')
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <video
                    autoPlay
                    muted
                    loop
                    className="fixed object-cover object-center w-full h-full z-0 filter blur-md m-20"
                >
                    <source src='/ConsultDoctor.mp4' type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute w-full h-full z-10"
                >
                    <div className="h-60 w-full bg-transparent text-3xl font-bold text-center"></div>
                    <div className="text-center text-4xl font-bold mb-16 text-white font-sans">Find and Book Doctor Now</div>
                    <div className="flex justify-center items-center gap-5">
                        <select
                            name="specialization"
                            value={input.specialization}
                            onChange={onInputChange}
                            className="my-5 p-4 rounded-full font-semibold border-white text-xl bg-blue-500 text-white"
                            required
                        >
                            <option value="">Select specialization</option>
                            <option value="Dentist">Dentist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Radiology">Radiology</option>
                            <option value="Cardiologist">Cardiologist</option>
                            <option value="Otorhinolaryngology">Otorhinolaryngology</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Psychiatrist">Psychiatrist</option>
                            <option value="Pediatrician">Pediatrician</option>
                            <option value="Radiologist">Radiologist</option>
                            <option value="Oncologist">Oncologist</option>
                            <option value="Ophthalmologist">Ophthalmologist</option>
                        </select>
                        {/* <div className="searchbox">
                            <FaSearch id="search-icon" />
                            <input
                                placeholder="Type to Search..."
                                name="value"
                                value={input.value}
                                onChange={onInputChange}
                            />
                        </div> */}
                        <button className="font-semibold bg-whiten border-2 border-purple-600 bg-white rounded-full py-2 px-3 hover:py-4 hover:px-6" onClick={searchonlinedoctor}>Search</button>
                    </div>
                    <div>
                        <div className="p-4  flex justify-center items-center">
                            <div className="results-container">
                                <ul className="font-bold text-xl bg-gray w-screen px-10 text-center">
                                    {
                                        Results.map((result, i) => (
                                            <div key={i} className="bg-purple-200 rounded-lg font-semibold my-4">
                                                <div className="flex justify-evenly items-center p-5 gap-40">
                                                    <Image src="/Profile.png" alt="Profile" height={100} width={100} className='rounded-full' />
                                                    <div>
                                                        <div className="text-2xl">{result.name}</div>
                                                        <div className="text-xl">{result.city}</div>
                                                    </div>
                                                    <div className="text-2xl">{result.specialization}</div>
                                                    <button onClick={consultdoctor} className="bg-green-200 rounded-lg py-2 px-3 hover:bg-green-500 hover:text-white" >
                                                        Consult Doctor
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    }{
                                        Results.length === 0 && nodoc === true && (
                                            <div>No Doctor Found</div>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </>
    );
};

export default Searchbar;
