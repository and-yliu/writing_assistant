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

	const [allParagraph, setAllParagraph] = React.useState([])
	const [waiting, setWaiting] = React.useState(false)

	const [formality, setFormality] = React.useState("neutral")
	const [tone, setTone] = React.useState(["personable"])

	let err = false

	async function handleSubmit(e){
		try {
			e.preventDefault()
			//setWaiting(true)
			err = false
			const formEl = e.currentTarget
    		const formData = new FormData(formEl)
			setTone(formData.getAll("tone"))
			// console.log(tone)
			// console.log(formality)
			// console.log(paragraph)

			const messages = [
				{
					role: 'system',
					content: 'You are a helpful assistant. You need to rephrase the input paragraph according to the formality level and tones given.'
				},
				{
					role: 'user',
					content: `Paragraph: ${paragraph.para} Rephrase with ${formality} formality, and these tones: ${tone.toString()}`
				}
			]

			const response = await openai.chat.completions.create({
				model: 'gpt-4o-mini',
				messages: messages
			})

			const rephrase = response.choices[0].message.content
			if(rephrase){
				const newParagraph={...paragraph, rephrase: rephrase}
				const updatedAllParagraph = [newParagraph, ...allParagraph]

				setParagraph(newParagraph)
				setAllParagraph(updatedAllParagraph)

				localStorage.setItem('paragraph', JSON.stringify(updatedAllParagraph))
			}

		}catch (error) {
			err = true;
		}finally {
			setWaiting(false);
		}
	}

	function checkTone(curTone){
		if(tone.includes(curTone)){
			setTone(prev => prev.filter(function(item) {
				return item !== curTone
			}))
		}else{
			setTone(prev => [...prev, curTone])
		}

	}

	React.useEffect(()=>{
        const projectLocal = JSON.parse(localStorage.getItem('paragraph'))

        if(projectLocal){
            setAllParagraph(projectLocal)
        }
    }, [])


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
					<div className='flex flex-col gap-1 max-h-60 overflow-y-auto w-full mt-2'>
						{allParagraph.map((paragraph, index) => (
							<div key={`link-${index}`} onClick={()=>setParagraph(paragraph)} className='link_card'>
								<p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
									{paragraph.para}
								</p>
							</div>
						))}
					</div>
					<div className='flex mt-10 w-full font-satoshi font-medium formality-group gap-8 justify-center items-center' aria-label="Basic radio toggle button group">
						<h2 className='font-bold'>Formality</h2>

						<input type="radio" name="formality" id="casual" onClick={() => setFormality("casual")} className='hidden'/>
						<label htmlFor="casual">
							<span>👕</span>
							Casual
						</label>

						<input type="radio" name="formality" id="neutral" onClick={() => setFormality("neutral")} className='hidden' defaultChecked/>
						<label htmlFor="neutral">
							<span >😐</span>
							Neutral
						</label>

						<input type="radio" name="formality" id="formal" onClick={() => setFormality("formal")} className='hidden'/>
						<label htmlFor="formal">
							<span>👔</span>
							Formal
						</label>
					</div>

					<div className='flex my-10 w-full font-satoshi font-medium tone-group gap-8 justify-center items-center' aria-label="Basic checkbox toggle button group">
						<h2 className='font-bold'>Tone</h2>

						<label>
							<input type="checkbox" name="tone" value="personable" onClick={() => checkTone("personable")} className='hidden' defaultChecked/>
							<span>😊</span>
							Personable
						</label>

						<label>
							<input type="checkbox" name="tone" value="confident" onClick={() => checkTone("confident")} className='hidden'/>
							<span>🤝</span>
							Confident
						</label>

						<label>
							<input type="checkbox" name="tone" value="empathetic" onClick={() => checkTone("empathetic")} className='hidden'/>
							<span>😇</span>
							Empathetic
						</label>

						<label>
							<input type="checkbox" name="tone" value="engaging" onClick={() => checkTone("engaging")} className='hidden'/>
							<span>🤩</span>
							Engaging
						</label>

						<label>
							<input type="checkbox" name="tone" value="witty" onClick={() => checkTone("witty")} className='hidden'/>
							<span>😂</span>
							Witty
						</label>

						<label>
							<input type="checkbox" name="tone" value="direct" onClick={() => checkTone("direct")} className='hidden'/>
							<span>🎯</span>
							Direct
						</label>
					</div>
				</form>

				<div className='my-10 max-w-full flex justify-center items-center'>
					{waiting? (
						<img src={loader} alt='loader' className='w-20 h-20 object-contain'/>
					):err? (
						<p className='font-inter font-bold text-black text-center'>
							Hmm... That was not supposed to happen. Please try again....
						</p>
					):(
						paragraph.rephrase && <article className='flex flex-col gap-3'>
							<h2 className='font-satoshi font-bold text-gray-600 text-xl'>
								Paragraph <span className='red_gradient'>Rephrase</span>
							</h2>
							<div className='summary_box'>
								<p className='font-inter font-medium text-sm text-gray-700'>
									{paragraph.rephrase}
								</p>
							</div>
						</article>
					)}
				</div>
			</div>
		</section>
	)
}


export default Rephrase