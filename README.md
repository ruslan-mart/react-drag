# react-drag

<p align="center">
  <br>
  <br>
  <a href="#react-drag">
    <img alt="" src=".assets/logo.svg" width="600">
  </a>
</p>

<p align="center">
  <br>
  <br>
  <br>
  <sup>
    <a href="https://github.com/ruslan-mart/react-drag/actions/workflows/publish.yml">
      <img src="https://img.shields.io/github/workflow/status/ruslan-mart/react-drag/CI" alt="npm downloads" />
    </a>
    <a href="https://www.npmjs.com/package/@martdev/react-drag">
       <img src="https://img.shields.io/npm/v/@martdev/react-drag.svg" alt="npm package" />
    </a>
    <a href="https://www.npmjs.com/package/@martdev/react-drag">
       <img src="https://img.shields.io/npm/dw/@martdev/react-drag" alt="npm package" />
    </a>
  </sup>
</p>

---

## Description

This library will help you make your elements draggable inside React.

---

## Installation

```bash
npm install @martdev/react-drag
```

or yarn

```bash
yarn add @martdev/react-drag
```

---

## Syntax

### React Component
```tsx
draggableProps = {
  as?: keyof JSX.IntrinsicElements = 'div',
  disabled?: boolean = false,
  onDragStart?: (coords, nativeEvent) => boolean | void,
  onDrag?: (coords, nativeEvent) => boolean | newCoods | void,
  onDragEnd?: (coords, nativeEvent) => void,
}

targetProps = {
  as?: keyof JSX.IntrinsicElements = 'div',
}

notTargetProps = {
  as?: keyof JSX.IntrinsicElements = 'div',
}

<Draggable {...draggableProps}>
  <Target {...targetProps}>
    ...
  </Target>
  <NotTarget {...notTargetProps}>
    ...
  </NotTarget>
</Draggable>
```

---

### React Hook

```ts
{ isDragging: boolean } = useDrag({
  containerRef: RefObject<HTMLElement>,
  targetRefList?: [RefObject<HTMLElement>, ...] = [],
  notTargetRefList?: [RefObject<HTMLElement>, ...] = [],
  disabled?: boolean = false,
  onDragStart?: (coords, nativeEvent) => boolean | void,
  onDrag?: (coords, nativeEvent) => boolean | newCoods | void,
  onDragEnd?: (coords, nativeEvent) => void,
})
```

---

## API

### `<Draggable>` component

It is a container component that will be «draggable».

[See example](#draggable-usage)

#### `DraggableProps` properties (props)

Extends: `HTMLAttributes<HTMLElement>`, and it means it is capable to transmit any basic properties of HTML-elements (for example, `className`, `role`, `onClick`, `title`, etc.).

The list of props is below:

##### _`as`_

Optional prop that sets an element type (`div`, `span`, `img`, etc.).

Default value: `"div"`

##### _`disabled`_

Optional prop needed for enabling/disabling the element to be «draggable».

Use this prop if you need to disable the element to be «draggable» for some conditions.

Default value: `false`

##### _`onDragStart`_

Optional function that is an event handler and is called out before the start of «dragging».

It receives following arguments:
+ _`coords`_ — an array of two numeric values (`x`, `y`), and those contain information about the element's current position (in the moment of event's call).
+ _`nativeEvent`_ — a native event's object that is initialized after completion of `MouseEvent` or `TouchEvent` (depending on device's type). It should be used with caution. If you need to get `MouseEvent`'s props, you better specify condition `nativeEvent.type.startsWith('mouse')`.

Return value variants:
+ _`void`_ — the event will be executed with default values.
+ _`false`_ — use this if you need to abort the element's «dragging».

##### _`onDrag`_

Optional function that is an event handler and is called out in every change of element's position during its «dragging».

It receives following arguments:
+ _`coords`_ — an array of two numeric values (`x`, `y`), and those contain information about the element's current position (in the moment of event's call).
+ _`nativeEvent`_ — a native event's object that is initialized after completion of `MouseEvent` or `TouchEvent` (depending on device's type). It should be used with caution. If you need to get `MouseEvent`'s props, you better specify condition `nativeEvent.type.startsWith('mouse')`.

Return value variants:
+ _`void`_ — the event will be executed with default values.
+ _`false`_ — use this if you need to abort the element's «dragging».
+ _`newCoords`_ — an array of two numeric values (`x`, `y`), and those contain new values for element's position.

##### _`onDragEnd`_

Optional function that is an event handler and is called out after completion of element's «dragging».

It receives following arguments:
+ _`coords`_ — an array of two numeric values (`x`, `y`), and those contain information about the element's current position (in the moment of event's call).
+ _`nativeEvent`_ — a native event's object that is initialized after completion of `MouseEvent` or `TouchEvent` (depending on device's type). It should be used with caution. If you need to get `MouseEvent`'s props, you better specify condition `nativeEvent.type.startsWith('mouse')`.

Return value variants:
+ _`void`_ — the event will be executed with default values.
+ _there are no more value options available_

---

### `<Target>` component

A component that is a target area for «dragging» the container.

If this component does not exist, then «the target» is the container itself.

