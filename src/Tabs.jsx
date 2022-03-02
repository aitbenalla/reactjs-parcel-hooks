import React, {useState} from "react";

export function Tabs({children}) {
    const childrenArray = React.Children.toArray(children)
    const [current, setCurrent] = useState(childrenArray[0].key)
    const newChildren = childrenArray.map(child => {
        return React.cloneElement(child, {selected: child.key === current})
    })
    return <div>
        <ul className="nav nav-tabs">
            {childrenArray.map(child => (
                <li className="nav-item" key={child.key}>
                    <button onClick={() => setCurrent(child.key)} className="nav-link active" aria-current="page" href="#">{child.props.title}</button>
                </li>
            ))}
        </ul>
        <section className="mt-3">
            {newChildren}
        </section>
    </div>


}

export function Tab({children, selected}) {
    return <div hidden={!selected }>
        {children}
    </div>
}