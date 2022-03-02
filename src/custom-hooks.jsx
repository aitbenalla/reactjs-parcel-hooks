import {useEffect, useState} from "react";

export function useInc(init = 0, step = 1) {
    const [count, setCount] = useState(init);

    const inc = function () {
        setCount(c => c + step)
    }

    return [count, inc]
}

export function useToggle(init = true) {
    const [value, setValue] = useState(init)
    const toggle = function () {
        setValue(v => !v)
    }
    return [value,toggle]
}

export function useAutoInc(init = 0, step = 1) {
    const [count, inc] = useInc(init, step)

    useEffect(() => {
        const timer = window.setInterval(() => {
            inc()
        }, 1000)

        return function () {
            clearInterval(timer)
        }
    }, [])

    return count
}

export function useFetch(url) {
    const [state, setState] = useState({
        items: [],
        loading: true
    })

    useEffect(function () {
        (async function() {
            const response = await fetch(url)
            const responseData = await response.json()

            if (response.ok){
                setState({
                    items: responseData,
                    loading: false
                })
            }
            else {
                console.log(JSON.stringify(responseData))
                setState(s => ({...s, loading: false}))
            }
        })()
    }, [])

    return ([
        state.items,
        state.loading
    ])
}