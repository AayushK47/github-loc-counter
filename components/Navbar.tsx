import React from 'react';

function Navbar() {
    return (        
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="#" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">GLOCC</span>
                </a>
                <div className="" id="mobile-menu">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li>
                            {/* <a href="#" className="block py-2 pr-4 pl-3 text-white font-bold" aria-current="page">Home</a> */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;