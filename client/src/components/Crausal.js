import { useState, useEffect } from 'react'
import React from 'react'
import { image } from './crausalImage'
// import { GrLinkPrevious } from "react-icons/gr";
// import { GrLinkNext } from "react-icons/gr";
import './carsusal.css'
export const Crausal = () => {
    //console.log("5", image);
    const [activeIndex, setActiveIndex] = useState(0);
    // function prevHandler() {
    //     setActiveIndex(activeIndex === 0 ? image.length - 1 : activeIndex - 1);
    // }
    function nextHandler() {
        setActiveIndex((activeIndex + 1) % image.length);
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            nextHandler();
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
    }, [activeIndex]);
    return (
        <div className='crausal'>
            {/* <button className="btn1" onClick={prevHandler}>
                <GrLinkPrevious />
            </button> */}
            {
                image.map((item, index) => {
                    return (
                        <img
                            key={index}
                            className={`image ${index === activeIndex ? "active" : "notactive"
                                }`}
                            src={item}
                            alt="wallpaper"
                        />
                    );
                })
            }

            {/* <button className="btn1" onClick={nextHandler}>
                <GrLinkNext />
            </button> */}
        </div>
    )
}
