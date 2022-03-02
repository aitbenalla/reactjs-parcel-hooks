import React from "react";

export class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {error: false}
    }

    static getDerivedStateFromError(error)
    {
        return {error: true}
    }

    /*componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
    }*/

    render() {
        if (this.state.error)
        {
            return <div className="alert alert-danger">
                Error!!
            </div>
        }
        return this.props.children
    }
}