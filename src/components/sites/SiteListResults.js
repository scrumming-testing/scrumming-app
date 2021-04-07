import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const SiteListResults = ({
  data, handleSelectedData, resetSelected, ...rest
}) => {
  const [selectedDataIds, setSelectedDataIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    console.log('ACTION');
    setSelectedDataIds([]);
    handleSelectedData([]);
  }, [resetSelected]);

  const handleSelectAll = (event) => {
    let newSelectedDataIds;

    if (event.target.checked) {
      newSelectedDataIds = data.map((user) => user.id);
    } else {
      newSelectedDataIds = [];
    }

    handleSelectedData(newSelectedDataIds);
    setSelectedDataIds(newSelectedDataIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDataIds.indexOf(id);
    let newSelectedDataIds = [];

    if (selectedIndex === -1) {
      newSelectedDataIds = newSelectedDataIds.concat(selectedDataIds, id);
    } else if (selectedIndex === 0) {
      newSelectedDataIds = newSelectedDataIds.concat(selectedDataIds.slice(1));
    } else if (selectedIndex === selectedDataIds.length - 1) {
      newSelectedDataIds = newSelectedDataIds.concat(selectedDataIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedDataIds = newSelectedDataIds.concat(
        selectedDataIds.slice(0, selectedIndex),
        selectedDataIds.slice(selectedIndex + 1)
      );
    }
    handleSelectedData(newSelectedDataIds);
    setSelectedDataIds(newSelectedDataIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedDataIds.length === data.length}
                    color="primary"
                    indeterminate={
                      selectedDataIds.length > 0
                      && selectedDataIds.length < data.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Business Unit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0, limit).map((element) => (
                <TableRow
                  hover
                  key={element.id}
                  selected={selectedDataIds.indexOf(element.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDataIds.indexOf(element.id) !== -1}
                      onChange={(event) => handleSelectOne(event, element.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={element.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(element.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {`${element.name}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {`${element.businessUnit.name}`}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={data.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

SiteListResults.propTypes = {
  data: PropTypes.array.isRequired,
  handleSelectedData: PropTypes.func.isRequired,
  resetSelected: PropTypes.string.isRequired,
};

export default SiteListResults;
