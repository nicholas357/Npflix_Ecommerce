import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'TOS - eCommerce  App';
    }
  }, [title]);
};

export default useDocumentTitle;
