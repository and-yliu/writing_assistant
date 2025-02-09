import React from 'react'
import {linkIcon, loader} from '../assets'
import OpenAI from 'openai'

const _apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
	apiKey: _apiKey,
	dangerouslyAllowBrowser: true
})

const Summarize = () => {
	
	const [website, setWebsite] = React.useState({
		url: '',
		summary:''
	})

	const [allWebsite, setAllWebsite] = React.useState([])
	const [waiting, setWaiting] = React.useState(false)

	React.useEffect(()=>{
        const websiteLocal = JSON.parse(localStorage.getItem('website'))

        if(websiteLocal){
            setAllWebsite(websiteLocal)
        }
    }, [])

	let err = false

	async function handleSubmit(e){
		try {
			e.preventDefault()
			//setWaiting(true)
			err = false

			const messages = [
				{
					role: 'system',
					content: 'You are a helpful assistant. You need to summarize articles within 100 words given their URLs.'
				},
				{
					role: 'user',
					content: website.url
				}
			]

			const response = await openai.chat.completions.create({
				model: 'gpt-4o-mini',
				messages: messages
			})

			const summary = response.choices[0].message.content
			if(summary){
				const newWebsite={...website, summary: summary}
				const updatedAllWebsite = [newWebsite, ...allWebsite]

				setWebsite(newWebsite)
				setAllWebsite(updatedAllWebsite)

				localStorage.setItem('website', JSON.stringify(updatedAllWebsite))
			}

		}catch (error) {
			err = true;
		}finally {
			setWaiting(false);
		}
	}


	return (
		<section className='w-full max-w-xl mt-16'>
			<div className='flex flex-col w-full gap-2'>
				<form onSubmit={handleSubmit} className='flex justify-center items-center relative'>
					<img src={linkIcon} className='absolute left-0 my-2 ml-3 w-5'/>
					<input id="url" name='url' type='url' placeholder='https://example.com' required className='url_input peer'
						value={website.url} 
						onChange={(e) => setWebsite(prev =>({
							...prev,
							url: e.target.value
						}))}
					/>
					<button className='submit_btn peer-focus:border-gray-700  peer-focus:text-gray-700'>
						⏎ 
					</button>
				</form>
				<div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                    {allWebsite.map((web, index) => (
                        <div key={`link-${index}`} onClick={()=>setWebsite(web)} className='link_card'>
                            <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                                {web.url}
                            </p>
                        </div>
                    ))}
                </div>
			</div>

			<div className='my-10 max-w-full flex justify-center items-center'>
				{waiting? (
                    <img src={loader} alt='loader' className='w-20 h-20 object-contain'/>
                ):err? (
					<p className='font-inter font-bold text-black text-center'>
						Hmm... That was not supposed to happen. Please try again....
					</p>
				):(
					website.summary && <article className='flex flex-col gap-3'>
                        <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                            Article <span className='red_gradient'>Summary</span>
                        </h2>
                        <div className='summary_box'>
                            <p className='font-inter font-medium text-sm text-gray-700'>
                                {website.summary}
                            </p>
                        </div>
                    </article>
				)}
			</div>
		</section>
	)
}

export default Summarize