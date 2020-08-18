import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import LatestProjects from './LatestProjects';
import NewProjects from './NewProjects';
import PerformanceOverTime from './PerformanceOverTime';
import RealTime from './RealTime';
import RoiPerCustomer from './RoiPerCustomer';
import StudentStats from './StudentStats';
import TeamTasks from './TeamTasks';
import CurrentLesson from './CurrentLesson';
// import firebase from 'src/lib/firebase';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const DashboardView = () => {
  const classes = useStyles();
  // React.useEffect(() => {
  //   const getData = async () => {
  //     const db = firebase.firestore();
  //     const userRef = db.collection('users');
  //     const doc = await userRef.get();
  //     console.log(doc)

  //   };
  //   getData();
  // }, []);

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Header />
        <Grid container spacing={3}>
          <Grid item lg={6} sm={6} xs={12}>
            <StudentStats />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <CurrentLesson />
          </Grid>
          {/* <Grid item lg={3} xs={12}>
            <RealTime />
          </Grid> */}
          <Grid item lg={12} xs={12}>
            <PerformanceOverTime />
          </Grid>
          {/* <Grid item lg={5} xl={4} xs={12}>
            <TeamTasks />
          </Grid> */}
          {/* <Grid item lg={7} xl={8} xs={12}>
            <LatestProjects />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardView;
