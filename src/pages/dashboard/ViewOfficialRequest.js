import { Autocomplete, Avatar, Box, Button, Card, CardHeader, Checkbox, Container, Divider, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@material-ui/core";
import { Page } from "@react-pdf/renderer";
import { capitalCase, sentenceCase } from "change-case";
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import editFill from '@iconify/icons-eva/edit-fill';
//materail
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Label from "src/components/Label";
import { useNavigate } from "react-router";

import ViewRequest from "src/components/_dashboard/official-request/ViewRequest";
import { useRef, useState } from "react";
import PublicMsgBoard from "src/components/_dashboard/official-request/PublicMsgBoard";
import RequestUpdates from "src/components/_dashboard/official-request/RequestUpdates";
import PaymentRequest from "src/components/_dashboard/official-request/PaymentRequest";
import { AddCircle, BlockOutlined, Print } from "@material-ui/icons";
import Modal from "src/components/_dashboard/blog/ProjectModel";
import Icon from "@iconify/react";
import Scrollbar from "src/components/Scrollbar";
const TABLE=[
  {id:0,name:'MDO Sign 4x8 Single Face',value:'$1200.00',quantity:'2.00',discount:'0',total:'$2400.00'}
]
const TEAMS=[
    {
     id:0,
     name:'Fabricator Welder',
    },
    {
        id:1,
        name:'Installer',
       },
       {
        id:2,
        name:'Installer',
       },
       {
        id:3,
        name:'Quality Check Wrap',
       },
       {
        id:4,
        name:'Painter Prep',
       },
       {
        id:5,
        name:'John Manager',
       },

]
const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));
export default function ViewofficialRequest (){
    const ACCOUNT_TABS = [
        {
          value: 'request',      
          component:<ViewRequest/>,
        },
        {
            value: 'public message board',      
            component:<PublicMsgBoard/>,
        },
        {
            value: 'updates',      
            component:<RequestUpdates/>,
        },
        {
            value: 'payments',      
            component:<PaymentRequest/>,
        },
      ]
    const theme = useTheme()
    const navigate = useNavigate()
    const [open,setIsOpen] = useState(false)
    const [addTeam,setAddTeam]  = useState(false)
    const [addClient,setAddClient]  = useState(false)
    const [openInvoice,setOpenInvoice] = useState(false)
    const [teams, setTeams] = useState([]);
    const [currentTab, setCurrentTab] = useState('request')
    const ref = useRef()
    const handleChangeTab = (event, newValue) => {
      setCurrentTab(newValue)
    }
    const status='open'
    const HandleClickmenu=()=>{
        setAddClient(true)
    }
    return(
        <Page title="View Request: View | Sign Wise Solutions">
      <Container>    
      <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
        <HeaderBreadcrumbs
          heading="Sample"
          />
          <Stack flexDirection={'column'}>
           <Typography variant="overline" >
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
           color={(status === 'open' ? 'info' :(status === 'Rejected' ?'error':'success'))} >
           Status: {sentenceCase(status)}
          </Label>
        </Typography>
        <Stack>
        <IconButton ref={ref} onClick={() => setIsOpen(!open)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>
      <Menu
        open={open}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
         <MenuItem onClick={HandleClickmenu} sx={{ color: 'text.secondary' }}>
          <ListItemIcon >
            <AddCircle/>
          </ListItemIcon>
          <ListItemText primary="Add Client" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem  sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        
      </Menu>
        </Stack>
        </Stack>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
             <Typography variant="overline" sx={{color:'text.secondary',}}>RFQ</Typography>
             <Button onClick={()=>setOpenInvoice(!openInvoice)} variant="contained">RFQ Details</Button>
             </Stack>
             
           <Grid  container spacing={3}>
           
             <Grid sx={{mt:3}} item xs={12} md={8}>
            <Stack spacing={3}>
              <Stack spacing={5}>
                <Tabs
                  value={currentTab}
                  scrollButtons="auto"
                  variant="scrollable"
                  allowScrollButtonsMobile
                  onChange={handleChangeTab}
                >
                  {ACCOUNT_TABS.map((tab) => (
                    <Tab
                      disableRipple
                      key={tab.value}
                      label={capitalCase(tab.value)}
                      value={tab.value}
                    />
                  ))}
                </Tabs>

                {ACCOUNT_TABS.map((tab) => {
                  const isMatched = tab.value === currentTab
                  return isMatched && <Box key={tab.value}>{tab.component}</Box>
                })}
              </Stack>
            </Stack>
          </Grid>
          <Grid sx={{mt:3}}  item xs={12} md={4}>
          <Card sx={{ pb: 3 }}>
            <CardHeader title='Team' sx={{ mb: 3 }}/>
            <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <IconButton onClick={()=>setAddTeam(!addTeam)}>
                    <AddCircle sx={{width:30,height:30}}/>
                </IconButton>
            </Stack>
            </Stack>
          </Card>
          </Grid>
            </Grid> 
        
            <Modal modalTitle={'Add people to this request'} open={addTeam==true} handleClose={()=>setAddTeam(false)}>
                <Grid container  spacing={3}> 
                    <Grid justifyContent={'center'} item xs={12} md={8}>
                    <Autocomplete
              fullWidth
              multiple
              options={TEAMS}
              disableCloseOnSelect
              value={teams}
              onChange={(event, newValue) => {
                setTeams(newValue);
              }}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    sx={{ width: '24px', height: '24px' }} 
                    checked={selected}
                  />
                  <Avatar src="img" alt={option.name} />
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Search teams" placeholder="Search teams" />
              )}
            />
             <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end',gap:1 }}>
                        <Button variant="contained"onClick={()=>setAddTeam(false)}>Add</Button>
                        <Button variant="outlined" onClick={()=>setAddTeam(false)}>Close</Button>
                    </Box>
                    </Grid>
                   
                </Grid>
            </Modal>
            <Modal modalTitle={'Add people to this request'} open={addClient==true} handleClose={()=>setAddClient(false)}>
                <Grid container  spacing={3}> 
                    <Grid justifyContent={'center'} item xs={12} md={8}>
                    <Autocomplete
              fullWidth
              multiple
              options={TEAMS}
              disableCloseOnSelect
              value={teams}
              onChange={(event, newValue) => {
                setTeams(newValue);
              }}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    sx={{ width: '24px', height: '24px' }} 
                    checked={selected}
                  />
                  <Avatar src="img" alt={option.name} />
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Search teams" placeholder="Search teams" />
              )}
            />
             <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end',gap:1 }}>
                        <Button variant="contained"onClick={()=>setAddClient(false)}>Add</Button>
                        <Button variant="outlined" onClick={()=>setAddClient(false)}>Close</Button>
                    </Box>
                    </Grid>
                   
                </Grid>
            </Modal>
            {/* invoice modal */}
            <Modal modalTitle={'RFQ Details'} open={openInvoice===true} handleClose={()=>setOpenInvoice(false) }>
              <Stack  direction={{ xs: 'column', sm: 'row', md: 'column' }}
                      spacing={{ xs: 3, sm: 2 }}>
                        <Stack direction="row" justifyContent={'flex-end'} alignItems="center" spacing={1}>
                  <Button><Print/>Print</Button>
                  </Stack>
              </Stack>
              <Grid container  spacing={3} >
              
            <Grid  item xs={12} sm={6} sx={{ mb: 5}}>
             
              <Typography  variant="body2">SIGN WISE SOLUTIONS</Typography>
              <Typography variant="body2">www.signwisesolutions.com</Typography>
              <Typography variant="body2">1st Floor, Administrative block,
                Kinfra Integrated Industrial Park,
                Ottapalam, Palakkad, Kerala, India</Typography>
              <Typography variant="body2">Telephone: +91-9496351674</Typography>
            </Grid>
            <Grid  item xs={12} sm={6} sx={{ mb: 5 }}>
             
              <Typography  variant="body2">Order date: 12/31/1969</Typography>
              <Stack sx={{display:'flex',flexDirection:'row'}}>
              <Typography variant="body2">Order status:</Typography>
              <Label color="warning" sx={{ textTransform: 'uppercase', mb: 1 }}>
                  Pending
                </Label> 
              </Stack>
              <Typography variant="body2">Order ID: #000015</Typography>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled', marginTop:'20px' }}>
                TO
              </Typography>
              <Typography variant="body2">Phone: +91 9812799916</Typography>
            </Grid>
              </Grid>
                <Grid container spacing={2}>
                
                   <Scrollbar>
          <TableContainer sx={{ minWidth: 420 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>PRODUCT</TableCell>
                  <TableCell>UNIT PRICE</TableCell>
                  <TableCell>QTY</TableCell> 
                  <TableCell>DISCOUNT</TableCell> 
                  <TableCell>SUB TOTAL</TableCell> 
                </TableRow>
              </TableHead>
              <TableBody>
             {TABLE?.map((val)=>(
             
              <TableRow sx={{
                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
                      }}>
              <TableCell>{val.name}</TableCell>
              <TableCell>{val.value}</TableCell>
              <TableCell>{val.quantity}</TableCell> 
              <TableCell>{val.discount}</TableCell> 
              <TableCell>{val.total}</TableCell> 
              
            </TableRow>
           
             ))}    
            
             <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="center">
                      <Typography variant="overline">Subtotal</Typography>
                    </TableCell>
                    <TableCell align="center" width={10}>
                      <Typography variant="overline">$2400</Typography>
                    </TableCell>
                    
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="center">
                      <Typography variant="overline">Extra Discount</Typography>
                    </TableCell>
                    <TableCell align="center" width={10}>
                      <Typography variant="overline">$0</Typography>
                    </TableCell>
                    
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="center">
                      <Typography variant="overline">Total Discount</Typography>
                    </TableCell>
                    <TableCell align="center" width={10}>
                      <Typography variant="overline">$0</Typography>
                    </TableCell>
                    
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="center">
                      <Typography variant="subtitle1">Total</Typography>
                    </TableCell>
                    <TableCell align="center" width={10}>
                      <Typography variant="subtitle1">$2400</Typography>
                    </TableCell>
                    
                  </RowResultStyle>
                  
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
                    {/* </Card>   */}
                </Grid>
            </Modal>
          </Container>
          </Page>
    )
}