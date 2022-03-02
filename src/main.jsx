import {render} from 'react-dom'
import React, {useCallback, useContext, useMemo, useReducer, useState} from "react"
import * as bootstrap from 'bootstrap'
import './style.scss'
import {List} from './List'
import {Counter} from './useState'
import {useFetch, useToggle} from "./custom-hooks"
import {MemoCallback} from "./useMemo-useCallback"
import {Input} from "./useRef";
import {LayoutEffect} from "./useLayoutEffect";
import {init, reducer} from "./useReducer";
import {Header, GetFormContext, ThemeContext, THEMES} from "./useContext";
import button from "bootstrap/js/src/button";
import {PortalCard} from "./Portal";
import {Tabs, Tab} from "./Tabs";
import {ErrorBoundary} from "./ErrorBoundary";

function TodoList() {

    const [todos, loading] = useFetch('https://jsonplaceholder.typicode.com/todos?_limit=20')

    if (loading)
    {
        return 'Loading...'
    }

    return <ul className="list-group mb-3">{todos.map(t => <li className="list-group-item" key={t.id}>{t.title}</li>)}</ul>
}

function PostList() {

    const [items, loading] = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=20')

    if (loading)
    {
        return 'Loading...'
    }

    return <table className="table table-dark table-hover">
        <thead>
            <tr>
                <th>Title</th>
                <th>Content</th>
            </tr>
        </thead>
        <tbody>
            {items.map(item => <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.body}</td>
            </tr> )}
        </tbody>
    </table>
}

function Content() {

    const [counterState, toggle] = useToggle(true)
    const [count, dispatcher] = useReducer(reducer, 0, init)

    return <div className="container mt-5">

        <div className="mb-3">
            <Tabs>
                {[...new Array(2)].map((v, k) => (
                    <Tab title={`Tab Number ${k}`} key={k}>Tab Number {k}</Tab>
                ))}
                <Tab title="First Tab">First Tab</Tab>
                <Tab title="Second Tab">Second Tab</Tab>
            </Tabs>
        </div>

        <div className="mb-3">
            <GetFormContext />
        </div>

        <ErrorBoundary>
            <div className="mb-3">
                <PortalCard />
            </div>
        </ErrorBoundary>


        <div className="mb-3">
            <List />
        </div>

        <div className="mb-3">
            <div className="form-check mb-2">
                <input className="form-check-input" type="checkbox" onChange={toggle} checked={counterState} id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Show Counter:
                </label>
            </div>
            {counterState && <Counter />}
        </div>

        <div className="mb-3">
            <MemoCallback />
        </div>

        <div className="mb-3">
            <Input />
        </div>

        <div className="mb-3">
            <LayoutEffect />
        </div>

        <div className="mb-3">
            <p>Counter : {JSON.stringify(count)}</p>
            <div className="btn-group" role="group" aria-label="...">
                <button onClick={() => dispatcher({type: 'inc'})} className="btn btn-info">+</button>
                <button onClick={() => dispatcher({type: 'dec'})} className="btn btn-info">-</button>
                <button onClick={() => dispatcher({type: 'inc', payload: 10})} className="btn btn-info">+ 10</button>
                <button onClick={() => dispatcher({type: 'reset'})} className="btn btn-info">Reset</button>
            </div>
        </div>

        <div>
            <TodoList />
            <PostList />
        </div>

    </div>
}

function App() {

    const [theme, setTheme] = useState('light')
    const toggleTheme = useCallback(function () {
        setTheme(t => t === 'light' ? 'dark' : 'light')
    })

    //const currentTheme = theme === 'light' ? THEMES.light : THEMES.dark

    const value = useMemo(function () {
        return {
            theme: theme === 'light' ? THEMES.light : THEMES.dark,
            toggleTheme
        }
    }, [toggleTheme, theme])

    return <ThemeContext.Provider value={value}>
        <Header currentTheme={theme}>
            Hooks
        </Header>
        <Content />
    </ThemeContext.Provider>
}

render(
    <App />,
    document.getElementById('app')
)