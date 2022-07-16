export const parseInitialCoords = (node: HTMLElement) => {
  const { left, top } = window.getComputedStyle(node);

  return [parseFloat(left), parseFloat(top)] as const;
};
