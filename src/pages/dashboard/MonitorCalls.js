//materail
import { Icon } from '@iconify/react'
import plusFill from '@iconify/icons-eva/plus-fill'
import {
  Stack,
  Card,
  Button,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  ListItem,
  Typography,
  Divider,
  Popover,
  MenuList,
  MenuItem,
  Box,
  Avatar,
} from '@material-ui/core'
//compoenets
import Page from 'src/components/Page'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import { useState } from 'react'
import Scrollbar from 'src/components/Scrollbar'
import { BlogPostsSort } from 'src/components/_dashboard/blog'

const SORT_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'design', label: 'design' },
    { value: 'sales', label: 'Sales' },
    { value: 'production', label: 'Production' },
    { value: 'install', label: 'Install' },
    { value: 'traffic_solutions', label: 'Traffic Solutions' },
    { value: 'tridant-software', label: 'Tridant Software' },
];
//sample data
const Data = [
  {
    id: 0,
    agent: 'John Doe',
    calls: '',
    tasks: '',
  },
  {
    id: 1,
    agent: 'John Doe',
    calls: '',
    tasks: '',
  },
  {
    id: 2,
    agent: 'John Doe',
    calls: '',
    tasks: '',
  },
  {
    id: 3,
    agent: 'John Doe',
    calls: '',
    tasks: '',
  },
  {
    id: 4,
    agent: 'John Doe',
    calls: '',
    tasks: '',
  },
]

export default function MonitorCalls() {

  const [filters, setFilters] = useState('all');

  const handleChangeSort = (event) => {
    setFilters(event.target.value);
  };
  return (
    <Page title="Groups: Add Groups | Sign-Wise Solution">
      <Container>
        <Stack 
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <HeaderBreadcrumbs heading="Monitor Calls" />
          <Box>
          <BlogPostsSort styles={{width:'200px'}} query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
          </Box>
        </Stack>
          <Card sx={{ p: 1 }}>
            <Scrollbar>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>AGENT</TableCell>
                      <TableCell>LIVE CALLS</TableCell>
                      <TableCell>IM TASKS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
        {Data?.map((item,index) => {
          return (
            <TableRow key={item.id}>
              <TableCell>
              <Avatar alt={'PI'} src={''} />
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">
                  {item.agent}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">
                  {item.calls}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">
                  {item.tasks}
                </Typography>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>
      </Container>
    </Page>
  )
}
