import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { Draggable, NotTarget, Target } from '../../src';

test('Check loads and displays text', () => {
  const renderResult = render(
    <Draggable>
      <NotTarget>Some text</NotTarget>
    </Draggable>
  );

  expect(renderResult.getByText('Some text')).toBeDefined();
});

test('Check without a container Draggable', () => {
  const spy = jest.spyOn(console, 'error');
  spy.mockImplementation(() => {});

  expect(() => render(<NotTarget />)).toThrow();

  spy.mockRestore();
});

test('Check default tagName', () => {
  const renderResult = render(
    <Draggable>
      <NotTarget>Some text</NotTarget>
    </Draggable>
  );

  expect(renderResult.getByText('Some text').tagName).toBe('DIV');
});

test('Check custom tagName', () => {
  const renderResult = render(
    <Draggable>
      <NotTarget as="button">Some text</NotTarget>
    </Draggable>
  );

  expect(renderResult.getByText('Some text').tagName).toBe('BUTTON');
});

test('Check className', () => {
  const renderResult = render(
    <Draggable>
      <NotTarget className="not-target">Some text</NotTarget>
    </Draggable>
  );

  expect(renderResult.getByText('Some text').classList.contains('not-target')).toBeDefined();
});

test('Check parent element', () => {
  const renderResult = render(
    <Draggable as="aside">
      <NotTarget>Some text</NotTarget>
    </Draggable>
  );

  expect(renderResult.getByText('Some text').parentElement!.tagName).toBe('ASIDE');
});

test('Check test id attribute', () => {
  const renderResult = render(
    <Draggable>
      <NotTarget data-testid="some value" />
    </Draggable>
  );

  expect(renderResult.getByTestId('some value')).toBeDefined();
});

test('Check drag on not target', () => {
  const handleDragMock = jest.fn();
  const handleDragEndMock = jest.fn();
  const handleDragStartMock = jest.fn();

  const renderResult = render(
    <Draggable
      onDrag={handleDragMock}
      onDragEnd={handleDragEndMock}
      onDragStart={handleDragStartMock}
      style={{ position: 'absolute' }}>
      <NotTarget>Some text</NotTarget>
    </Draggable>
  );

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

test('Check drag outside of not target', () => {
  const handleDragMock = jest.fn();
  const handleDragEndMock = jest.fn();
  const handleDragStartMock = jest.fn();

  const renderResult = render(
    <Draggable
      onDrag={handleDragMock}
      onDragEnd={handleDragEndMock}
      onDragStart={handleDragStartMock}
      style={{ position: 'absolute' }}>
      <NotTarget>Some text</NotTarget>
    </Draggable>
  );

  const element = renderResult.getByText('Some text');
  const container = element.parentElement!;

  fireEvent.mouseDown(container, {
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

test('Check drag on not target in target', () => {
  const handleDragMock = jest.fn();
  const handleDragEndMock = jest.fn();
  const handleDragStartMock = jest.fn();

  const renderResult = render(
    <Draggable
      onDrag={handleDragMock}
      onDragEnd={handleDragEndMock}
      onDragStart={handleDragStartMock}
      style={{ position: 'absolute' }}>
      <Target>
        <NotTarget>Some text</NotTarget>
      </Target>
    </Draggable>
  );

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
