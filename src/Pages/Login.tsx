import React from 'react'

const Login: React.FC = () => {
    return (
        <div className=' grid place-items-center'>
            <div className=' mt-10'>
                <div className=' space-y-4'>
                    <h1 className=' text-center text-5xl'>Sign in</h1>
                    <p className=' text-center text-[#5CB85C]'>Need an account?</p>
                </div>
                <div className=' space-y-6 pt-4 px-2 lg:px-0'>
                    <input placeholder='Email' className=' outline-none py-4 px-5  border border-[#dddddd] w-full rounded-[5px]' />
                    <input placeholder='Password' className=' outline-none py-4 px-5  border border-[#dddddd] w-full rounded-[5px]' />
                    <input placeholder='Password' className=' outline-none py-4 px-5  border border-[#dddddd] w-full rounded-[5px]' />
                    <div className=' flex justify-end py-2'>
                        <button className=' bg-[#5CB85C] text-[white] py-4 text-xl px-8 rounded-[5px] flex'>Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;