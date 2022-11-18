import React from 'react';
import { SvgIconProps, SvgIcon } from '@mui/material';
import TooltipComponent from 'src/components/Tooltip';

const StrokeIcon = (props: SvgIconProps) => {
  return (
    <TooltipComponent title="Stroke">
      <SvgIcon {...props} width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#BB739B" />
        <path
          d="M6.85948 21.5091C14.3691 18.7496 17.114 24.3261 25.4497 21.5133C25.7591 21.409 25.9444 21.0001 25.8637 20.6002C25.7829 20.2003 25.4666 19.9608 25.1573 20.0652C23.5207 20.6174 22.1023 20.8218 20.8177 20.824L19.1393 17.3272C20.1315 18.9207 21.9753 19.0125 23.0557 17.5275C23.5306 16.8746 23.7805 16.0217 23.7593 15.1259C23.688 12.1228 20.8417 10.7753 19.274 12.93C18.5189 13.9681 18.3819 15.444 18.8071 16.6348L16.5106 11.8502L19.9185 10.5789C20.9769 10.1841 21.4771 8.61802 20.9394 7.37241C20.5489 6.46799 19.7385 6.03684 18.9687 6.32401L13.8093 8.24863C12.4716 8.74769 11.8725 10.7579 12.607 12.2883L14.1665 15.5373C13.0424 16.4394 9.47688 19.2975 9.43902 19.3314C8.54405 19.4537 7.5856 19.6862 6.54296 20.0694C6.23544 20.1824 6.05698 20.5963 6.1444 20.9939C6.23178 21.3915 6.55207 21.6221 6.85948 21.5091ZM20.1175 13.9555C20.6624 13.2064 21.5721 13.1724 22.1499 13.8748C22.7287 14.5785 22.7567 15.7538 22.2123 16.5022C21.668 17.2503 20.7587 17.2866 20.1798 16.5828C19.6009 15.879 19.573 14.7038 20.1175 13.9555ZM15.4555 15.3843L13.5909 11.4993C13.2615 10.8132 13.5297 9.91079 14.1303 9.68673L19.2897 7.7621C19.5393 7.66891 19.8017 7.80875 19.9283 8.10181C20.1029 8.50627 19.9397 9.01316 19.5975 9.14083L15.4551 10.6861C15.0864 10.8236 14.9217 11.3789 15.1237 11.7997L19.4187 20.7481C16.7176 20.455 14.5229 19.4019 11.7438 19.242L15.2688 16.4146C15.5405 16.1967 15.6241 15.7354 15.4555 15.3843Z"
          fill="white"
        />
        <path
          d="M25.1575 23.5571C17.1822 26.2482 14.3836 20.68 6.54309 23.5613C6.23557 23.6743 6.0571 24.0882 6.14452 24.4857C6.23194 24.8834 6.55223 25.114 6.85968 25.001C14.3693 22.2415 17.1141 27.8179 25.4499 25.0052C25.7593 24.9009 25.9446 24.492 25.8638 24.0921C25.7831 23.6922 25.4668 23.4527 25.1575 23.5571Z"
          fill="white"
        />
      </SvgIcon>
    </TooltipComponent>
  );
};
export default StrokeIcon;