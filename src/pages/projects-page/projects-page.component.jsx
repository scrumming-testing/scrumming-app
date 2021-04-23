import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import projectsMocks from 'src/__mocks__/projects';

import ProjectList from '../../components/projects/projects-list/projects-list.component';
import SearchBox from '../../components/search-box/search-box.component';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');

  const hadleChange = (e) => {
    console.log('hello');
    setSearch(e.target.value);
  };

  useEffect(() => {
    setProjects(projectsMocks);
  }, []);

  const filter = projects.filter((project) => project.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Helmet>
        <title>Projects | Scrumming</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <SearchBox
            placeholder="Search a project"
            hadlechange={hadleChange}
          />
          <Box sx={{ pt: 3 }}>
            <ProjectList projects={filter} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProjectsPage;
