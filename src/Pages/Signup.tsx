import React from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();



    return (
        <div className=' grid place-items-center'>
            <div className=' mt-10'>
                <div className=' space-y-4'>
                    <h1 className=' text-center text-5xl'>Sign Up</h1>
                    <p onClick={() => {
                        navigate("/login")
                    }} className=' text-center text-[#5CB85C] hover:underline cursor-pointer'>Have an account?</p>
                </div>
                <div className=' space-y-6 pt-4 px-2 lg:px-0'>
                    <input placeholder='Username' className=' outline-none py-4 px-5 border border-[#dddddd] w-full rounded-[5px]' />
                    <input placeholder='Email' className=' outline-none py-4 px-5  border border-[#dddddd] w-full rounded-[5px]' />
                    <input placeholder='Password' className=' outline-none py-4 px-5  border border-[#dddddd] w-full rounded-[5px]' />
                    <div className=' flex justify-end py-2'>
                        <button className=' bg-[#5CB85C] text-[white] py-4 text-xl px-8 rounded-[5px] flex'>Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;