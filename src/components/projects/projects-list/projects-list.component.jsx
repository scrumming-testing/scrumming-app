import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye as EyeIcon } from 'react-feather';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';

import DateUtil from 'src/utils/date';

const date = new DateUtil();

const ProjectsList = ({ projects, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

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
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Start at
                </TableCell>
                <TableCell>
                  End At
                </TableCell>
                <TableCell>
                  Site
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.slice(0, limit).map((project) => (
                <TableRow
                  hover
                  key={project.id}
                >
                  <TableCell>
                    {project.name}
                  </TableCell>
                  <TableCell>
                    {date.format(project.startAt)}
                  </TableCell>
                  <TableCell>
                    {date.format(project.endAt)}
                  </TableCell>
                  <TableCell>
                    {project.site}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      startIcon={<EyeIcon />}
                    >
                      <Link
                        to={`/app/kanban/${project.id}`}
                        style={{ color: 'white' }}
                      >
                        KanBan
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={projects.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ProjectsList.propTypes = {
  projects: PropTypes.array.isRequired
};

export default ProjectsList;
