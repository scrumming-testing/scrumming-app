import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Chart from 'react-apexcharts';
import UpdateForm from '../account-scrumming/UpdateForm';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    display: 'flex',
    height: 300,
    width: 300
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    flexDirection: 'row',
  },
}));

export default function AccountProfile({ user }) {
  const classes = useStyles();

  const [dialog, setDialog] = useState(null);

  const series = [{
    name: 'Series 1',
    data: [80, 50, 30, 40],
  }];

  const options = {
    chart: {
      height: 350,
      type: 'radar',
    },
    title: {
      text: 'Statistics'
    },
    xaxis: {
      categories: ['Backend', 'Frontend', 'Database', 'Management']
    }
  };

  const unmountDialog = (message) => {
    setDialog(null);
    console.log(message);
  };

  const openUpdateDialog = () => {
    setDialog(<UpdateForm formClosed={unmountDialog} userId={user.id} />);
  };

  return (
    <Card className={classes.root}>
      {dialog}
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                height: 100,
                width: 100
              }}
            />
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h3"
            >
              {user.name}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {`${user.email}`}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {`Site : ${user.site}`}
            </Typography>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className={classes.controls}>
                <CardActions>
                  <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    onClick={openUpdateDialog}
                  >
                    Update details
                  </Button>
                </CardActions>
              </div>
            </Box>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className={classes.controls}>
                <Chart type="radar" series={series} options={options} height={350} width={450} />
              </div>
            </Box>
          </Box>
        </CardContent>
      </div>
    </Card>
  );
}

AccountProfile.propTypes = {
  user: PropTypes.object.isRequired
};
