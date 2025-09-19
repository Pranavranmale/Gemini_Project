import Answers from "./Answers";

export default function QueAns({item,index}){
    return(<>
        <div key={index + Math.random()} className={item.type == 'q' ? 'flex justify-end' : ''}>
                    {
                      item.type == 'q' ?
                        <li key={index + Math.random()} className='text-right p-1 md:p-2 border-4 md:border-8 dark:bg-zinc-700  dark:border-zinc-700  rounded-tl-3xl  rounded-br-3xl rounded-bl-3xl w-fit max-w-full bg-red-100 border-red-100'><Answers ans={item.text} totalResult={1} type={item.type} index={index} /></li> : item.text.map((ansItem, ansIndex) => (
                          <li key={index + Math.random()} className='text-left p-1 max-w-full'><Answers ans={ansItem} type={item.type} totalResult={item.length} index={ansIndex} /></li>
                        ))
                    }
                  </div>
    </>)
}