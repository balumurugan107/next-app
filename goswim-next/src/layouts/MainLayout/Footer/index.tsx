import { Container, alpha, Grid, Typography, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Twitter } from 'react-feather';
import Link from 'src/components/Link';
import LogoHolder from 'src/components/LogoHolder';
const useStyles = makeStyles(theme => ({
  footerLogo: {
    maxWidth: 200,
    '& img': {
      width: '100%'
    }
  },
  footer: {
    width: '100%',
    float: 'left',
    background: alpha(theme.palette.text.primary, 0.1),
    '& ul': {
      padding: 0,
      '& li': {
        listStyleType: 'none',
        fontSize: '0.875rem',
        marginBottom: theme.spacing(1.5),
        color: theme.palette.text.secondary,
        '&:hover': {
          color: theme.palette.primary.main
        },
        '& a': {
          textDecoration: 'none',
          color: theme.palette.text.secondary,
          '&:hover': {
            color: theme.palette.primary.main
          }
        }
      }
    }
  },
  socialMedia: {
    marginTop: theme.spacing(2),
    '& li': {
      display: 'inline',
      marginRight: theme.spacing(2),
      '& a': {
        cursor: 'pointer'
      },
      '& svg': {
        width: 20,
        '&:hover': {
          color: theme.palette.primary.main
        }
      }
    }
  },
  footerTitle: {
    fontSize: '1rem',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
    textTransform: 'uppercase'
  },
  copyright: {
    color: theme.palette.text.secondary
  },
  footerWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  left: {
    width: '50%',
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  right: {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(4),
    paddingLeft: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'wrap',
      '& div': {
        width: '50%',
        marginTop: theme.spacing(2)
      }
    }
  },
  promotion: {
    marginBottom: `${theme.spacing(2)} !important`,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column !important' as any,
    padding: '0 18px'
  },
  promotionDesc: {
    color: theme.palette.text.secondary
  }
}));
const Footer: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mode = theme.palette.mode;
  return (
    <footer className={classes.footer}>
      <Container>
        <div className={classes.footerWrapper}>
          <div className={classes.right}>
            <div>
              <Typography variant="h3" className={classes.footerTitle}>
                Features
              </Typography>
              <ul>
                <li>
                  <Link href="/features#groups" scroll={false}>
                    Groups
                  </Link>
                </li>
                <li>
                  <Link href="/features#courses">Courses</Link>
                </li>
                <li>
                  <Link href="/features#lessons">Lessons</Link>
                </li>
                {/* <li>
                  <Link to={{ pathname: '/features', state: { target: 'deckshots' } }}>
                    Deckshots
                  </Link>
                </li> */}
              </ul>
            </div>
            <div>
              <Typography variant="h3" className={classes.footerTitle}>
                Subscription
              </Typography>
              <ul>
                <li>
                  <Link href="/subscription-info#athlete" prefetch={false}>Athlete</Link>
                </li>
                <li>
                  <Link href="/subscription-info#coach" prefetch={false}>Coach</Link>
                </li>
              </ul>
            </div>
            <div>
              <Typography variant="h3" className={classes.footerTitle}>
                About
              </Typography>

              <ul>
                <li>
                  <Link href="/faq" prefetch={false} >FAQ</Link>
                </li>
                <li>
                  <Link href="/company" prefetch={false}>Company</Link>
                </li>
                <li>
                  <Link href="/privacy" prefetch={false}>Privacy</Link>
                </li>
                <li>
                  <Link href="/terms_of_service" prefetch={false}>Terms of Service</Link>
                </li>
                <li>
                  <Link href="/terms_of_use" prefetch={false}>Terms of Use</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={classes.left}>
            <Grid container>
              <Grid item xs={12} sm={6} className={classes.promotion}>
                <img src="/static/login/promotion.png" alt="promotion" />
                <Typography variant="body1" className={classes.promotionDesc}>
                  An Official Technique Video Supplier to USA Swimming.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.footerLogo}>
                  <Link href="/">
                    <LogoHolder
                      src={
                        mode === 'light'
                          ? '/static/login/footer-logo-with-aspiricx.svg'
                          : '/static/login/goswim_logo_white.svg'
                      }
                      alt="Logo"
                    />
                  </Link>
                </div>
                <Typography variant="body1" className={classes.copyright}>
                  &#169; Goswim 2022
                </Typography>
                <ul className={classes.socialMedia}>
                  <li>
                    <a href="https://www.facebook.com/GoSwim.tv">
                      <Facebook />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/goswim">
                      <Twitter />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/accounts/login/?next=/goswimtv/">
                      <Instagram />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/goswim">
                      <Linkedin />
                    </a>
                  </li>
                  <li>
                    <a href="mailto:admin@goswim.tv">
                      <Mail />
                    </a>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
