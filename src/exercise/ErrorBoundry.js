import * as React from "react";

// this is same implementation as npm error boundary, can use that to replace this 
export class ErrorBoundry extends React.Component {
    constructor(props) {
        super(props)
        this.state = { error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {error: error};
      }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        // console.log(error);
    }

    render() {
        if (this.state.error) {
            return <this.props.FallbackComponent error={this.state.error} />
          }

        return this.props.children; 
    } 

}