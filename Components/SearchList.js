"use client"
import React from 'react'
import { useEffect } from 'react';
import gsap from "gsap";
const SearchList = ({ results, setdoctor, setbookapt }) => {
    function renderResults() {
        if (results.length === 0) {
            return <div>No Doctors Found</div>;
        }

        return results.map((result, i) => (
            <div key={i} className="w-100 bg-white border-2 border-black rounded-lg font-semibold my-10">
                <div className="flex justify-between  items-center p-5 gap-40">
                    <img src="" alt="Profile" height={100} width={100} />
                    <div>
                        <div className="text-2xl">{result.name}</div>
                        <div className="text-xl">{result.city}</div>
                    </div>
                    <div className="text-2xl">{result.specialization}</div>
                    <button onClick={() => {
                        setdoctor(result);
                        setbookapt(true);
                    }} className="border-green-500 border-2 rounded-lg py-2 px-3 hover:bg-green-500 hover:text-white">
                        Book Appointment
                    </button>
                </div>
            </div >
        ));
    };
    useEffect(() => {
        animateResults();
    }, [results]);
    const animateResults = () => {
        const tl = gsap.timeline();
        tl.set(".results-container", { autoAlpha: 0 });
        tl.to(".results-container", {
            duration: 0.5,
            autoAlpha: 1,
            y: 0,
            ease: "power1.inOut",
        });
        tl.play();
    };
    return (
        <div className="p-10 bg-blue-100 flex justify-center items-center">
            <div className="results-container">
                <ul className="font-bold text-xl bg-gray w-screen px-20 text-center">{renderResults()}</ul>
            </div>
        </div>
    )
}

export default SearchList