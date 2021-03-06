import React, { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import Header from './Header';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import SchoolIcon from '@material-ui/icons/School';
// import Timeline from './Timeline';
// import Connections from './Connections';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  },
  tabs: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    }
  },
  topBar: {
    backgroundColor: theme.palette.background.paper
  }
}));

const ProfileView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [currentTab, setCurrentTab] = useState('timeline');
  const [profile, setProfile] = useState(null);

  const tabs = [
    { value: 'timeline', label: <SchoolIcon /> },
    { value: 'connections', label: <VideogameAssetIcon /> },

  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getPosts = useCallback(async () => {
    try {
      const response = await axios.get('/api/social/profile');

      if (isMountedRef.current) {
        setProfile(response.data.profile);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (!profile) {
    return null;
  }

  return (
    <Page className={classes.root} title="Exam Palace">
      <Box pt={1} className={classes.topBar}>
        <Tabs
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={currentTab}
          textColor="secondary"
          centered
        >
          {tabs.map(tab => (
            <Tab
              className={classes.tabs}
              key={tab.value}
              label={tab.label}
              value={tab.value}
            />
          ))}
        </Tabs>
      </Box>
      {/* <Divider /> */}
      <Box py={3} pb={6}>
        {/* {currentTab === 'timeline' && <Timeline profile={profile} />} */}
        {/* {currentTab === 'connections' && <Connections />} */}
      </Box>
    </Page>
  );
};

export default ProfileView;
