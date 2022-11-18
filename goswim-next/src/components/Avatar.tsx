/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-use-before-define */
/**
 * @author Pragadeeshwaran Jayapal
 * @since 04/06/2020
 */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import Person from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CameraPlusIcon from '@mui/icons-material/AddAPhoto';
import CameraIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import TooltipComponent from 'src/components/Tooltip';

const styles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 40,
    height: 40,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(20),
    lineHeight: 1,
    borderRadius: '50%',
    overflow: 'hidden',
    userSelect: 'none'
  },
  circle: {},
  rounded: {
    borderRadius: theme.shape.borderRadius
  },
  square: {
    borderRadius: 0
  },
  rectangle: {
    borderRadius: 0,
    width: '200px !important'
  },
  /**
   * @since 08/06/2020
   * @description added on hover effect for plus icon
   */
  overlayAvatar: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0
  },
  plusIcon: {
    fontSize: 35,
    padding: 10,
    color: theme.palette.background.dark,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    display: 'none',
    '& :hover': {
      display: 'flex'
    }
  },
  img: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    objectFit: 'cover',
    color: 'transparent',
    textIndent: 10000
  },
  fallback: {
    fontSize: '2rem',
    color: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[400]
  }
}));

const useLoaded = ({ src, srcSet }: any) => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    if (!src && !srcSet) {
      return undefined;
    }
    let active = true;
    const image = new Image();
    image.src = src;
    image.srcset = srcSet;
    image.onload = () => {
      if (!active) {
        return;
      }
      setLoaded(true);
    };
    image.onerror = () => {
      if (!active) {
        return;
      }
      setLoaded(false);
    };

    return () => {
      active = false;
    };
  }, [src, srcSet]);

  return loaded;
};

const Avatar = React.forwardRef((props: any, ref: any) => {
  const {
    alt,
    children: childrenProp,
    className,
    component: Component = 'div',
    imgProps,
    sizes,
    src,
    srcSet,
    variant = 'circle',
    type = 'single',
    canEdit = true,
    ...other
  } = props;

  const classes = styles();
  let children = null;
  const loaded = useLoaded({ src, srcSet });
  const hasImg = src || srcSet;
  const UploaderIcon = () => {
    return (
      <div className={classes.overlayAvatar}>
        <TooltipComponent title="Upload image">
          <EditIcon className={classes.plusIcon} />
        </TooltipComponent>
      </div>
    );
  };
  /**
   * @author Pragadeeshwaran Jayapal
   * @since 08/06/2020
   * @description added team icon for team page
   */
  const AvatarType =
    type === 'single'
      ? Person
      : type === 'team'
      ? PeopleAltIcon
      : type === 'camview'
      ? CameraIcon
      : CameraPlusIcon;
  const TypeIcon = () => {
    if (canEdit) {
      return (
        <>
          <AvatarType className={classes.fallback} />
          <UploaderIcon />
        </>
      );
    }
    return (
      <>
        <AvatarType className={classes.fallback} />
      </>
    );
  };
  const AvatarImage = () => {
    if (canEdit) {
      return (
        <>
          <img
            alt={alt}
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            className={classes.img}
            {...imgProps}
          />
          <UploaderIcon />
        </>
      );
    }
    return (
      <>
        <img
          alt={alt}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          className={classes.img}
          {...imgProps}
        />
      </>
    );
  };
  if (hasImg && loaded) {
    children = <AvatarImage />;
  } else if (childrenProp != null) {
    children = childrenProp;
  } else if (hasImg && alt) {
    children = alt[0];
  } else {
    children = <TypeIcon />;
  }

  return (
    <Component
      className={clsx(
        classes.root,
        {
          [classes.circle]: variant === 'circle',
          [classes.square]: variant === 'square',
          [classes.rounded]: variant === 'rounded',
          [classes.rectangle]: variant === 'rectangle'
        },
        className
      )}
      ref={ref}
      {...other}
    >
      {children}
    </Component>
  );
});

Avatar.propTypes = {
  alt: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  component: PropTypes.elementType,
  imgProps: PropTypes.object,
  sizes: PropTypes.string,
  src: PropTypes.string,
  srcSet: PropTypes.string,
  variant: PropTypes.oneOf(['circle', 'rounded', 'square', 'rectangle']),
  type: PropTypes.oneOf(['single', 'team', 'cam', 'camview']),
  canEdit: PropTypes.bool
};

export default Avatar;
