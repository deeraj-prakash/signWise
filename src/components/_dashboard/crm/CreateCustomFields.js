
import {
     Card,Table,TableContainer,TableHead,TableRow,TableCell,TableBody,Container,Stack,Button

 } from "@material-ui/core"
 import { sentenceCase } from "change-case"
 //components
 import Scrollbar from "src/components/Scrollbar"
 import Label from "src/components/Label"
import { useTheme } from "@material-ui/styles"
import AddEdit from "./AddEdit"
import { useState } from "react"
import { useNavigate } from "react-router"
import { PATH_DASHBOARD } from "src/routes/paths"

 const DATA=[
    {
        id:0,
        status:'Active',
        name:'Industry',
        by:'John',
        update:'12/03/2021 16:38:27',
    },
    {
        id:2,
        status:'Active',
        name:'Industry',
        by:'Doe',
        update:'08/25/2021 14:50:48',
    },
 ]
export default function CreateCustomFeilds(){
const navigate = useNavigate()
    const theme = useTheme()
    return(
      <Container>
      <Stack
        direction="row"
        alignItems="center" marginBottom={2}
        justifyContent="space-between"
      >
        <Button variant='contained'
          onClick={() => {
           navigate(PATH_DASHBOARD.crm.customfield)
          }}
        >
          Create Custom Fields
        </Button>
      </Stack>
        <Card sx={{ pb: 3 }}>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Updated At</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {DATA.map((row) => (
                  <TableRow key={row.id}>
                   
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.by}</TableCell>
                    <TableCell>{row.update}</TableCell>
                    {/* <TableCell>{fCurrency(row.total)}</TableCell> */}
                    <TableCell align="right">
                    <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={(row.status === 'banned' && 'error') || 'success'}
                          >
                            {sentenceCase(row.status)}
                          </Label>
                    </TableCell>
                    <TableCell align="right">
                              <AddEdit
                                onDelete={(id) => handleDeleteUser(id)}
                                userName={row.id}
                              />
                            </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      </Container>
    )
}