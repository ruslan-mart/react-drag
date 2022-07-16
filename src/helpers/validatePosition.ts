export const validatePosition = (node: HTMLElement) => {
  const { position } = window.getComputedStyle(node);

  return position === 'absolute' || position === 'fixed';
};
