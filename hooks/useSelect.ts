import { useCallback, useState } from 'react';

export default function useSelect() {
  const [selectArr, setSelectArr] = useState([]);

  const onSelect = useCallback((item: any) => {
    setSelectArr(selectArr.concat(item));
  }, []);

  return { selectArr, onSelect };
}
