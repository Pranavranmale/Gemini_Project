import { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStarts } from "../Helper";


export default function Answers({ ans, index, totalResult,type }) {
    const [heading, setHeading] = useState(false)
    const [answer, setAnswer] = useState(ans)
    
    useEffect(() => {
        if (checkHeading(ans)) {
            setHeading(true)
            setAnswer(replaceHeadingStarts(ans))
        }

    }, [])
    return (
        <div>
            {
                //heading style
                index == 0 && totalResult >1 ? <span className="text-xl pt-2 block text-white">{answer}</span> : heading ? <span className={"pt-2 text-lg block text-white"}>{answer}</span>
                    : <span className={type=='q'?'pl-1':'pl-5'}>{answer}</span>

            }




        </div>
    )
}