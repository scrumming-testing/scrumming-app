import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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

const AccountListResults = ({ users, handleSelectedUsers, ...rest }) => {
  const [selectedUsersIds, setSelectedUsersIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedUsersIds;

    if (event.target.checked) {
      newSelectedUsersIds = users.map((user) => user.id);
    } else {
      newSelectedUsersIds = [];
    }

    handleSelectedUsers(newSelectedUsersIds);
    setSelectedUsersIds(newSelectedUsersIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsersIds.indexOf(id);
    let newSelectedUsersIds = [];

    if (selectedIndex === -1) {
      newSelectedUsersIds = newSelectedUsersIds.concat(selectedUsersIds, id);
    } else if (selectedIndex === 0) {
      newSelectedUsersIds = newSelectedUsersIds.concat(selectedUsersIds.slice(1));
    } else if (selectedIndex === selectedUsersIds.length - 1) {
      newSelectedUsersIds = newSelectedUsersIds.concat(selectedUsersIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsersIds = newSelectedUsersIds.concat(
        selectedUsersIds.slice(0, selectedIndex),
        selectedUsersIds.slice(selectedIndex + 1)
      );
    }
    handleSelectedUsers(newSelectedUsersIds);
    setSelectedUsersIds(newSelectedUsersIds);
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
                    checked={selectedUsersIds.length === users.length}
                    color="primary"
                    indeterminate={
                      selectedUsersIds.length > 0
                      && selectedUsersIds.length < users.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, limit).map((user) => (
                <TableRow
                  hover
                  key={user.id}
                  selected={selectedUsersIds.indexOf(user.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsersIds.indexOf(user.id) !== -1}
                      onChange={(event) => handleSelectOne(event, user.id)}
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
                        src={user.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(user.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {user.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {moment(user.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={users.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

AccountListResults.propTypes = {
  users: PropTypes.array.isRequired,
  handleSelectedUsers: PropTypes.func.isRequired,
};

export default AccountListResults;
