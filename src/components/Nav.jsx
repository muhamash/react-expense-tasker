// import React from 'react'

import Button from "./common/Button";

export default function Nav() {
    return (
        <div
            className="flex max-w-7xl items-center bg-[#F9FAFB] w-full justify-between py-1 mt-2 border px-4 rounded-md mx-auto"
        >
            <div>
                <img src="image/favicon.svg" className="h-14" />
            </div>

            <div className="hidden md:block cursor-pointer">
                <ul className="flex gap-5 text-gray-500 font-medium">
                    <li className="hover:text-green-600 hover:scale-105 duration-200 transition-all">Home</li>
                    <li className="hover:text-green-600 hover:scale-105 duration-200 transition-all">App</li>
                    <li className="hover:text-green-600 hover:scale-105 duration-200 transition-all">Account</li>
                    <li className="hover:text-green-600 hover:scale-105 duration-200 transition-all">Export</li>
                </ul>
            </div>

            <Button OnClick={()=> alert("Please invest some money to publish the app")} className="px-6 py-2 bg-teal-600 text-white w-fit rounded-md" text={"Get App"}/>
        </div>
    );
}
