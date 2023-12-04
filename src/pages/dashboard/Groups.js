//materail
import { Icon } from '@iconify/react'
import plusFill from '@iconify/icons-eva/plus-fill'
import {
  Stack,
  Card,
  Button,
  Box,
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
} from '@material-ui/core'
//compoenets
import Page from 'src/components/Page'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import { useState } from 'react'
import AddGroup from 'src/components/_dashboard/group/AddGroup'
import Scrollbar from 'src/components/Scrollbar'
//sample data
const Data = [
  {
    id: 0,
    name: 'Sample Project',
    state: 'Michigan',
    city: 'San Diego',
    orders: [
      { id: 0, order: 'order 1' },
      { id: 1, order: 'order 2' },
      { id: 2, order: 'order 3' },
    ],
  },
  {
    id: 1,
    name: 'Project X',
    state: 'California',
    city: 'Los Angeles',
    orders: [
      { id: 3, order: 'order 4' },
      { id: 4, order: 'order 5' },
    ],
  },
  {
    id: 2,
    name: 'Project Y',
    state: 'New York',
    city: 'New York City',
    orders: [{ id: 5, order: 'order 6' }],
  },
  {
    id: 3,
    name: 'Project Z',
    state: 'Texas',
    city: 'Houston',
    orders: [
      { id: 6, order: 'order 7' },
      { id: 7, order: 'order 8' },
    ],
  },
  {
    id: 5,
    name: 'Project B',
    state: 'Illinois',
    city: 'Chicago',
    orders: [
      { id: 8, order: 'order 9' },
      { id: 9, order: 'order 10' },
    ],
  },
]

export default function Groups() {
  const [add, setAdd] = useState(false)

  //
  const [anchorEl, setAnchorEl] = useState({});
  
  const handleClick = (event, index) => {
    setAnchorEl({ ...anchorEl, [index]: event.currentTarget });
  };

  const handleClose = (index) => {
    setAnchorEl({ ...anchorEl, [index]: null });
  };

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <Page title="Groups: Add Groups | Sign-Wise Solution">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <HeaderBreadcrumbs heading="Groups" />
          <Box>
            <Button
              onClick={() => {
                setAdd(!add)
              }}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
              Add Group
            </Button>
          </Box>
        </Stack>
        {add ? (
          <AddGroup add={add} setAdd={setAdd} />
        ) : (
          <Card sx={{ p: 1 }}>
            <Scrollbar>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Group Name</TableCell>
                      <TableCell>State</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell>Number Orders</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
        {Data?.map((order,index) => {
          return (
            <TableRow key={order.id}>
              <TableCell>
                <Typography variant="subtitle2">
                  {order.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">
                  {order.state}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">
                  {order.city}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">
                  {order.orders.length}
                </Typography>
              </TableCell>
              <TableCell>
                <Button
                  aria-describedby={order.id}
                  variant="outlined"
                  onClick={(event) => handleClick(event, index)}
                >
                  View
                </Button>
                <Popover
                 open={Boolean(anchorEl[index])}
                 anchorEl={anchorEl[index]}
                 onClose={() => handleClose(index)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <MenuList key={order.id}>
                    {order.orders?.map((ord) => 
                      <MenuItem key={ord.id}>{ord.order}</MenuItem>
                    )}
                  </MenuList>
                </Popover>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>
        )}
      </Container>
    </Page>
  )
}
