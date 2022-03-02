import React, {useCallback, useMemo, useState} from "react";

const Button = React.memo(function ({onClick,count}) {
    console.log('render')
    return <button className="btn btn-info" onClick={onClick}>Show Message {count}</button>
})

export function MemoCallback() {
    const [count, setCount] = useState(0)

    const handleClickMemo = useMemo(function () {
        return function () {
            alert('Hello Memo');
        }
    }, [])

    const handleClickCallback = useCallback(function () {
        setCount(c => c + 1)
    }, [count])

    return <Button onClick={handleClickCallback} count={count} />
}

