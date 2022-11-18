import React from 'react';
import { SvgIconProps, SvgIcon } from '@mui/material';
import TooltipComponent from 'src/components/Tooltip';

const TimeIcon = (props: SvgIconProps) => {
  return (
    <TooltipComponent title="Time">
      <SvgIcon {...props} width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#ADC743" />
        <path
          d="M18.5 6.8335H13.5V8.50016H18.5V6.8335ZM15.1667 17.6668H16.8333V12.6668H15.1667V17.6668ZM21.8583 12.1585L23.0417 10.9752C22.6833 10.5502 22.2917 10.1502 21.8667 9.80016L20.6833 10.9835C19.3917 9.95016 17.7667 9.3335 16 9.3335C11.8583 9.3335 8.5 12.6918 8.5 16.8335C8.5 20.9752 11.85 24.3335 16 24.3335C20.15 24.3335 23.5 20.9752 23.5 16.8335C23.5 15.0668 22.8833 13.4418 21.8583 12.1585ZM16 22.6668C12.775 22.6668 10.1667 20.0585 10.1667 16.8335C10.1667 13.6085 12.775 11.0002 16 11.0002C19.225 11.0002 21.8333 13.6085 21.8333 16.8335C21.8333 20.0585 19.225 22.6668 16 22.6668Z"
          fill="white"
        />
      </SvgIcon>
    </TooltipComponent>
  );
};
export default TimeIcon;
