import { use, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { URL } from './constant'
import Answers from './Components/Answers'
import RecentSearch from './Components/RecentSearch'
import QueAns from './Components/QueAns'
import ThemeIcon from './Components/ThemeIcon'


function App() {
  const [question, setQuestion] = useState("")
  const [result, setresult] = useState([])
  const [selectedHistory, setSelectedHistory] = useState('')
  const [resentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')))
  const [loader, setLoader] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const scrollToAns = useRef()

  const askQuestion = async () => {
    if (!question && !selectedHistory) {
      return false
    }
    if (question) { //use this for if user ask form input fild than you it can store massge in localstorage 

      if (localStorage.getItem('history')) {
        let history = JSON.parse(localStorage.getItem('history'))
        history = history.slice(0, 19);
        history = [question, ...history]
        history = history.map((item) =>
          item.charAt(0).toUpperCase() + item.slice(1).trim());
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
        "parts": [{ "text": payloadData }]
      }]
    }
    setLoader(true)
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
    setresult([...result, { type: 'q', text: question ? question : selectedHistory }, { type: 'a', text: dataString }])
    setQuestion("")
    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight
    }, 500)
    setLoader(false)
  }

  const isEnter = (e) => {
    if (e.key == 'Enter') {
      askQuestion();
    }
  }
  //Dark Mood Feature
  const [DarkMood, setDarkMood] = useState('dark')
  useEffect(() => {
    console.log(DarkMood);
    if (DarkMood == 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

  }, [DarkMood])//[DarkMood] use for indtify the change
  useEffect(() => {
    console.log(selectedHistory)
    askQuestion()
  }, [selectedHistory])
  return (
    <div className={DarkMood == 'dark' ? 'dark' : 'light'}>
      <div className='grid md:grid-cols-5 h-screen text-center'>

        <div className={`md:block col-span-5 md:col-span-1 ${showHistory ? 'block' : 'hidden'}`}>
          <RecentSearch resentHistory={resentHistory} setRecentHistory={setRecentHistory} setSelectedHistory={setSelectedHistory} />
        </div>
        <div className='md:col-span-4 col-span-5 p-2 md:p-10 '>
          <button className='md:hidden' onClick={() => setShowHistory(!showHistory)}>{showHistory ? 'Hide History' : 'Show History'}</button>
          <div className='flex flex-col md:flex-row p-1 m-1 justify-between md:items-center'>
            <h1 className='text-2xl md:text-4xl md:p-1 md:m-1 bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700 m-1 p-1 order-2 md:order-1'>Hello User,Ask Me Anything</h1>
            <button onClick={() => setDarkMood(DarkMood === 'dark' ? 'light' : 'dark')} className='dark:text-white text-zinc-800 order-1 md:order-2 self-start md:self-auto m-1 p-1'>
              <ThemeIcon DarkMood={DarkMood} />
            </button>
          </div>
          {
            loader ? <div role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div> : null
          }

          <div ref={scrollToAns} className='container h-[70vh] md:h-110 overflow-scroll overflow-x-hidden no-scrollbar'>
            <div className='dark:text-zinc-300 text-zinc-800 '>
              <ul>
                {
                  result.map((item, index) => (
                    <QueAns key={index} item={item} index={index} />
                  ))
                }
              </ul>
            </div>
          </div>
          <div className='dark:bg-zinc-800 w-full md:w-1/2 p-1 bg-red-100 dark:text-white text-zinc-800 m-auto rounded-4xl border border-zinc-700 flex h-12 pr-5 '>
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={isEnter}
              className='w-full h-full p-3 outline-none' placeholder='Ask me anything' />
            <button onClick={askQuestion}>Ask</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
