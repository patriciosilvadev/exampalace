import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Box,
  Button,
  Grid,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Share2 as ShareIcon,
  Check as CheckIcon,
  Calendar as CalendarIcon,
  AlertTriangle as AlertIcon,
  Send as SendIcon
} from 'react-feather';
import ApplyModal from './ApplyModal';

const useStyles = makeStyles(theme => ({
  root: {},
  badge: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2)
  },
  badgeIcon: {
    marginRight: theme.spacing(1)
  },
  image: {
    width: '315px'
  },
  action: {
    marginBottom: theme.spacing(0),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  }
}));

const Header = ({ className, project, ...rest }) => {
  const classes = useStyles();
  const [isApplyModalOpen, setApplyModalOpen] = useState(false);

  const handleApplyModalOpen = () => {
    setApplyModalOpen(true);
  };

  const handleApplyModalClose = () => {
    setApplyModalOpen(false);
  };

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={clsx(classes.root, className)}
      {...rest}
    >
      {/* <Grid item>
        <Typography variant="h3" color="textPrimary">
          {project.title}
        </Typography>
      </Grid> */}
      {/* 
      <Grid item>

        <Box p={2}>
          <img
            className={classes.image}
            src={project.image}
            alt={'lesson-image'}
          />
          <div className={classes.badge}>
            <SvgIcon
              fontSize="small"
              className={classes.badgeIcon}
            >
              <CalendarIcon />
            </SvgIcon>
            <Typography
              variant="body2"
              color="inherit"
              component="span"
            >
              Lesson 1
            </Typography>
          </div> 
        </Box>
      </Grid> */}
      {/* <Grid item>
        <Button
          className={classes.action}
          startIcon={
            <SvgIcon fontSize="small">
              <ShareIcon />
            </SvgIcon>
          }
        >
          Share
        </Button>
        <Button
          className={classes.action}
          onClick={handleApplyModalOpen}
          variant="contained"
          color="secondary"
          startIcon={
            <SvgIcon fontSize="small">
              <SendIcon />
            </SvgIcon>
          }
        >
          Take exam
        </Button>
        <ApplyModal
          author={project.author}
          onApply={handleApplyModalClose}
          onClose={handleApplyModalClose}
          open={isApplyModalOpen}
        />
      </Grid> */}
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
};

export default Header;
