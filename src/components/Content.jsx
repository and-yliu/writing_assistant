import React from 'react'
import Grammar from '../Functions/Grammar'
import Rephrase from '../Functions/Rephrase'
import Summarize from '../Functions/Summarize'

const Content = () => {
  const [func, setFunc] = React.useState("summarize")

  return (
    <>
      <form className="radio-group mt-10 w-full font-satoshi font-medium back">
        <input type="radio" id="radio1" name="radiogroup" value={1} defaultChecked/>
        <label htmlFor="radio1" onClick={() => setFunc("summarize")}>Summarize</label>

        <input type="radio" id="radio2" name="radiogroup" value={2}/>
        <label htmlFor="radio2" onClick={() => setFunc("rephrase")}>Rephrase</label>

        <input type="radio" id="radio3" name="radiogroup" value={3}/>
        <label htmlFor="radio3" onClick={() => setFunc("grammar")}>Grammar Check</label>
      </form>

      {
        func == "summarize"? <Summarize /> : func == "rephrase"? <Rephrase />: <Grammar />
      }

    </>
  )
}

export default Content