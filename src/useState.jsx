import React, {useState} from "react";
import {useEf} from "./useEffect";
import {useAutoInc, useInc} from "./custom-hooks";

function useIncr(init, step)
{
    const [count, setCount] = useState(init)
    const inc = () => {
        setCount(c => c + step)
    }
    return [count, inc]
}

export function Counter()
{
    //const [count, inc] = useInc(10)
    //useEf(count, inc);
    const count = useAutoInc(10)
    return <button className="btn btn-info">Counter {count}</button>
    //return <button onClick={inc}>Counter {count}</button>
}
