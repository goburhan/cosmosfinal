import React, { Component }  from 'react';



export default function Welcome() {

    return (
        <div>
            <div className="grid grid-cols-2 ">
            
                <div className=" text-white text-4xl  md:mt-80  mb-8 text-left place-content-center  gap-4">
               Explore the life you want to live. <br/> Put your crypto to work 
                   
                </div>
                
            </div>
          
            <button
                  type="button"
                  className="  bg-green-800 px-12 py-2 rounded-3xl text-lg text-white  "
                  
                >
                  <div>Review</div>
                </button>
        </div>
    ); 
}