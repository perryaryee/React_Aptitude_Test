import { Avatar, Divider } from '@mui/material';
import React from 'react';
import image from "../assets/demo-avatar.png";

const ArticleList = () => {
    return (
        <div>
            <div className=' flex items-center justify-between'>
                <div className=' flex items-center space-x-3'>
                    <Avatar src={image} />
                    <div>
                        <h1>Maksim Esteban</h1>
                        <p className=' text-[#dddddd]  font-thin'>January 4, 2025</p>
                    </div>
                </div>
                <div className=' flex items-center space-x-1 py-1 border border-[#5CB85C] px-2 rounded-[3px]'>
                    <svg color='#5CB85C' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                    <h1 className=' text-[#5CB85C]'>641</h1>
                </div>
            </div>
            <div className=' space-y-3 pt-3'>
                <h1 className=' text-2xl font-semibold'>Ill quantify the redundant TCP bus, that should hard drive the ADP bandwidth!</h1>
                <h1>Aut facilis qui. Cupiditate sit ratione eum sunt rerum impedit. Qui suscipit debitis et et voluptates voluptatem voluptatibus. Quas voluptatum quae corporis corporis possimus.</h1>
            </div>
            <div className=' flex items-center justify-between py-7'>
                <p>Read more...</p>
                <div className=' flex items-center space-x-2'>
                    <div className=' border border-gray-400 rounded-[20px] px-2'>
                        <p>Sit</p>
                    </div>
                    <div className=' border border-gray-400 rounded-[20px] px-2'>
                        <p>reiciendis</p>
                    </div>
                    <div className=' border border-gray-400 rounded-[20px] px-2'>
                        <p>consequentur</p>
                    </div>
                    <div className=' border border-gray-400 rounded-[20px] px-2'>
                        <p>nihil</p>
                    </div>
                </div>
            </div>
            <Divider />
        </div>
    )
}

export default ArticleList;