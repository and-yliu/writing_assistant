import React from 'react'
import {logo} from '../assets'

const Header = () => {

    function github(url){
        window.open(url);
    }

    return (
        <header className='w-full flex justify-center items-center flex-col'>
            <nav className='flex justify-between items-center w-full mb-10 pt-5'>
                <img src={logo} alt='logo' className='w-28 object-contain'/>
                <button className='black_btn' onClick={() => {github("https://github.com/and-yliu/writing_assistant")}}>
                    GitHub
                </button>
            </nav>
            <h1 className='head_text'>AI Writing Assistant with<br /> 
            <span className='blue_gradient'>OpenAI GPT-4</span></h1>
            <h2 className='desc'> Harness the power of Aritifical Intellgence to assist you 
                in your daily writing for summarizing, rephrasing, and grammar checks </h2>
        </header>
    )
}

export default Header