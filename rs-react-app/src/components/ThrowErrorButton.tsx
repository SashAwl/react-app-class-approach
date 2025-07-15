import React from 'react';

interface ThrowErrorProps {
  handleThrowError: () => void;
}

export class ThrowErrorButton extends React.Component<ThrowErrorProps> {
  render() {
    const { handleThrowError } = this.props;
    return <button onClick={handleThrowError}>Throw error</button>;
  }
}
