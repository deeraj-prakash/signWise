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
} from '@material-ui/core'
//compoenets
import Page from 'src/components/Page'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import { useState } from 'react'
import Scrollbar from 'src/components/Scrollbar'
//sample data
const Data = [
  {
    id: 0,
    from: '+19187165456',
    to: '+919496351674',
    direction: 'Incoming',
    duration: '00:18',
  },
  {
    id: 1,
    from: '+19187165456',
    to: '+919496351674',
    direction: 'Incoming',
    duration: '00:18',
  },
  {
    id: 2,
    from: '+19187165456',
    to: '+919496351674',
    direction: 'Incoming',
    duration: '00:18',
  },
  {
    id: 3,
    from: '+19187165456',
    to: '+919496351674',
    direction: 'Incoming',
    duration: '00:18',
  },
  {
    id: 4,
    from: '+19187165456',
    to: '+919496351674',
    direction: 'Incoming',
    duration: '00:18',
  },
]

export default function Recordings() {

  //
  const [anchorEl, setAnchorEl] = useState({});
  
  const handleClick = (event, index) => {
    setAnchorEl({ ...anchorEl, [index]: event.currentTarget });
  };

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <Page title="Groups: Add Groups | Sign-Wise Solution">
      <Container>
        <Stack>
          <HeaderBreadcrumbs heading="Call Recordings" />
        </Stack>
          <Card sx={{ p: 1 }}>
            <Scrollbar>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>From</TableCell>
                      <TableCell>To</TableCell>
                      <TableCell>Direction</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
        {Data?.map((item,index) => {
          return (
            <TableRow key={item.id}>
              <TableCell>
                <Typography variant="subtitle2">
                  {item.from}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">
                  {item.to}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">
                  {item.direction}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">
                  {item.duration}
                </Typography>
              </TableCell>
              <TableCell>
                <Button
                  aria-describedby={item.id}
                  variant="outlined"
                  onClick={(event) => handleClick(event, index)}
                >
                  play
                </Button>
                {/* <Popover
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
                </Popover> */}
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
