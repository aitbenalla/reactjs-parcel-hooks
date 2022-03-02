import React, {createContext, useCallback, useContext, useState} from "react";

export const THEMES = {
    dark: {
        background: '#000',
        color: '#fff'
    },
    light: {
        background: '#fff',
        color: '#000'
    }
}

export const ThemeContext = React.createContext({
    theme: THEMES.dark,
    toggleTheme: () => {
    }
})

export class HeaderClass extends React.Component {
    render() {
        const {children} = this.props
        const value = this.context
        return <nav className="navbar mb-5" style={value}>
            <div className="container-fluid">
                <span>{children}</span>
            </div>
        </nav>
    }
}

HeaderClass.contextType = ThemeContext

export function Header({children,currentTheme}) {
    const {theme} = useContext(ThemeContext)
    return <nav className="navbar mb-3" style={theme}>
        <div className="container-fluid">
            <span>{children}</span>
            <Switcher currentTheme={currentTheme} />
        </div>
    </nav>

    /*return <ThemeContext.Consumer>
        {value => {
            return <nav className="navbar mb-5" style={value}>
                <div className="container-fluid">
                    <span>{children}</span>
                </div>
            </nav>
        }}
    </ThemeContext.Consumer>*/
}

function Switcher ({currentTheme}) {
    const {toggleTheme} = useContext(ThemeContext)
    return <button onClick={toggleTheme} className="btn btn-light">{currentTheme === 'light' ? 'Dark' : 'Light'} Mode</button>
}

const FormContext = createContext({})

function Form({defaultValue, onSubmit, children}) {

    const [data, setData] = useState(defaultValue)
    const change = useCallback(function (name, value) {
        setData(d => ({...d, [name]: value}))
    }, [])

    const value = {...data, change }

    const handleSubmit = useCallback(function (e) {
        e.preventDefault()
        onSubmit(value)
    }, [onSubmit, value])

    return <FormContext.Provider value={value}>
        <form onSubmit={handleSubmit}>
            {children}
        </form>
        {JSON.stringify(value)}
    </FormContext.Provider>
}

function FormField({name, children}) {

    const data = useContext(FormContext)
    const handleChange = useCallback(function (e) {
        data.change(e.target.name, e.target.value)
    }, [data.change])

    return <div className="mb-3">
        <label htmlFor={name}>{children}</label>
        <input type="text" name={name} id={name} className="form-control" value={data[name] || ''} onChange={handleChange}/>
    </div>
}

function Submit({children}) {
    return <button className="btn btn-info">{children}</button>
}

export function GetFormContext() {

    const handleSubmit = useCallback((value) => {
        console.log(value)
    }, [])

    return <Form defaultValue={{name: 'Ait Benalla', firstname: 'Oussama'}} onSubmit={handleSubmit}>
        <FormField name="name">Ait Benalla</FormField>
        <FormField name="firstname">Oussama</FormField>
        <Submit>Submit</Submit>
    </Form>
}