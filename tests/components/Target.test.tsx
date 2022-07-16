import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { Draggable, Target } from '../../src';

const waitRAF = () => new Promise((resolve) => requestAnimationFrame(resolve));

test('Check loads and displays text', () => {
  const renderResult = render(
    <Draggable>
      <Target>Some text</Target>
    </Draggable>
  );

  expect(renderResult.getByText('Some text')).toBeDefined();
});

test('Check without a container Draggable', () => {
  const spy = jest.spyOn(console, 'error');
  spy.mockImplementation(() => {});

  expect(() => render(<Target />)).toThrow();

  spy.mockRestore();
});

test('Check default tagName', () => {
  const renderResult = render(
    <Draggable>
      <Target>Some text</Target>
    </Draggable>
  );

  expect(renderResult.getByText('Some text').tagName).toBe('DIV');
});

test('Check custom tagName', () => {
  const renderResult = render(
    <Draggable>
      <Target as="header">Some text</Target>
    </Draggable>
  );

  expect(renderResult.getByText('Some text').tagName).toBe('HEADER');
});

test('Check className', () => {
  const renderResult = render(
    <Draggable>
      <Target className="target">Some text</Target>
    </Draggable>
  );

  expect(renderResult.getByText('Some text').classList.contains('target')).toBeDefined();
});

test('Check parent element', () => {
  const renderResult = render(
    <Draggable as="section">
      <Target>Some text</Target>
    </Draggable>
  );

  expect(renderResult.getByText('Some text').parentElement!.tagName).toBe('SECTION');
});

test('Check test id attribute', () => {
  const renderResult = render(
    <Draggable>
      <Target data-testid="some value" />
    </Draggable>
  );

  expect(renderResult.getByTestId('some value')).toBeDefined();
});

test('Check drag by mouse events', async () => {
  const handleDragMock = jest.fn();
  const handleDragEndMock = jest.fn();
  const handleDragStartMock = jest.fn();

  const initialLeft = 50;
  const initialTop = 120;

  const moveX = 100;
  const moveY = 200;

  const startX = 80;
  const startY = 90;

  const renderResult = render(
    <Draggable
      onDrag={handleDragMock}
      onDragEnd={handleDragEndMock}
      onDragStart={handleDragStartMock}
      style={{ position: 'absolute', left: `${initialLeft}px`, top: `${initialTop}px` }}>
      <Target>Some text</Target>
    </Draggable>
  );

  const element = renderResult.getByText('Some text');
  const container = element.parentElement!;

  fireEvent.mouseDown(element, {
    button: 0,
    clientX: startX,
    clientY: startY,
  });

  fireEvent.mouseMove(document, {
    clientX: moveX,
    clientY: moveY,
  });

  fireEvent.mouseUp(document);

  await waitRAF();

  const currentLeft = parseFloat(container.style.left);
  const currentTop = parseFloat(container.style.top);

  const expectedValues = [initialLeft + moveX - startX, initialTop + moveY - startY];

  expect([currentLeft, currentTop]).toStrictEqual(expectedValues);

  expect(handleDragStartMock).toHaveBeenCalledTimes(1);
  expect(handleDragStartMock).toHaveBeenCalledWith(
    [initialLeft, initialTop],
    new MouseEvent('mousedown')
  );

  expect(handleDragMock).toHaveBeenCalledTimes(1);
  expect(handleDragMock).toHaveBeenCalledWith(expectedValues, new MouseEvent('mousemove'));

  expect(handleDragEndMock).toHaveBeenCalledTimes(1);
  expect(handleDragEndMock).toHaveBeenCalledWith(expectedValues, new MouseEvent('mouseup'));
});

test('Check drag by touch events', async () => {
  const handleDragMock = jest.fn();
  const handleDragEndMock = jest.fn();
  const handleDragStartMock = jest.fn();

  const initialLeft = 50;
  const initialTop = 120;

  const moveX = 100;
  const moveY = 200;

  const startX = 80;
  const startY = 90;

  const renderResult = render(
    <Draggable
      onDrag={handleDragMock}
      onDragEnd={handleDragEndMock}
      onDragStart={handleDragStartMock}
      style={{ position: 'absolute', left: `${initialLeft}px`, top: `${initialTop}px` }}>
      <Target>Some text</Target>
    </Draggable>
  );

  const element = renderResult.getByText('Some text');
  const container = element.parentElement!;

  fireEvent.touchStart(element, {
    touches: [
      {
        clientX: startX,
        clientY: startY,
      },
    ],
  });

  fireEvent.touchMove(document, {
    touches: [
      {
        clientX: moveX,
        clientY: moveY,
      },
    ],
  });

  fireEvent.touchEnd(document);

  await waitRAF();

  const currentLeft = parseFloat(container.style.left);
  const currentTop = parseFloat(container.style.top);

  const expectedValues = [initialLeft + moveX - startX, initialTop + moveY - startY];

  expect([currentLeft, currentTop]).toStrictEqual(expectedValues);

  expect(handleDragStartMock).toHaveBeenCalledTimes(1);
  expect(handleDragStartMock).toHaveBeenCalledWith(
    [initialLeft, initialTop],
    new TouchEvent('touchstart')
  );

  expect(handleDragMock).toHaveBeenCalledTimes(1);
  expect(handleDragMock).toHaveBeenCalledWith(expectedValues, new TouchEvent('touchmove'));

  expect(handleDragEndMock).toHaveBeenCalledTimes(1);
  expect(handleDragEndMock).toHaveBeenCalledWith(expectedValues, new TouchEvent('touchend'));
});

