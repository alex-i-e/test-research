import React, { ErrorInfo } from "react";

interface StateProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}
class ErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
  },
  StateProps
> {
  state: StateProps = { error: null, errorInfo: null };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
