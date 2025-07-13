import React from 'react';

interface ErrorProps {
  error: string;
}

export class ErrorMessage extends React.Component<ErrorProps> {
  render() {
    const { error } = this.props;
    return <p className="error-message">{error}</p>;
  }
}