Use this component only inside `<Draggable>`, or else the error will happen.

[See example](#target-usage)

#### `TargetProps` properties

Extends: `HTMLAttributes<HTMLElement>`, and it means it is capable to transmit any basic props of HTML-elements (for example, `className`, `role`, `onClick`, `title`, etc.).

The list of props is below:

##### _`as`_

Optional prop that sets an element type (`div`, `span`, `img`, etc.).

Default value: `"div"`

---

### `<NotTarget>` component

This component is the exact opposite of `<Target>` component.

The main goal of this component is to give opportunity to ignore the container «dragging» if this action is used on specific/concrete element.

Use this component only inside `<Draggable>` or `<Target>`, or else the error will happen.

[See example](#nottarget-usage)

#### `NotTargetProps` properties

Extends: `HTMLAttributes<HTMLElement>`, and it means it is capable to transmit any basic props of HTML-elements (for example, `className`, `role`, `onClick`, `title`, etc.).

The list of props is below:

##### _`as`_

Optional prop that sets an element type (`div`, `span`, `img`, etc.).

Default value: `"div"`

---

### `useDrag` hook

This hook will give you opportunity to use the element's «dragging» without usage of integral components.

Use this hook if you want to interact with elements directly and if there is not enough functionality for integral components usage.

[See example](#usedrag-usage)

#### `UseDragProps`

An object with a list of props, which are stated below:

##### _`containerRef`_

Required prop, which value is a `ref` on container element that will be «draggable».

This value must be created with React hook `useRef` with reference on `HTMLElement`.

##### _`targetRefList`_

Optional prop — an array of `ref` references on elements which will be a target area for «dragging» the container.

This prop is an analogue of `<Target>` component.

Values of this prop must be created React's hook `useRef` with reference on `HTMLElement`.

##### _`notTargetRefList`_

Optional prop — an array of `ref` references on elements which will ignore «dragging» the container.

This prop is the opposite of `targetRefList` prop and is an analogue of `<NotTarget>` component

The main goal of this component is to give opportunity to ignore the container «dragging» if this action is used on specific/concrete element.

Values of this prop must be created with React hook `useRef` with reference on `HTMLElement`.

##### _`disabled`_

Optional prop needed for enabling/disabling the element to be «draggable».

Use this prop if you need to disable the element to be «draggable» for some conditions.

Default value: `false`

##### _`onDragStart`_

Optional function that is an event handler and is called out before the start of «dragging».

It receives following arguments:
+ _`coords`_ — an array of two numeric values (`x`, `y`), and those contain information about the element's current position (in the moment of event's call).
+ _`nativeEvent`_ — a native event's object that is initialized after completion of `MouseEvent` or `TouchEvent` (depending on device's type). It should be used with caution. If you need to get `MouseEvent`'s props, you better specify condition `nativeEvent.type.startsWith('mouse')`.

Return value variants:
+ _`void`_ — the event will be executed with default values.
+ _`false`_ — use this if you need to abort the element's «dragging».

##### _`onDrag`_

Optional function that is an event handler and is called out in every change of element's position during its «dragging».

It receives following arguments:
+ _`coords`_ — an array of two numeric values (`x`, `y`), and those contain information about the element's current position (in the moment of event's call).
+ _`nativeEvent`_ — a native event's object that is initialized after completion of `MouseEvent` or `TouchEvent` (depending on device's type). It should be used with caution. If you need to get `MouseEvent`'s props, you better specify condition `nativeEvent.type.startsWith('mouse')`.

Return value variant:
+ _`void`_ — the event will be executed with default values.
+ _`false`_ — use this if you need to abort the element's «dragging».
+ _`newCoords`_ — an array of two numeric values (`x`, `y`), and those contain new values for element's position.

##### _`onDragEnd`_

Optional function that is an event handler and is called out after completion of element's «dragging».

It receives following arguments:
+ _`coords`_ — an array of two numeric values (`x`, `y`), and those contain information about the element's current position (in the moment of event's call).
+ _`nativeEvent`_ — a native event's object that is initialized after completion of `MouseEvent` or `TouchEvent` (depending on device's type). It should be used with caution. If you need to get `MouseEvent`'s props, you better specify an condition `nativeEvent.type.startsWith('mouse')`.

Return value variants/options:
+ _`void`_ — the event will be executed with default values.
+ _there are no more value options available_

---

## Examples

### `<Draggable>` usage

A classic example without using `<Target>` and `<NotTarget>`.

There will be a small blue square that you can «drag» across the whole page.

