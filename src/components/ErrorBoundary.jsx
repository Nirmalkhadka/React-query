import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger text-center" role="alert">
          <p className="mb-2">Something went wrong!</p>
          <button
            onClick={() => {
              this.props.reset();
              this.setState({ hasError: false });
            }}
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;