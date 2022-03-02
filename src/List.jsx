import React, { useState, useCallback } from "react";

export function List() {

    const [items, setItems] = useState([1,2,3]);

    const handleClick = useCallback(() => {
        setItems([...items, items.length + 1])
    })

    return <>
        <ul className="list-group mb-2">
            {items.map(i => <li className="list-group-item" key={i}>Item {i}</li>)}
        </ul>
        <button className="btn btn-info" onClick={handleClick}>Add New Item</button>
    </>
}