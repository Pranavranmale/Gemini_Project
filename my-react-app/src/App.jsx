import { use, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { URL } from './constant'
import Answers from './Components/Answers'

function App() {
  const [question, setQuestion] = useState("")
  const [result, setresult] = useState([])
  const[selectedHistory,setSelectedHistory]=useState('')
  const [resentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')))
  const scrollToAns=useRef()

  const askQuestion = async () => {
    if(!question && !selectedHistory){
      return false
    }
    if(question){ //use this for if user ask form input fild than you it can store massge in localstorage 
      
      if (localStorage.getItem('history')) {
        let history = JSON.parse(localStorage.getItem('history'))
        history = history.slice(0,19);
        history = [question, ...history]
        history = history.map((item)=>
        item.charAt(0).toUpperCase()+item.slice(1).trim());
       history = [...new Set(history)];
        localStorage.setItem('history', JSON.stringify(history))
        setRecentHistory(history)
      } else {
        localStorage.setItem('history', JSON.stringify([question]))
        setRecentHistory([question])
    }
    
  }
   const payloadData = question ? question : selectedHistory
      const paylode = {
    "contents": [{
        "parts": [{"text": payloadData }]
      }]
    }
    let res = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(paylode)
    })
    res = await res.json();
    let dataString = res.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ")
    dataString = dataString.map((item) => item.trim("/"))
    console.log(dataString);
    // console.log(res.candidates[0].content.parts[0].text);
    // setresult(res.candidates[0].content.parts[0].text)
    setresult([...result, { type: 'q', text: question?question:selectedHistory}, { type: 'a', text: dataString }])
    setQuestion("")
    setTimeout(()=>{
        scrollToAns.current.scrollTop=scrollToAns.current.scrollHeight
    },500)
  }
  const clearHistory=()=>{
    localStorage.clear()
    setRecentHistory([])
  }
  const isEnter =(e)=>{
    if(e.key=='Enter'){
      askQuestion();
    }
  }
  useEffect(()=>{
    console.log(selectedHistory)
    askQuestion()
},[selectedHistory])
  return (
    <div className='grid grid-cols-5 h-screen text-center'>
      <div className='col-span-1 bg-zinc-800 pt-3'>
        <h1 className='text-xl text-white flex justify-center space-x-2 '><span>Recent Search  </span>
          <button onClick={()=>clearHistory()} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg></button>
        </h1>
        <ul className='text-left overflow-auto mx-5 mt-2'>
          {
          resentHistory && resentHistory.map((item,index)=>(
            <li key={index} onClick={()=>setSelectedHistory(item)} className='p-1 pl-10 truncate text-zinc-500 cursor-pointer hover:bg-zinc-700 hover:text-zinc-200'>{item}</li>
          ))
        }
        </ul>
      </div>
      <div className='col-span-4 p-10 '>
        <div ref={scrollToAns} className='container h-110 overflow-scroll overflow-x-hidden no-scrollbar'>
          <div className='text-zinc-300 '>
            <ul>
              {
                result.map((item, index) => (
                  <div key={index + Math.random()} className={item.type == 'q' ? 'flex justify-end' : ''}>
                    {
                      item.type == 'q' ?
                        <li key={index + Math.random()} className='text-right p-1 border-8  bg-zinc-700 border-zinc-700  rounded-tl-3xl  rounded-br-3xl rounded-bl-3xl w-fit'><Answers ans={item.text} totalResult={1} type={item.type} index={index} /></li> : item.text.map((ansItem, ansIndex) => (
                          <li key={index + Math.random()} className='text-left p-1'><Answers ans={ansItem} type={item.type} totalResult={item.length} index={ansIndex} /></li>
                        ))
                    }
                  </div>
                ))
              }
            </ul>
          </div>
        </div>
        <div className='bg-zinc-800 w-1/2 p-1  text-white m-auto rounded-4xl border border-zinc-700 flex h-16 pr-5 '>
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} 
          onKeyDown={isEnter}
          className='w-full h-full p-3 outline-none' placeholder='Ask me anything' />
          <button onClick={askQuestion}>Ask</button>
        </div>
      </div>
    </div>
  )
}
export default App