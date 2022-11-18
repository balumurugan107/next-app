import React from 'react';
import { Tooltip, Zoom } from '@mui/material';
import useTooltip from 'src/hooks/useTooltip';

interface TooltipComponentProps {
  title: string;
  children: JSX.Element;
}

const TooltipComponent: React.FC<TooltipComponentProps> = ({ children, title }) => {
  const [openTooltip, setOpen] = useTooltip();
  const handleOver = () => {
    setOpen(true);
  };

  const mouseOut = () => {
    setOpen(false);
  };
  return (
    <Tooltip
      TransitionComponent={Zoom}
      title={title}
      open={openTooltip}
      onOpen={handleOver}
      onMouseOut={mouseOut}
      placement="bottom"
    >
      {children}
    </Tooltip>
  );
};

export default TooltipComponent;
