import { useLayoutEffect } from 'react';

const CSS_TEXT = `
  iframe, frameset, object {
    pointer-events: none !important;
  }
`;

/**
 * Private hook that blocks iframes from intercepting the cursor
 * @param value enable or disable
 */
export const useIframeSkipEvents = (value: boolean) => {
  useLayoutEffect(() => {
    if (document.styleSheets.length === 0) {
      const styleNode = document.createElement('style');
      document.head.appendChild(styleNode);
    }
  }, []);

  useLayoutEffect(() => {
    if (value) {
      const sheet = document.styleSheets[document.styleSheets.length - 1];
      const index = sheet.insertRule(CSS_TEXT, sheet.cssRules.length);

      return () => sheet.deleteRule(index);
    }

    return;
  }, [value]);
};
