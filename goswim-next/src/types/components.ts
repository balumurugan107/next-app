import { SVGAttributes } from 'react';

export interface ComponentProps {
  className?: string;
  style?: Record<string, any>;
  onPlay?: any;
  children?: any;
}
export interface ComponentImageProps {
  src?: string;
  alt?: string;
  className?: string;
  style?: Record<string, any>;
}
export interface FormikCommonProps {
  submit?: string;
}

export interface IconProps extends SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
}
