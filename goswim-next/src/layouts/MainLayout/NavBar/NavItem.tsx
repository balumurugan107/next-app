import React, { useState } from 'react';
import clsx from 'clsx';
import { Button, Collapse, alpha, ListItem, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ComponentProps, IconProps } from 'src/types/components';
import { useDispatch, useSelector } from 'react-redux';
import { PlusSquare } from 'react-feather';
import { AccountType } from 'src/constants/common';
import AddGroupDialog from 'src/views/management/Teams/CreateEditView/GroupModal';
import { getMemberGroups } from 'src/store/management/team';
import { useRouter } from 'next/router';
import Link from  'src/components/Link';

interface NavItemProps {
  title: string;
  depth: number;
  icon?: React.FC<ComponentProps & IconProps>;
  info: React.FC<ComponentProps & IconProps>;
  disabled: boolean;
  open?: boolean;
  href?: string;
  imgsrc: string;
  onClick?: Function;
}

const useStyles = makeStyles(theme => ({
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0
  },
  itemLeaf: {
    display: 'flex !important',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
    paddingLeft: '18px !important',
    alignItems: 'flex-start !important',
  },
  button: {
    color: theme.palette.text.primary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%'
  },
  buttonLeaf: {
    display: 'flex !important',
    color: `${theme.palette.text.secondary} !important`,
    padding: '8px !important',
    justifyContent: 'center',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    minWidth: '170px !important', //width of the area to the right of the icon
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover span span': {
      color: theme.palette.primary.main
    },
    '&:hover svg': {
      transform: 'scale(1.2)',
      color: theme.palette.secondary.main
    },
    '&:hover': {
      fill: theme.palette.secondary.main,
      '& span': {
        color: theme.palette.secondary.main
      }
    },
    '&.depth-0.$active': {
      '& $title': {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    '&.active': {
      color: theme.palette.secondary.main
    }
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 5,
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.main
    },
    '&:disabled': {
      color: theme.palette.text.disabled
    }
  },
  disableIcon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 5,
    color: theme.palette.text.disabled
  },

  title: {
    marginRight: 'auto',
    marginLeft: '15px',
    color: theme.palette.text.primary,
    fontSize: '0.875rem',
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  disableTitle: {
    marginRight: 'auto',
    marginLeft: '15px',
    color: theme.palette.text.disabled
  },
  active: {
    background: alpha(theme.palette.primary.main, 0.12),
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.secondary.main
    },
    '& svg': {
      fill: theme.palette.secondary.main
    }
  },
  info: {
    marginTop: theme.spacing(1)
  },
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: '0 0 10px 0 rgba(0,0,0,.2)',
    maxWidth: 220,
    fontSize: 10
  },
  arrow: {
    color: theme.palette.background.paper
  },
  teamslist: {
    paddingLeft: '40px',
    fontSize: '15px',
    listStyleType: 'none', //old: 'disc !important'
    color: theme.palette.text.primary
  },
  listelement: {
    fontSize: `${theme.spacing(1.5)} !important`,
    color: `${theme.palette.text.primary} !important`,
    justifyContent: 'flex-start !important',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    maxWidth: '140px',
    '&:hover': {
      color: theme.palette.primary.main
    },
    '&.active': {
      color: theme.palette.secondary.main
    },
    '&:hover svg': {
      color: theme.palette.primary.main
    },
    '&.active svg': {
      color: theme.palette.secondary.main
    },
    '&.span': {
      // display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '125px'
    }
  },
  addGrpBtn: {
    fontWeight: 1000,
    fontSize: theme.spacing(1.5),
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',
    minWidth: '10px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:hover': {
      color: theme.palette.primary.main
    },
    '&.active': {
      color: theme.palette.secondary.main
    },
    '& span': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '125px',
      display: 'block'
    }
  },
  navBtn: {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  navLink: {
    textDecoration: 'none'
  }
}));

