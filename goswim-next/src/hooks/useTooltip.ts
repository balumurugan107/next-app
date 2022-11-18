import { useEffect, useState } from 'react';

const useTooltip: () => [boolean, (open: boolean) => void] = () => {
  const [openTooltip, setOpen] = useState<boolean>(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (openTooltip) {
      timeout = setTimeout(() => {
        setOpen(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [openTooltip, setOpen]);

  return [openTooltip, setOpen];
};

export default useTooltip;
