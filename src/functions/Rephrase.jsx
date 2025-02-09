import React from 'react'
import OpenAI from 'openai'
//import {paragraphIcon} from '../assets'

import paragraphIcon from "../assets/paragraphIcon.png";


const _apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
	apiKey: _apiKey,
	dangerouslyAllowBrowser: true
})

const Rephrase = () => {

  	const [paragraph, setParagraph] = React.useState({
		para: '',
		rephrase:''
	})

	const [style, setStyle] = React.useState("")

	function handleSubmit(){
		
	}


	return (
		<section className='w-full max-w-xl mt-16 h-100'>
			<div className='flex flex-col w-full gap-2'>
				<form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
					<div className='relative w-full'>
						<img src={paragraphIcon} className='absolute left-0 my-3 ml-3 w-5'/>
						<textarea id="description" name="description" placeholder='Your paragraph here...' required className='paragraph_input peer h-40'
						value={paragraph.para} 
						onChange={(e) => setParagraph(prev =>({
							...prev,
							para: e.target.value
						}))}></textarea>
						<button className='submit_btn h-10 justify-center peer-focus:border-gray-700  peer-focus:text-gray-700'>
							⏎ 
						</button>
					</div>
					<div className='flex mt-10 w-full font-satoshi font-medium formality-group gap-8 justify-center items-center' aria-label="Basic radio toggle button group">
						<h2 className='font-bold'>Formality</h2>

						<input type="radio" name="formality" id="casual" className='hidden'/>
						<label htmlFor="casual">
							<span class="icon">👕</span>
							Casual
						</label>

						<input type="radio" name="formality" id="neutral" className='hidden' defaultChecked/>
						<label htmlFor="neutral">
							<span class="icon">😐</span>
							Neutral
						</label>

						<input type="radio" name="formality" id="formal" className='hidden'/>
						<label htmlFor="formal">
							<span class="icon">👔</span>
							Formal
						</label>
					</div>

					<div className='flex my-10 w-full font-satoshi font-medium tone-group gap-8 justify-center items-center' aria-label="Basic checkbox toggle button group">
						<h2 className='font-bold'>Tone</h2>

						<label class="tone-option">
							<input type="checkbox" name="tone" value="personable" className='hidden' defaultChecked/>
							<span class="icon">😊</span>
							Personable
						</label>

						<label class="tone-option">
							<input type="checkbox" name="tone" value="confident" className='hidden'/>
							<span class="icon">🤝</span>
							Confident
						</label>

						<label class="tone-option">
							<input type="checkbox" name="tone" value="empathetic" className='hidden'/>
							<span class="icon">😇</span>
							Empathetic
						</label>

						<label class="tone-option">
							<input type="checkbox" name="tone" value="engaging" className='hidden'/>
							<span class="icon">🤩</span>
							Engaging
						</label>

						<label class="tone-option">
							<input type="checkbox" name="tone" value="witty" className='hidden'/>
							<span class="icon">😂</span>
							Witty
						</label>

						<label class="tone-option">
							<input type="checkbox" name="tone" id="direct" className='hidden'/>
							<span class="icon">🎯</span>
							Direct
						</label>
					</div>


				</form>
			</div>
		</section>
	)
}

export default Rephrase