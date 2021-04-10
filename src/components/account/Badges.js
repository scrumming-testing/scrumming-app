import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: 15
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    marginLeft: 'auto'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function Badges({ user }) {
  const classes = useStyles();
  console.log(user);

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Division : CHALLENGER
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Team player
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Typography variant="subtitle1" color="textSecondary">
            10/04/2021
          </Typography>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image="https://th.bing.com/th/id/OIP.we0wrVnCm0hd4okXN4ef-QHaId?pid=ImgDet&rs=1"
        title="Live from space album cover"
      />
    </Card>
  );
}

Badges.propTypes = {
  user: PropTypes.object.isRequired
};
