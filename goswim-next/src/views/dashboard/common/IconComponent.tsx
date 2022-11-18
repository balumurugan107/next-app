import React from 'react';
import { Box } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { Icon } from 'react-feather';
import TooltipComponent from 'src/components/Tooltip';

interface IconComponentProps {
  src: string | SvgIconComponent | Icon;
  className?: string;
  onClick?: Function;
  title?: string;
}

const IconComponent = (props: IconComponentProps) => {
  return (
    <TooltipComponent title={props.title || 'Iconbutton'}>
      <Box className={props.className} onClick={() => props.onClick?.()}>
        {typeof props.src === 'string' ? <img src={props.src} alt="icon" /> : <props.src />}
      </Box>
    </TooltipComponent>
  );
};

export default IconComponent;
