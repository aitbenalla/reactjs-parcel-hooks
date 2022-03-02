import {useCallback, useLayoutEffect, useRef, useState} from "react";

export function LayoutEffect() {
    const [count, setCount] = useState(0)
    const button = useRef(null)

    const increment = useCallback(() => {
        setCount(c => c + 1)
    }, [])

    useLayoutEffect(() => {
        if (count % 2 === 0)
        {
            button.current.style.color = 'white'
        } else {
            button.current.style.color = 'green'
        }
    })

    return <button onClick={increment} ref={button} className="btn btn-info">Increment {count}</button>
}