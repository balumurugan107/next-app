import React from 'react';
import { SvgIconProps, SvgIcon, Tooltip, Zoom } from '@mui/material';

const Role = (props: SvgIconProps) => {
  return (
    <Tooltip TransitionComponent={Zoom} title="Role">
      <SvgIcon {...props}>
        <path d="M13.1638 21.5646C13.6028 21.8655 13.7507 21.9668 14.2406 21.9668C14.7304 21.9668 14.8782 21.8655 15.3172 21.5646C15.915 21.1548 16.8185 20.5356 18.4169 20.5356C20.0153 20.5356 20.9187 21.1548 21.5166 21.5646C21.9556 21.8655 22.1036 21.9668 22.5934 21.9668C23.0833 21.9668 23.2313 21.8655 23.6703 21.5645C24.1181 21.2576 24.7375 20.8331 25.6921 20.6394L22.8862 15.4539L25.2342 9.03424L31.1856 3.92755C31.9925 3.23517 32.0854 2.01978 31.393 1.21291C30.7005 0.406028 29.4852 0.313175 28.6783 1.00555L22.3453 6.43975C22.0951 6.65445 21.9042 6.92988 21.791 7.23948L18.9174 15.0957L18.9029 15.139L8.57812 20.7414C8.99419 20.6176 9.48303 20.5356 10.0641 20.5356C11.6625 20.5356 12.566 21.1548 13.1638 21.5646Z" />
        <path d="M28.995 18.5964C31.1205 18.3569 32.6493 16.4398 32.4099 14.3143C32.1704 12.1889 30.2532 10.66 28.1278 10.8995C26.0023 11.139 24.4734 13.0561 24.7129 15.1816C24.9524 17.307 26.8696 18.8359 28.995 18.5964Z" />
        <path d="M3.39529 23.6305C3.94192 24.0052 4.62231 24.4715 5.88808 24.4715C7.15391 24.4715 7.83424 24.0052 8.38087 23.6305C8.86208 23.3007 9.24214 23.0402 10.0646 23.0402C10.887 23.0402 11.2671 23.3007 11.7482 23.6305C12.2949 24.0052 12.9752 24.4715 14.2411 24.4715C15.5068 24.4715 16.1872 24.0052 16.7338 23.6305C17.2149 23.3007 17.595 23.0402 18.4174 23.0402C19.2398 23.0402 19.6198 23.3007 20.1011 23.6305C20.6477 24.0052 21.3281 24.4715 22.5939 24.4715C23.8597 24.4715 24.5401 24.0052 25.0867 23.6305C25.5679 23.3007 25.948 23.0402 26.7705 23.0402C27.593 23.0402 27.973 23.3007 28.4543 23.6305C29.001 24.0052 29.6814 24.4715 30.9473 24.4715C32.2132 24.4715 32.8936 24.0052 33.4403 23.6305C33.9215 23.3007 34.3016 23.0402 35.1241 23.0402C35.5194 23.0402 35.8398 22.7198 35.8398 22.3245C35.8398 21.9293 35.5194 21.6089 35.1241 21.6089C33.8582 21.6089 33.1778 22.0752 32.6311 22.4498C32.1499 22.7796 31.7698 23.0401 30.9473 23.0401C30.1248 23.0401 29.7447 22.7796 29.2634 22.4498C28.7167 22.0751 28.0364 21.6089 26.7705 21.6089C25.5046 21.6089 24.8242 22.0752 24.2776 22.4498C23.7964 22.7796 23.4163 23.0401 22.5939 23.0401C21.7715 23.0401 21.3914 22.7796 20.9102 22.4499C20.3636 22.0752 19.6832 21.6089 18.4174 21.6089C17.1516 21.6089 16.4712 22.0752 15.9246 22.4499C15.4435 22.7797 15.0634 23.0401 14.2411 23.0401C13.4187 23.0401 13.0386 22.7796 12.5574 22.4499C12.0108 22.0752 11.3304 21.6089 10.0646 21.6089C8.79878 21.6089 8.11838 22.0752 7.57175 22.4499C7.09053 22.7797 6.71048 23.0401 5.88808 23.0401C5.06568 23.0401 4.68562 22.7797 4.20455 22.4499C3.65791 22.0752 2.97752 21.6089 1.71175 21.6089C1.31652 21.6089 0.996094 21.9293 0.996094 22.3245C0.996094 22.7198 1.31652 23.0402 1.71175 23.0402C2.53415 23.0401 2.91414 23.3007 3.39529 23.6305Z" />
        <path d="M25.0867 27.2087C24.5401 27.5834 23.8597 28.0497 22.5939 28.0497C21.328 28.0497 20.6477 27.5834 20.1011 27.2087C19.6198 26.8789 19.2398 26.6185 18.4174 26.6185C17.595 26.6185 17.2149 26.8789 16.7338 27.2087C16.1872 27.5834 15.5068 28.0497 14.2411 28.0497C12.9752 28.0497 12.2949 27.5834 11.7482 27.2087C11.2671 26.8789 10.887 26.6185 10.0646 26.6185C9.24221 26.6185 8.86208 26.879 8.38087 27.2087C7.83424 27.5834 7.15384 28.0497 5.88808 28.0497C3.5784 28.0497 3.45771 26.6185 1.71175 26.6185C1.31652 26.6185 0.996094 26.298 0.996094 25.9028C0.996094 25.5076 1.31652 25.1871 1.71175 25.1871C4.02143 25.1871 4.14212 26.6184 5.88808 26.6184C7.59659 26.6184 7.78305 25.1871 10.0646 25.1871C11.3304 25.1871 12.0108 25.6534 12.5574 26.0281C13.0386 26.3579 13.4187 26.6184 14.2411 26.6184C15.0634 26.6184 15.4435 26.3579 15.9246 26.0281C16.4712 25.6534 17.1516 25.1871 18.4174 25.1871C19.6832 25.1871 20.3636 25.6534 20.9102 26.0281C21.3914 26.3579 21.7715 26.6184 22.5939 26.6184C23.4163 26.6184 23.7964 26.3579 24.2776 26.028C24.8242 25.6534 25.5046 25.1871 26.7705 25.1871C28.0364 25.1871 28.7167 25.6534 29.2634 26.028C29.7447 26.3579 30.1248 26.6184 30.9473 26.6184C31.7698 26.6184 32.1499 26.3579 32.6311 26.028C33.1778 25.6534 33.8582 25.1871 35.1241 25.1871C35.5194 25.1871 35.8398 25.5076 35.8398 25.9028C35.8398 26.298 35.5194 26.6185 35.1241 26.6185C34.3016 26.6185 33.9215 26.879 33.4403 27.2088C32.8936 27.5835 32.2132 28.0497 30.9473 28.0497C29.6814 28.0497 29.001 27.5834 28.4543 27.2088C27.9731 26.879 27.593 26.6185 26.7705 26.6185C25.9481 26.6185 25.5679 26.879 25.0867 27.2087Z" />
      </SvgIcon>
    </Tooltip>
  );
};
export default Role;
