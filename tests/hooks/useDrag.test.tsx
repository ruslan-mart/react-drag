import React, { useRef } from 'react';
import { fireEvent, render } from '@testing-library/react';

import { useDrag } from '../../src';

test('Check on container only', () => {
  const handleDragMock = jest.fn();
  const handleDragEndMock = jest.fn();
  const handleDragStartMock = jest.fn();

  const Component = () => {
    const containerRef = useRef(null);

    useDrag({
      containerRef,
      onDrag: handleDragMock,
      onDragEnd: handleDragEndMock,
      onDragStart: handleDragStartMock,
    });

    return (
      <div ref={containerRef} style={{ position: 'absolute' }}>
        Some text
      </div>
    );
  };

  const renderResult = render(<Component />);

  const element = renderResult.getByText('Some text');

  fireEvent.mouseDown(element, {
    button: 0,
    clientX: 0,
    clientY: 0,
  });

  fireEvent.mouseMove(document, {
    clientX: 0,
    clientY: 0,
  });

  fireEvent.mouseUp(document);

  expect(handleDragStartMock).toHaveBeenCalledTimes(1);
  expect(handleDragMock).toHaveBeenCalledTimes(1);
  expect(handleDragEndMock).toHaveBeenCalledTimes(1);
});

test('Check with disabled state', () => {
  const handleDragMock = jest.fn();
  const handleDragEndMock = jest.fn();
  const handleDragStartMock = jest.fn();

  const Component = () => {
    const containerRef = useRef(null);

    useDrag({
      containerRef,
      disabled: true,
      onDrag: handleDragMock,
      onDragEnd: handleDragEndMock,
      onDragStart: handleDragStartMock,
    });

    return (
      <div ref={containerRef} style={{ position: 'absolute' }}>
        Some text
      </div>
    );
  };

  const renderResult = render(<Component />);

  const element = renderResult.getByText('Some text');

  fireEvent.mouseDown(element, {
    button: 0,
    clientX: 0,
    clientY: 0,
  });

  fireEvent.mouseMove(document, {
    clientX: 0,
    clientY: 0,
  });

  fireEvent.mouseUp(document);

  expect(handleDragStartMock).toHaveBeenCalledTimes(0);
  expect(handleDragMock).toHaveBeenCalledTimes(0);
  expect(handleDragEndMock).toHaveBeenCalledTimes(0);
});

test('Check on target', () => {
  const handleDragMock = jest.fn();
  const handleDragEndMock = jest.fn();
  const handleDragStartMock = jest.fn();

  const Component = () => {
    const containerRef = useRef(null);
    const targetRef = useRef(null);

    useDrag({
      containerRef,
      onDrag: handleDragMock,
      onDragEnd: handleDragEndMock,
      onDragStart: handleDragStartMock,
      targetRefList: [targetRef],
    });

    return (
      <div ref={containerRef} style={{ position: 'absolute' }}>
        <div ref={targetRef}>Some text</div>
      </div>
    );
  };

  const renderResult = render(<Component />);

  const element = renderResult.getByText('Some text');

  fireEvent.mouseDown(element, {
    button: 0,
    clientX: 0,
    clientY: 0,
  });

  fireEvent.mouseMove(document, {
    clientX: 0,
    clientY: 0,
  });

  fireEvent.mouseUp(document);

  expect(handleDragStartMock).toHaveBeenCalledTimes(1);
  expect(handleDragMock).toHaveBeenCalledTimes(1);
  expect(handleDragEndMock).toHaveBeenCalledTimes(1);
});

test('Check on not target', () => {
  const handleDragMock = jest.fn();
  const handleDragEndMock = jest.fn();
  const handleDragStartMock = jest.fn();

  const Component = () => {
    const containerRef = useRef(null);
    const notTargetRefList = useRef(null);
    const targetRef = useRef(null);

    useDrag({
      containerRef,
      notTargetRefList: [notTargetRefList],
      onDrag: handleDragMock,
      onDragEnd: handleDragEndMock,
      onDragStart: handleDragStartMock,
      targetRefList: [targetRef],
    });

    return (
      <div ref={containerRef} style={{ position: 'absolute' }}>
        <div ref={targetRef}>
          <div ref={notTargetRefList}>Some text</div>
        </div>
      </div>
    );
  };

  const renderResult = render(<Component />);

  const element = renderResult.getByText('Some text');

  fireEvent.mouseDown(element, {
    button: 0,
    clientX: 0,
    clientY: 0,
  });

  fireEvent.mouseMove(document, {
    clientX: 0,
    clientY: 0,
  });

  fireEvent.mouseUp(document);

  expect(handleDragStartMock).toHaveBeenCalledTimes(0);
  expect(handleDragMock).toHaveBeenCalledTimes(0);
  expect(handleDragEndMock).toHaveBeenCalledTimes(0);
});
