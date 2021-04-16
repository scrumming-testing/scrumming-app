import { Box } from '@material-ui/core';
import { Helmet } from 'react-helmet';

const Home = (props) => (
  <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <img
        width="100%"
        height="100%"
        alt="LOGO"
        src="/static/images/home/SCRUMMING_(3).gif"
        {...props}
      />
    </Box>
  </>
);

export default Home;
