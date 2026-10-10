import {
  Component,
  type ErrorInfo,
  type PropsWithChildren,
  type ReactNode,
} from "react";

type ErrorBoundaryProps = PropsWithChildren<{
  fallback?: ReactNode;
}>;

type ErrorBoundaryState = {
  error: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  // Called during render when a child throws → switch to the fallback UI
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  // Called after the fallback is committed → place for logging/reporting
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (error) {
      return this.props.fallback ?? <div>{error.message}</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