test('Check drag outside of target', () => {
  const handleDragMock = jest.fn();
  const handleDragEndMock = jest.fn();
  const handleDragStartMock = jest.fn();

  const renderResult = render(
    <Draggable
      onDrag={handleDragMock}
      onDragEnd={handleDragEndMock}
      onDragStart={handleDragStartMock}
      style={{ position: 'absolute' }}>
      <Target>Some text</Target>
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

  expect(handleDragStartMock).toHaveBeenCalledTimes(0);
  expect(handleDragMock).toHaveBeenCalledTimes(0);
  expect(handleDragEndMock).toHaveBeenCalledTimes(0);
});

test('Check for overwriting of coordinates from the handler', async () => {
  const handleDragMock = jest.fn();

  const initialLeft = 50;
  const initialTop = 120;

  const moveX = 100;
  const moveY = 200;

  const overwriteX = 300;
  const overwriteY = 400;

  const startX = 80;
  const startY = 90;

  handleDragMock.mockReturnValue([overwriteX, overwriteY]);

  const renderResult = render(
    <Draggable
      onDrag={handleDragMock}
      style={{ position: 'absolute', left: `${initialLeft}px`, top: `${initialTop}px` }}>
      <Target>Some text</Target>
    </Draggable>
  );

  const element = renderResult.getByText('Some text');
  const container = element.parentElement!;

  fireEvent.mouseDown(element, {
    button: 0,
    clientX: startX,
    clientY: startY,
  });

  fireEvent.mouseMove(document, {
    clientX: moveX,
    clientY: moveY,
  });

  fireEvent.mouseUp(document);

  await waitRAF();

  const currentLeft = parseFloat(container.style.left);
  const currentTop = parseFloat(container.style.top);

  expect([currentLeft, currentTop]).toStrictEqual([overwriteX, overwriteY]);
});

test('Check with disabled state', () => {
  const handleDragMock = jest.fn();
  const handleDragEndMock = jest.fn();
  const handleDragStartMock = jest.fn();

  const renderResult = render(
    <Draggable
      disabled
      onDrag={handleDragMock}
      onDragEnd={handleDragEndMock}
      onDragStart={handleDragStartMock}
      style={{ position: 'absolute' }}>
      <Target>Some text</Target>
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

test('Check for clicks of other mouse buttons', () => {
  const handleDragMock = jest.fn();
  const handleDragEndMock = jest.fn();
  const handleDragStartMock = jest.fn();

  const renderResult = render(
    <Draggable
      onDrag={handleDragMock}
      onDragEnd={handleDragEndMock}
      onDragStart={handleDragStartMock}
      style={{ position: 'absolute' }}>
      <Target>Some text</Target>
    </Draggable>
  );

  const element = renderResult.getByText('Some text');

  for (let button = 1; button <= 2; button++) {
    fireEvent.mouseDown(element, {
      button,
      clientX: 0,
      clientY: 0,
    });

    fireEvent.mouseMove(document, {
      clientX: 0,
      clientY: 0,
    });

    fireEvent.mouseUp(document);
  }

  expect(handleDragStartMock).toHaveBeenCalledTimes(0);
  expect(handleDragMock).toHaveBeenCalledTimes(0);
  expect(handleDragEndMock).toHaveBeenCalledTimes(0);
});

test('Check when position is not absolute and not fixed', () => {
  const handleDragMock = jest.fn();
  const handleDragEndMock = jest.fn();
  const handleDragStartMock = jest.fn();
  const consoleWarnMock = jest.spyOn(console, 'warn');

  consoleWarnMock.mockImplementation();

  const renderResult = render(
    <Draggable
      onDrag={handleDragMock}
      onDragEnd={handleDragEndMock}
      onDragStart={handleDragStartMock}
      style={{ position: 'relative' }}>
      <Target>Some text</Target>
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
  expect(consoleWarnMock).toHaveBeenCalledTimes(1);

  consoleWarnMock.mockRestore();
});
