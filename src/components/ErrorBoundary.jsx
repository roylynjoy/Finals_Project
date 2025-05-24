import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#FAFAFF] text-center px-8">
          <div className="bg-white border border-[#D3CECE] shadow-md p-10 rounded-xl max-w-md">
            <h1 className="text-[30px] font-bold text-[#E70000] mb-4">Something went wrong</h1>
            <p className="text-[20px] text-[#3F3F46]">We're working on it. Please try again later.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
