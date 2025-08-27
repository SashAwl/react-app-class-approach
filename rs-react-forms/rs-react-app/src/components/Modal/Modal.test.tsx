import { render, screen } from '@testing-library/react';
import { Modal } from './Modal';
import React from 'react';

describe('Modal', () => {
  let modalRoot: HTMLElement;

  beforeEach(() => {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    document.body.removeChild(modalRoot);
  });

  test('Renders children into a portal', () => {
    render(
      <Modal>
        <p>Test module</p>
      </Modal>
    );

    expect(screen.getByText(/test module/i)).toBeInTheDocument();

    expect(modalRoot).toHaveTextContent(/Test module/i);
  });

  test('Returns null if modal-root is missing', () => {
    const { container } = render(
      <Modal>
        <span>Test</span>
      </Modal>
    );

    expect(container).toBeEmptyDOMElement();
  });

  test('Wraps the children in a div with the class modal-content', () => {
    render(
      <Modal>
        <button>Close</button>
      </Modal>
    );

    const wrapper = modalRoot.querySelector('.modal-content');
    expect(wrapper).not.toBeNull();
    expect(wrapper).toContainElement(
      screen.getByRole('button', { name: /close/i })
    );
  });
});