[Watch demo](https://codepen.io/ruslan-mart/pen/YzaNxvx)

```css
.box {
  background-color: #a9def9;
  height: 100px;
  position: absolute;
  width: 100px;
}
```

```tsx
const App = () => {
  return (
    <Draggable className="box" />
  );
};
```

---

### `disabled` usage

Example with using `disabled` prop.

In 10 seconds after the square is displayed, «dragging» will be disabled.

[Watch demo](https://codepen.io/ruslan-mart/pen/JjLEyzE)

```css
.box {
  background-color: #a9def9;
  height: 100px;
  position: absolute;
  width: 100px;
}
```

```tsx
const App = () => {
  const [disabled, setDisabled] = useState(false);
  
  useEffect(() => {
    window.setTimeout(() => {
      setDisabled(true);
    }, 10000);
  }, []);
  
  return (
    <Draggable className="box" disabled={disabled} />
  );
};
```

---

### `<Target>` usage

Usage `<Target>` as the target element of «dragging».

In this example, «dragging» is possible only outside the «pink area».

[Watch demo](https://codepen.io/ruslan-mart/pen/vYRgJPp)

```css
.box {
  background-color: #a9def9;
  height: 100px;
  position: absolute;
  width: 100px;
}

.target {
  background-color: #e4c1f9;
  height: 30px;
}
```

```tsx
const App = () => {
  return (
    <Draggable className="box">
      <Target className="target" />
    </Draggable>
  );
};
```

---

### Multiple `<Target>` usage

Using three `<Target>` as the target element of «dragging».

In this example, «dragging» is possible only outside the «pink area».

[Watch demo](https://codepen.io/ruslan-mart/pen/ZExLJZY)

```css
.box {
  background-color: #a9def9;
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-between;
  position: absolute;
  width: 100px;
}

.target {
  background-color: #e4c1f9;
  height: 20px;
}
```

```tsx
const App = () => {
  return (
    <Draggable className="box">
      <Target className="target" />
      <Target className="target" />
      <Target className="target" />
    </Draggable>
  );
};
```

---

### `<Target>` as a text

Using `<Target>` as a text that will be the target of «dragging».

In this example, «dragging» is possible only after the word **«world»**.

[Watch demo](https://codepen.io/ruslan-mart/pen/GRxrvLd)

```css
.text {
  color: #333333;
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  white-space: nowrap;
}
```

```tsx
const App = () => {
  return (
    <Draggable className="text">
      Hello <Target as="span">world</Target>!
    </Draggable>
  );
};
```

---

### `<NotTarget>` usage

Using `<NotTarget>` for ignoring the «dragging».

In this example, «dragging» outside the «green area» is impossible.

[Watch demo](https://codepen.io/ruslan-mart/pen/WNzREWm)

```css
.box {
  background-color: #a9def9;
  height: 100px;
  position: fixed;
  width: 100px;
}

.target {
  background-color: #e4c1f9;
  height: 30px;
}

.not-target {
  background-color: #d0f4de;
  height: 30px;
  margin-left: auto;
  width: 30px;
}
```

```tsx
const App = () => {
  return (
    <Draggable className="box">
      <Target className="target">
        <NotTarget className="not-target" />
      </Target>
    </Draggable>
  );
};
```

---

### `onDrag` usage

Use an event handler `onDrag` to limit «dragging» on the area.

In this example, «dragging» is possible only within the browser's window.

[Watch demo](https://codepen.io/ruslan-mart/pen/gOegxJj)

```css
.box {
  background-color: #a9def9;
  height: 100px;
  position: fixed;
  width: 100px;
}

.target {
  background-color: #e4c1f9;
  height: 30px;
}
```

```tsx
const App = () => {
  const handleDrag = (coords) => {
    const [currentX, currentY] = coords;
    
    const newX = Math.max(0, Math.min(window.innerWidth - 100, currentX));
    const newY = Math.max(0, Math.min(window.innerHeight - 100, currentY));
    
    return [newX, newY];
  };

  return (
    <Draggable className="box" onDrag={handleDrag}>
      <Target className="target" />
    </Draggable>
  );
};
```

---

### `onDragStart` and `onDragEnd` usage

Use event handlers `onDragStart` and `onDragEnd` for determine status.

In this example, by «dragging» the element will change its color because of adding/deleting additional CSS-class.

[Watch demo](https://codepen.io/ruslan-mart/pen/rNdjzEx)

```css
.box {
  background-color: #a9def9;
  height: 100px;
  position: absolute;
  transition: background-color 0.3s ease-in;
  width: 100px;
}

.box-dragging {
  background-color: #e4c1f9;
}
```

```tsx
const App = () => {
  const [dragging, setDragging] = useState(false);
  
  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  return (
    <Draggable
      className={!dragging ? 'box' : 'box box-dragging'}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
};
```

---

### `useDrag` usage

Using `useDrag` hook to give the user possibility to «drag» the element.

In this example, «dragging» is possible only outside the «pink area».

If the status changes, its value is displayed in console.

[Watch demo](https://codepen.io/ruslan-mart/pen/vYRgJqd)

```css
.box {
  background-color: #a9def9;
  height: 100px;
  position: absolute;
  width: 100px;
}

.target {
  background-color: #e4c1f9;
  height: 30px;
}
```

```tsx
const App = () => {
  const containerRef = useRef(null);
  const targetRef = useRef(null);

  const { isDragging } = useDrag({
    containerRef,
    targetRefList: [targetRef],
  });

  useEffect(() => {
    console.log(
      `Current state value: ${isDragging ? 'dragging' : 'not dragging'}`
    );
  }, [isDragging]);

  return (
    <div className="box" ref={containerRef}>
      <div className="target" ref={targetRef} />
    </div>
  );
};
```
