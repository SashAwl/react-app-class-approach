import React from 'react';

export class Spinner extends React.Component {
  render() {
    return (
      <div
        className="flex flex-col justify-center items-center min-h-[200px] space-y-4"
        aria-label="Loading indicator"
      >
        <div className="w-16 h-16 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-blue-600 font-semibold text-lg">Loading...</p>
      </div>
    );
  }
}
