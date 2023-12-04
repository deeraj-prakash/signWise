//components
import Page from "src/components/Page"
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs"
import { QuillEditor } from "src/components/editor";
//materail
import { useTheme } from '@material-ui/core/styles'
import { experimentalStyled as styled } from '@material-ui/core/styles'
import { Stack, Container, Grid, Card, Typography, Avatar, Divider, Button, Box, TextField, Slider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Popover, IconButton, Autocomplete } from "@material-ui/core"
import { AttachFile, Autorenew, Close, EventNote, Message, Person, Refresh, } from "@material-ui/icons"
import { LoadingButton, MobileDatePicker } from "@material-ui/lab";
import { useRef, useState } from "react";

const image = 'https://i0.gmx.at/image/832/36611832,pd=2/arnold-schwarzenegger.jpg'
const Media = [
    { id: 0, value: 'Fab cnc' },
    { id: 1, value: 'Printer All ' },
    { id: 2, value: 'Install Coordinator' },
    { id: 3, value: 'Installer' },
  ]
const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}))
const valuetext=(value)=> {
    return `${value}%`;
  }
export default function ViewTicketCrm() {
    const [openPop,setOpenPop] = useState(false)
    const HandleClose=()=>{
        setOpenPop(false)
    }
    const fileInputRef = useRef(null);

    const handleAttach = () => {
      fileInputRef.current.click()
    };
    return (
        <Page title="View Tickets:View Tickets | Sign-Wise Solution">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <HeaderBreadcrumbs
                        heading="View Tickets"
                    />
                </Stack>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={8}>
                        <Stack spacing={3}>
                            <Card sx={{ p: 3 }}>
                                
                                 <Typography  variant="h5">
                                    Free Ticket
                                    </Typography>
                                    
                                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
                                        Ticket # : OTH0013
                                    </Typography>
                                    <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
                                        Project : Project XY
                                    </Typography>
                                </Stack>
                                <Stack>
                                    <Typography variant="subtitle1">Issue Description</Typography>
                                    <Typography sx={{ mb: 3, display: 'block', color: 'text.secondary' }} variant="subtitle1">
                                        918-716-5456 when you call our call center it plays the message saying press 1 for tridant
                                        software, press 2 for underground extracts, press 3 for underground dispensary.
                                        I need it to play instead: press 1 for rostech innovations, press 2 for tridant software
                                    </Typography>
                                </Stack>
                                <Stack sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Stack >
                                        <Stack flexDirection='row'>
                                            <EventNote /><Typography variant="subtitle1">Task</Typography>
                                        </Stack>
                                        <Typography>Task 01</Typography>
                                    </Stack>
                                    <Stack >
                                        <Stack flexDirection='row' sx={{ justifyContent: 'flex-end' }}>
                                            <Message /><Typography variant="subtitle1">Message</Typography>
                                        </Stack>
                                        <Stack flexDirection='row'>
                                            <Avatar alt="john" src={image} sx={{ width: '30px', height: '30px' }} />
                                            <Typography sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
                                                variant="subtitle2">Posted on : 10-31-2023 01:27</Typography>
                                        </Stack>

                                    </Stack>
                                </Stack>
                                <Divider />
                                <Stack>
                                    <LabelStyle>Add Message to Ticket</LabelStyle>
                                    <QuillEditor
                                        simple
                                        id="product-description"
                                    />
                                </Stack>
                                <Box
                                    sx={{
                                        mt: 3,
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: 1,
                                    }}
                                >
                                    <Button variant="contained">
                                        Post Message
                                    </Button>
                                </Box>

                            </Card>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={3}>
                            <Card sx={{ p: 3 }}>
                            <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
                                        Ticket Details
                                    </Typography>
                                    <Autorenew/>
                                </Stack>
                                <Stack>
                                <Box
                             component={ MobileDatePicker }
                             label="Start Date"
                            //  value={values.start}
                            //    onChange={(date) => setFieldValue('start', date)}
                             renderInput={(params) => (
                             <TextField size="small" {...params} fullWidth />
                             )}
                              /> 
                                </Stack>
                            <Stack sx={{mt:1}}>
                            <Box
                             component={ MobileDatePicker }
                             label="Due Date"
                            //  value={values.start}
                            //    onChange={(date) => setFieldValue('start', date)}
                             renderInput={(params) => (
                             <TextField size="small" {...params} fullWidth />
                             )}
                              /> 
                              </Stack>
                              <Box>
                                <Typography variant="overline" sx={{ mt: 3, display: 'block', color: 'text.secondary' }}>Completion</Typography>
                                <Slider 
                                 aria-label="Percentage"
                                 defaultValue={30}
                                 getAriaValueText={valuetext}
                                 valueLabelDisplay="auto"
                                //  step={10}
                                 marks
                                 min={10}
                                 max={100}
                                />
                              </Box>
                              <Stack sx={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                               <Stack  flexDirection='row'>
                                <Person sx={{width:'25px',height:'25px'}}/>
                                <Typography variant="overline" sx={{ mt:1, display: 'block', color: 'text.secondary' }}>Ticket Members</Typography>
                                </Stack> 
                                <Box><Button onClick={()=>setOpenPop(!openPop)} sx={{width:40,height:40,fontSize:10,mr: -1}}>Add Members</Button></Box>
                              </Stack>
                              <Card sx={{mt:1}}>
                              <TableContainer>
                              <Table>
                            <TableHead>
                             <TableRow>
                            <TableCell align="left">User</TableCell>
                           <TableCell align="right">Option</TableCell>
                           </TableRow>
                           </TableHead>
                           <TableBody>
                            <TableRow>
                                <TableCell sx={{flexDirection:'row'}} align="left">
                                   <AttachFile/> <Typography variant="overline" sx={{  display: 'block', color: 'text.secondary' }}
                                    >Files</Typography>
                                </TableCell>
                                <TableCell align="right"><Button onClick={handleAttach}>Attach</Button></TableCell>
                            </TableRow>
                           </TableBody>
                           </Table>
                              </TableContainer>
                              </Card>
                              <Card sx={{mt:1}}>
                              <TableContainer>
                              <Table>
                            <TableHead>
                             <TableRow>
                            <TableCell align="left">File</TableCell>
                           <TableCell align="center">Type</TableCell>
                           <TableCell align="right">Action</TableCell>
                           </TableRow>
                           </TableHead>
                           <TableBody>
                            <TableRow>
                                <TableCell sx={{flexDirection:'row'}} align="left">
                                   <Typography variant="overline" sx={{  display: 'block', color: 'text.secondary' }}
                                    >Activity Log</Typography>
                                </TableCell>
                                <TableCell ></TableCell>
                                <TableCell align="right"><Button>All Activities</Button></TableCell>
                            </TableRow>
                           </TableBody>
                           </Table>
                              </TableContainer>
                              </Card>
                              <Card sx={{mt:1}}>
                              <TableContainer>
                              <Table>
                            <TableHead>
                             <TableRow>
                            <TableCell align="left">User</TableCell>
                           <TableCell align="right">Action</TableCell>
                           </TableRow>
                           </TableHead>
                           <TableBody>
                            <TableRow>
                                <TableCell sx={{flexDirection:'row'}} align="left">
                                  <Avatar src={image} />
                                </TableCell>
                                <TableCell >Rakesh K posted a new message to task: 
                                    Rostech Innovation Phone Numbers
                                    URL - 10-31-2023 01:27</TableCell>

                            </TableRow>
                           </TableBody>
                           </Table>
                              </TableContainer>
                              </Card>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
                <Popover
                open={Boolean(openPop)}
                anchorEl={openPop}
                onClose={HandleClose}
                
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'center', horizontal: 'center' }}
                >
        <Box sx={{ width:500,height:300,p:2, bgcolor: 'background.neutral'}}>
    <Stack sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
      <Typography variant='subtitle1' gutterBottom>Add Ticket Members</Typography> 
    </Stack>
    <Stack sx={{display:'flex',flexDirection:'row'}}>
    <Typography variant="body2" sx={{ color: 'text.secondary' }} >
      Select Members 
    </Typography>
    </Stack>
    <Autocomplete
    fullWidth
    id="combo-box-demo"
    options={Media}
    getOptionLabel={(state) => state.value}
    // sx={{ width: 400 }}
    renderInput={(params) => (
      <TextField {...params} label="Select" />
    )} // Update the label
    />
                    <Box
                      sx={{
                        mt: 3,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,
                      }}
                    >
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        onClick={() => {
                          setOpenPop(false)
                        }}
                      >
                        Save
                      </LoadingButton>
                      <Button
                        variant="outlined"
                        type="submit"
                        onClick={() => {
                            setOpenPop(false)
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>

  </Box>
                </Popover>
                <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
            </Container>
        </Page>

    )
}