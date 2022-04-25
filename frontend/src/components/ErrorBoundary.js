import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="load-content">
          <h1>Something went wrong! Please refresh the page!</h1>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
