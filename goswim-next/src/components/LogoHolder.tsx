/**
 * @author Pragadeeshwaran Jayapal
 * @since 06/06/2020
 * @description reusable image holder component
 */
import React from 'react';
import { ComponentImageProps } from 'src/types/components';

const LogoHolder: React.FC<ComponentImageProps> = props => {
  return <img alt={props.alt} src={props.src} {...props} />;
};

export default LogoHolder;
