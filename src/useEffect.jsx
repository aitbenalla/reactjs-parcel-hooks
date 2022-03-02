import {useEffect} from "react";

export function useEf(count, inc) {

    useEffect(() => {
        const timer = window.setInterval(() => {
            inc()
        }, 1000)

        return function () {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        document.title = 'Counter ' + count
    })
}