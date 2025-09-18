import { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStarts } from "../Helper";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SyntaxHighlighter from "react-syntax-highlighter";
import ReactMarkdown from 'react-markdown'

export default function Answers({ ans, index, totalResult,type }) {
    const [heading, setHeading] = useState(false)
    const [answer, setAnswer] = useState(ans)
    
    useEffect(() => {
        if (checkHeading(ans)) {
            setHeading(true)
            setAnswer(replaceHeadingStarts(ans))
        }

    }, [])
    const renderer={

        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              style={dark}
              PreTag="div"
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      };
    
    return (
        <div>
            {
                //heading style
                index == 0 && totalResult >1 ? <span className="text-xl pt-2 block text-white">{answer}</span> : heading ? <span className={"pt-2 text-lg block text-white"}>{answer}</span>
                    : <span className={type=='q'?'pl-1':'pl-5'}>
                    <ReactMarkdown components={renderer}>{answer}</ReactMarkdown>
                    </span>

            }




        </div>
    )
}