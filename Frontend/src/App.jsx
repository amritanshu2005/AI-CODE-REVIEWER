import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'prismjs/themes/prism-tomorrow.css'
import Prism from "prismjs"
import axios from "axios"
import Editor from "react-simple-code-editor"
import Markdown from "react-markdown"
import "highlight.js/styles/github.css"; 
import rehypeHighlight from 'rehype-highlight'
function App() {
  const [code, setcode] = useState(`function sum(){return 1+1}`)
  const [count, setCount] = useState(0)
  useEffect(()=>{
    Prism.highlightAll()
  },[])
  const [review, setreview] = useState(``)
 async function reviewcode(){
  const response=await axios.post('http://localhost:3000/ai/get-review',{code})
  setreview(response.data)
  }
  return (
    <>
     <main className='h-screen w-screen flex bg-[#2a2727]  p-1 gap-2 '>
      <div className="relative left w-1/2 h-full bg-[#000000] rounded-xl ">
        <div className="code w-full h-full ">
          <Editor
          value={code}
              onValueChange={code => setcode(code)}
              highlight={code => Prism.highlight(code, Prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                  color: "white", 
                  overflow: "auto",  
              }}
          />
        </div>
        <div className="review absolute bottom-1 right-1 select-none bg-pink-200 px-5 py-2 font-bold rounded-md text-black cursor-pointer" onClick={reviewcode}>Review</div>
      </div>
      <div className="right overflow-x-auto overflow-y-auto w-1/2 h-full bg-[#1e1e1e] rounded-xl text-gray-100 p-4 font-medium whitespace-pre-wrap ">
    <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown></div>
     </main>
    </>
  )
}

export default App