const NavItem: React.FC<ComponentProps & NavItemProps> = ({
  title,
  href,
  depth,
  children,
  icon: Icon,
  imgsrc: imgSrc,
  className,
  open: openProp = false,
  info: Info,
  onClick,
  disabled,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(openProp);
  const userRole = useSelector(state => state.account.user?.role);
  const [ShowAllItems, setShowAllItems] = useState(true);
  const [showAddGroupDialog, setShowAddGroupDialog] = useState(false);
  const args = { page: 1, limit: 20, search: '' };
  const dispatch = useDispatch();

  const router = useRouter();
  const { teamsList } = useSelector(state => ({
    teamsList: state.team.teamsList || []
  }));

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  let paddingLeft = 8;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  const style = { paddingLeft };

  if (children) {
    return (
      <ListItem className={clsx(classes.item, className)} disableGutters key={title} {...rest}>
        <Button className={classes.button} onClick={handleToggle} style={style}>
          {Icon && <Icon className={classes.icon} size="20" />}
          <span className={classes.title}>{title}</span>
          {open ? (
            <ExpandLessIcon color="inherit" component="svg" />
          ) : (
            <ExpandMoreIcon color="inherit" component="svg" />
          )}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  }
  const loadIcon = (imgSrc: string) => {
    if (!imgSrc) {
      return Icon && <Icon className={disabled ? classes.disableIcon : classes.icon} size="20" />;
    } else {
      return (
        <img alt="icons" src={imgSrc} className={disabled ? classes.disableIcon : classes.icon} />
      );
    }
  };

  const loadMore = () => {
    setShowAllItems(false);
  };
  const loadLess = () => {
    setShowAllItems(true);
  };
  return (
    <>
      <ListItem className={clsx(classes.itemLeaf, className)} disableGutters key={title} {...rest}>
        <>
          {href && (
            <Link href={href} prefetch={false} className={classes.navLink}>
              <Button
                LinkComponent={Link}
                disabled={disabled}
                className={clsx(classes.buttonLeaf, `depth-${depth}`)}
                style={style}
                data-id="23234"
              >
                {loadIcon(imgSrc)}
                <span className={disabled ? classes.disableTitle : classes.title}>{title}</span>
                {Info && <Info className={classes.info} />}
              </Button>
            </Link>
          )}

          {title === 'GROUPS' &&  ( //GROUPS
            <ul className={classes.teamslist}>
              {(userRole === AccountType.COACH || userRole === AccountType.ADMIN) && (
                <li key="head">
                  <Button
                    size="small"
                    className={classes.navBtn}
                    onClick={() => setShowAddGroupDialog(true)}
                  >
                    <PlusSquare style={{ marginRight: '4px', height: '20px' }} />
                    Add group
                  </Button>
                </li>
              )}

              {ShowAllItems ? (
                <>
                  {teamsList?.slice(0, 3)?.map((data, index) => (
                    <li key={index}>
                      <Tooltip title={data.name} placement="right-end">
                        <Link href={`/train/${data._id}`} prefetch={false} className={classes.navLink}>
                          <Button className={classes.listelement}>{data.name}</Button>
                        </Link>
                      </Tooltip>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {teamsList?.map((data, index) => (
                    <li key={index}>
                      <Tooltip title={data.name} placement="right-end">
                        <Link href={`/train/${data._id}`} prefetch={false} className={classes.navLink}>
                          <Button className={classes.listelement}>{data.name}</Button>
                        </Link>
                      </Tooltip>
                    </li>
                  ))}
                </>
              )}
              {teamsList.length > 3 && ShowAllItems && (
                <Button
                  onClick={loadMore}
                  className={classes.navBtn}
                  startIcon={<ExpandMoreIcon />}
                  size="small"
                >
                  show more
                </Button>
              )}

              {teamsList.length > 3 && !ShowAllItems && (
                <Button
                  onClick={loadLess}
                  className={classes.navBtn}
                  startIcon={<ExpandLessIcon />}
                  size="small"
                >
                  show less
                </Button>
              )}
            </ul>
          )}
        </>
      </ListItem>
      {showAddGroupDialog && (
        <AddGroupDialog
          type="create"
          openDialog={showAddGroupDialog}
          closeDialog={(boolean: Boolean) => {
            setShowAddGroupDialog(false);
            if (boolean) dispatch(getMemberGroups(args));
          }}
        />
      )}
    </>
  );
};

export default NavItem;
