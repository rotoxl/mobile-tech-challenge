import { useCallback, useEffect, useRef } from 'react';
const debounce = require('lodash.debounce');

export const useDebouncedFilter = (
  searchValue: string,
  deferredFunction?: (search: string) => void
) => {
  const debounceCall = useRef(
    debounce((search: string) => {
      if (deferredFunction) {
        deferredFunction(search);
      }
    }, 600)
  );

  const cancelFilter = () => debounceCall.current.cancel();

  const filter = useCallback(
    (search: string) => debounceCall.current(search),
    []
  );

  useEffect(() => {
    filter(searchValue);
    return cancelFilter;
  }, [filter, searchValue]);
};
