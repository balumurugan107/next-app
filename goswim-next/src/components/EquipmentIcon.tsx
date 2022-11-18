import React from 'react';
import { SvgIconProps, SvgIcon } from '@mui/material';
import TooltipComponent from 'src/components/Tooltip';

const EquipmentIcon = (props: SvgIconProps) => {
  return (
    <TooltipComponent title="Equipment">
      <SvgIcon {...props} width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#A03CEA" />
        <path
          d="M16.3073 32.72C25.1439 32.72 32.3073 25.5565 32.3073 16.72C32.3073 7.88341 25.1439 0.719971 16.3073 0.719971C7.47076 0.719971 0.307312 7.88341 0.307312 16.72C0.307312 25.5565 7.47076 32.72 16.3073 32.72Z"
          fill="#A03CEA"
        />
        <path
          d="M15.9698 7.95911L10.9774 6.98312C10.8354 6.95523 10.688 6.98917 10.5724 7.07646L6.51046 10.1389C6.30392 10.2945 6.24657 10.58 6.37692 10.8035L11.8917 20.27C12.425 21.1838 13.111 21.7042 13.8233 21.7042C13.8234 21.7042 13.8234 21.7042 13.8234 21.7042C14.5447 21.7042 15.4316 21.0947 15.5575 19.4253L16.3808 8.50676C16.4002 8.24879 16.2237 8.00863 15.9698 7.95911ZM13.7345 19.8738C13.6845 19.8853 13.6329 19.8912 13.5813 19.8912C12.7222 19.8912 12.2977 18.3386 12.188 17.8628C12.0665 17.3354 11.7442 15.5976 12.6985 15.3777C12.7485 15.3662 12.8 15.3603 12.8517 15.3603C13.7108 15.3603 14.1353 16.9129 14.245 17.3887C14.3665 17.9161 14.6889 19.6539 13.7345 19.8738ZM26.2204 18.9202L23.7662 15.2733C23.6853 15.1532 23.5572 15.073 23.4137 15.0529L19.0605 14.4421C18.8039 14.4064 18.5619 14.5676 18.4961 14.8177L16.0917 23.9615C15.8768 24.7788 15.9543 25.488 16.3101 25.9494C16.5647 26.2796 16.9434 26.4664 17.3765 26.4664C17.3765 26.4664 17.3766 26.4664 17.3767 26.4664C17.8791 26.4664 18.4267 26.219 18.9601 25.7604L26.1298 19.5945C26.3258 19.4258 26.3648 19.1348 26.2204 18.9202ZM19.4057 23.7036C19.1556 24.1036 18.5023 25.0336 17.8397 25.0336C17.7102 25.0336 17.5858 24.9986 17.4798 24.9323C16.7077 24.4493 17.485 23.0732 17.7417 22.6629C17.9918 22.263 18.645 21.333 19.3076 21.333C19.4371 21.333 19.5615 21.368 19.6676 21.4343C20.4395 21.9172 19.6623 23.2934 19.4057 23.7036Z"
          fill="white"
        />
      </SvgIcon>
    </TooltipComponent>
  );
};
export default EquipmentIcon;