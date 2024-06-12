import React from 'react'

const Header = () => {
    return (
        <div className=' flex items-center justify-between px-4  lg:px-48  py-5'>
            <div>
                <h1 className=' text-[#5CB85C] font-bold text-2xl'>conducted</h1>
            </div>
            <div className=' flex items-center space-x-5'>
                <h1 className=' cursor-pointer text-gray-400'>Home</h1>
                <h1 className=' cursor-pointer text-gray-400'>Sign In</h1>
                <h1 className=' cursor-pointer text-gray-400'>Sign up</h1>
            </div>
        </div>
    )
}

export default Header;