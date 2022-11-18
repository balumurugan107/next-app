import React, { forwardRef, Ref, ReactNode, HTMLAttributes } from 'react';
import { Helmet } from 'react-helmet';
// import useSettings from 'src/hooks/useSettings';

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: ReactNode;
}

const Page = ({ title, children, ...rest }: PageProps, ref: Ref<HTMLDivElement>) => {
  // const { settings } = useSettings();
  // const teamName = settings.teamName || 'GoSwim';
  return (
    <div ref={ref} {...rest}>
      {/* <Helmet>
        <title>{`${title}`}</title>
      </Helmet> */}
      {children}
    </div>
  );
};

export default forwardRef<HTMLDivElement, PageProps>(Page);
