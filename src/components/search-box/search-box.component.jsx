import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import PropTypes from 'prop-types';

const SearchBox = ({ placeholder, hadlechange }) => (
  <Box sx={{ mt: 3 }}>
    <Card>
      <CardContent>
        <Box sx={{ maxWidth: 500 }}>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon
                    fontSize="small"
                    color="action"
                  >
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              )
            }}
            placeholder={placeholder}
            variant="outlined"
            onChange={hadlechange}
          />
        </Box>
      </CardContent>
    </Card>
  </Box>
);

SearchBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  hadlechange: PropTypes.func.isRequired
};

export default SearchBox;
