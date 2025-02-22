import React from 'react'
import OpenAI from 'openai'
import paragraphIcon from "../assets/paragraphIcon.png";
import ReactMarkdown from "react-markdown"
import Markdown from 'react-markdown';

const _apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
	apiKey: _apiKey,
	dangerouslyAllowBrowser: true
})

const Grammar = () => {
  const [paragraph, setParagraph] = React.useState({
		para: '',
		grammar:''
	})

	const [allParagraph, setAllParagraph] = React.useState([])
	const [waiting, setWaiting] = React.useState(false)

	let err = false

	async function handleSubmit(e){
		try {
			e.preventDefault()
			//setWaiting(true)
			err = false

			const messages = [
				{
					role: 'system',
					content: 'You are a helpful assistant. You need point out grammar mistakes in the input paragraph and offers suggestions.'
				},
				{
					role: 'user',
					content: `Paragraph: ${paragraph.para}. Output as a list in markdown format.`
				}
			]

			const response = await openai.chat.completions.create({
				model: 'gpt-4o-mini',
				messages: messages
			})

			const grammar = response.choices[0].message.content
			if(grammar){
				const newParagraph={...paragraph, grammar: grammar}
				const updatedAllParagraph = [newParagraph, ...allParagraph]

				setParagraph(newParagraph)
				//setAllParagraph(updatedAllParagraph)

				localStorage.setItem('grammar', JSON.stringify(updatedAllParagraph))
			}

		}catch (error) {
			err = true;
		}finally {
			setWaiting(false);
		}
	}

	React.useEffect(()=>{
        const projectLocal = JSON.parse(localStorage.getItem('grammar'))

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
				</form>

				<div className='my-10 max-w-full flex justify-center items-center'>
					{waiting? (
						<img src={loader} alt='loader' className='w-20 h-20 object-contain'/>
					):err? (
						<p className='font-inter font-bold text-black text-center'>
							Hmm... That was not supposed to happen. Please try again....
						</p>
					):(
						paragraph.grammar && <article className='flex flex-col gap-3'>
							<h2 className='font-satoshi font-bold text-gray-600 text-xl'>
								Grammar <span className='red_gradient'>Suggestions</span>
							</h2>
							<div className='summary_box'>
								<p className='font-inter font-medium text-sm text-gray-700'>
                  <Markdown>{paragraph.grammar}</Markdown>
								</p>
							</div>
						</article>
					)}
				</div>
			</div>
		</section>
	)
}

export default Grammar