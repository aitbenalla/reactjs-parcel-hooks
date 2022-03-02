import {useEffect, useRef} from "react";

export function Input() {

    const input = useRef(null)

    const handleClick = function () {
        console.log(input.current.value)
    }

    return <div className="input-group mb-3">
        <input type="text" className="form-control" ref={input} aria-label="Recipient's username" aria-describedby="button-addon2" />
        <button onClick={handleClick} className="btn btn-info" type="button" id="button-addon2">Show Value</button>
    </div>
}