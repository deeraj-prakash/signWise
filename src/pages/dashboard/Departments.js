//materail
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
  Typography,
  OutlinedInput,
  InputAdornment,
  Box,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { Icon } from '@iconify/react'
import searchFill from '@iconify/icons-eva/search-fill'
import plusFill from '@iconify/icons-eva/plus-fill'
//compoenets
import Page from 'src/components/Page'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import { useState } from 'react'
import Scrollbar from 'src/components/Scrollbar'
import { UserMoreMenu } from 'src/components/_dashboard/user/list'
import AddDepartment from 'src/components/_dashboard/group/AddDepartment'
import Label from 'src/components/Label'
//sample data
const Data = [
  {
    id: 0,
    status: 'Active',
    department: 'Traffic Solutions',
    updated_by: 'RakeshK',
    updated_time: '06/23/2023 11:04:10',
  },
  {
    id: 1,
    status: 'Active',
    department: 'Install',
    updated_by: 'RakeshK',
    updated_time: '06/23/2023 11:03:49',
  },
  {
    id: 2,
    status: 'Active',
    department: 'Production',
    updated_by: 'RakeshK',
    updated_time: '06/23/2023 11:03:34',
  },
  {
    id: 3,
    status: 'Active',
    department: 'Design',
    updated_by: 'RakeshK',
    updated_time: '06/23/2023 10:38:11',
  },
  {
    id: 4,
    status: 'Active',
    department: 'sales',
    updated_by: 'RakeshK',
    updated_time: '06/23/2023 10:37:46',
  },
  {
    id: 5,
    status: 'Active',
    department: 'Tridant Software',
    updated_by: 'RakeshK',
    updated_time: '08/23/2021 16:47:08',
  },
]

export default function Recordings() {
  const theme = useTheme()
  //
  const [filterName, setFilterName] = useState('')
  const [add, setAdd] = useState(false)

  return (
    <Page title="Departments: Add Departments | Sign-Wise Solution">
      <Container>
        <Stack>
          <HeaderBreadcrumbs heading="All Departments" />
        </Stack>
        <Card sx={{ p: 1 }}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            sx={{ m: 2 }}
          >
            <OutlinedInput
              value={filterName}
              onChange={''}
              sx={{ width: 240 }}
              placeholder="Search ..."
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: 'text.disabled' }}
                  />
                </InputAdornment>
              }
            />
            <Button
              onClick={() => {
                setAdd(!add)
              }}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
              Add Department
            </Button>
          </Stack>
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
          <Scrollbar>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Department Name</TableCell>
                    <TableCell>Updated BY</TableCell>
                    <TableCell>Last Updated Time</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Data?.map((item, index) => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Label
                            variant={
                              theme.palette.mode === 'light'
                                ? 'ghost'
                                : 'filled'
                            }
                            color={
                              (item.status === 'InActive' && 'error') ||
                              'success'
                            }
                          >
                            {item.status}
                          </Label>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {item.department}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {item.updated_by}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {item.updated_time}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <UserMoreMenu onDelete={''} userName={''} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
        {add && <AddDepartment add={add} setAdd={setAdd} />}
      </Container>
    </Page>
  )
}
