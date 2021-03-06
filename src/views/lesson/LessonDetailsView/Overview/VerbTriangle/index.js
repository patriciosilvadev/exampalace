import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, CardHeader, Divider, makeStyles } from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Chart from './Chart';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: 400
  }
}));

const FinancialStats = ({ className, ...rest }) => {
  const classes = useStyles();
  const stats = {
    thisYear: [1, 2, 3, 4, 5]
  };
  const labels = [
    'What?',
    'Hey.',
    'Good morning!',
    'Good morning! How are you?',
    'Good morning! Is everything well?'
  ];

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader action={<GenericMoreButton />} title="Phrases" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={300} pt={4} pr={2} pl={2}>
          <Chart className={classes.chart} data={stats} labels={labels} />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

FinancialStats.propTypes = {
  className: PropTypes.string
};

export default FinancialStats;
