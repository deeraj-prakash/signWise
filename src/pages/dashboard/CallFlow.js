import { Icon } from '@iconify/react'
import { useState, useEffect, useCallback, useRef } from 'react'
import searchFill from '@iconify/icons-eva/search-fill'
import { experimentalStyled as styled } from '@material-ui/core/styles'
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Container,
  Tab,
  Box,
  Tabs,
  Stack,
  Card,
  Typography,
  InputAdornment,
  Link,
  Button,
  Divider,
  OutlinedInput,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  Paper,
  Grid,
  TextField,
  IconButton,
  Tooltip,
  Autocomplete,
  FormControlLabel,
  Switch,
  CardHeader,
  Slider,
  Menu,
  MenuItem,
} from '@material-ui/core'
// redux
import { useDispatch } from '../../redux/store'
import {
  getCards,
  getProfile,
  getInvoices,
  getAddressBook,
  getNotifications,
} from '../../redux/slices/user'
// components
import Page from '../../components/Page'
import { UserMoreMenu } from 'src/components/_dashboard/user/list'
import Label from 'src/components/Label'
import { useTheme } from '@material-ui/core/styles'
import Modal from 'src/components/_dashboard/blog/ProjectModel'
import { ArrowDropDown, ArrowDropUp, ContactSupport, Download, MoreVert, PauseCircle, PlayCircleFilled, SlowMotionVideo, VolumeDown, VolumeOff, VolumeUp } from '@material-ui/icons';
import { MobileTimePicker } from '@material-ui/lab';

// ----------------------------------------------------------------------

const ACCOUNT_TABS = [
  {
    value: 'CALL FLOW DESIGN',
    //   icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    //   component: <AccountGeneral />
  },
  {
    value: 'ADVANCE SETTING',
  },
]
const ABLE =[
  {id:0,name:'Enable'},
  {id:1,name:'Disable'},
]
const currentData = [
  {
    id: 0,
    status: 'Active',
    date: '20 August 2020',
    duration: '03:13',
    schedule_time: '09:00 - 05:00',
    schedule_day: 'Monday to Sunday',
  },
]
const STATUS = [
{id:1},
{id:2},
{id:3},
{id:4},
{id:5},
{id:6},
{id:7},
{id:8},
{id:9},
]
const DESIGN=[
  {id:0,name:'Design'},
  {id:1,name:'Sales'},
  {id:2,name:'Production'},
  {id:4,name:'Install'},
  {id:5,name:'traffic Solutions'}

]
const DAYS=[
  {id:0,name:'Sunday'},
  {id:1,name:'Monday'},
  {id:2,name:'Tuesday'},
  {id:4,name:'Wednesday'},
  {id:5,name:'Thursday'},
  {id:5,name:'Friday'},
  {id:5,name:'Saturday'}

]
const InactiveData = [
  {
    id: 0,
    status: 'Inactive',
    date: '10 August 2020',
    duration: '10:02',
    schedule_time: '09:00 - 20:00',
    schedule_day: 'Monday to Saturday',
  },
]

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none', // Remove the border
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none', // Remove the border on hover
  },
}))

export default function CallSettings() {
  const dispatch = useDispatch()
  const theme = useTheme()
  const [value, setValue] = useState(30);
  const [currentTab, setCurrentTab] = useState('CALL FLOW DESIGN')
  const [add, setAdd] = useState(false)
  const [playbtn, setPlaybtn] = useState(false)
  const [volumebtn, setVolumebtn] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [number,setNumber] = useState(0)
  const fileInputRef = useRef(null);


  const handleIncrement = () => {
    setNumber(number + 1);
  };

  const handleDecrement = () => {
    if (number > 0) {
      setNumber(number - 1);
    }
  };
  const HandlePlaybtn=()=>{
    setPlaybtn(!playbtn)
  }
  const HandleVolume=()=>{
    setVolumebtn(!volumebtn)
  }
  const handleAttach = () => {
    fileInputRef.current.click();
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    dispatch(getCards())
    dispatch(getAddressBook())
    dispatch(getInvoices())
    dispatch(getNotifications())
    dispatch(getProfile())
  }, [dispatch])

  const [isSubmitting, setIsSubmitting] = useState(false);
  const NewUserSchema = Yup.object().shape({
    fname: Yup.string().required('This value is required'),
    lname: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required'),
    Password: Yup.string().required('password is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    tags: Yup.string().required('Tags is required'),
    rfq: Yup.string().required('RFQ is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role Number is required'),
    avatarUrl: Yup.mixed().required('Avatar is required')
    
  });
//
const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.overline,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
  }));
  //
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
    
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();

      } catch (error) {
        console.error(error);

      }
    }
  });

  const { errors, values, touched, handleSubmit, getFieldProps , setFieldValue, } = formik;
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue)
  }

  return (
    <Page title="User: Call Flows | SignWise Solutions">
      <Container>
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
                label={tab.value}
                value={tab.value}
              />
            ))}
          </Tabs>

          {currentTab === 'CALL FLOW DESIGN' ? (
            <>
             {!add &&(
              <Stack
                marginTop={1}
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
              <Typography>
                  Call flow is designed to distribute calls to different
                  departments according to business timing
                </Typography>
                <Button
                  onClick={() => {
                    setAdd(!add)
                  }}
                  variant="contained"
                  // startIcon={<Icon icon={plusFill} />}
                >
                  CREATE NEW CALL FLOW
                </Button>
              </Stack>)}
              {!add ? (
              <Card sx={{ p: 3 }}>
                <Box>
                  <Stack marginTop={1}>
                    <Paper
                      sx={{
                        p: 1.5,
                        flexGrow: 1,
                        bgcolor: 'background.neutral',
                      }}
                    >
                      <Typography variant="h4">Current Call flow</Typography>
                    </Paper>
                    <StyledOutlinedInput
                      // value={filterName}
                      onChange={''}
                      sx={{ width: 240, border: 'none' }}
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
                    <TableContainer>
                      <Table>
                        <TableBody>
                          {currentData?.map((item, index) => {
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
                                  <Typography variant="subtitle1">
                                    Call flow {item.date}
                                  </Typography>
                                  <Typography variant="subtitle2">
                                    {item.duration}
                                    {item.date}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography variant="subtitle1">
                                    {item.schedule_time}
                                  </Typography>
                                  <Typography variant="subtitle2">
                                    {item.schedule_day}
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
                  </Stack>
                  <Stack marginTop={3}>
                    <Paper
                      sx={{
                        p: 1.5,
                        flexGrow: 1,
                        bgcolor: 'background.neutral',
                      }}
                    >
                      <Typography variant="h4">Inactive Call flows</Typography>
                    </Paper>
                    <StyledOutlinedInput
                      // value={filterName}
                      onChange={''}
                      sx={{ width: 240, border: 'none' }}
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
                    <TableContainer>
                      <Table>
                        <TableBody>
                          {InactiveData?.map((item, index) => {
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
                                      (item.status === 'Inactive' && 'error') ||
                                      'success'
                                    }
                                  >
                                    {item.status}
                                  </Label>
                                </TableCell>
                                <TableCell>
                                  <Typography variant="subtitle1">
                                    Call flow {item.date}
                                  </Typography>
                                  <Typography variant="subtitle2">
                                    {item.duration}
                                    {item.date}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography variant="subtitle1">
                                    {item.schedule_time}
                                  </Typography>
                                  <Typography variant="subtitle2">
                                    {item.schedule_day}
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
                  </Stack>
                </Box>
              </Card>
              ):(
                <Modal
                open={add}
                handleClose={() => {
                  setAdd(false);
                }}
                modalTitle={'Create Call Flow'}
              >
                <FormikProvider value={formik}>
                  <Form noValidate autoComplete="off">
                  <Grid container justifyContent="center" >
                  <Grid item xs={12} md={10}>
                  {/* <Card sx={{ p: 3 }}> */}
                    <Stack spacing={3}>
                      <LabelStyle>Welcome Greeting</LabelStyle>
                        <TextField
                          fullWidth
                          minRows={3}
                          maxRows={7}
                          label=""
                          {...getFieldProps('fname')}
                          error={Boolean(touched.fname && errors.fname)}
                          helperText={touched.fname && errors.fname}
                        />
                        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                       Need a Menu
                  </Typography>
                    <FormControlLabel control={<Switch defaultChecked />} label="Yes" />
                    <LabelStyle>Menu Message</LabelStyle>
                        <TextField
                          fullWidth
                          minRows={3}
                          maxRows={7}
                          label=""
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        
                        <Autocomplete
                              fullWidth
                              id="combo-box-demo"
                              options={STATUS}
                              getOptionLabel={(state) => state.id}
                              // sx={{ width: 400 }}
                              renderInput={(params) => (
                                <TextField {...params} label="Press For" />
                              )} // Update the label
                            /> 
                           
                            
                         <Autocomplete
                              fullWidth
                              id="combo-box-demo"
                              options={DESIGN}
                              getOptionLabel={(state) => state.name}
                              // sx={{ width: 400 }}
                              renderInput={(params) => (
                                <TextField {...params} label="Department" />
                              )} // Update the label
                            /> 
                            
                      </Stack>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                     <Button variant='outlined'>Add More Department</Button>
                     </Stack>
                     <Stack
                            direction={{ xs: 'column', sm: 'row', md: 'column' }}
                            spacing={{ xs: 3, sm: 2 }}
                          >
                            <Stack direction="row" alignItems="center" spacing={1}>
                            <Autocomplete
                              fullWidth
                              id="combo-box-demo"
                              options={DAYS}
                              getOptionLabel={(state) => state.name}
                              // sx={{ width: 400 }}
                              renderInput={(params) => (
                                <TextField {...params} label="Start Day" />
                              )} // Update the label
                            /> 
                            <Autocomplete
                              fullWidth
                              id="combo-box-demo"
                              options={DAYS}
                              getOptionLabel={(state) => state.name}
                              // sx={{ width: 400 }}
                              renderInput={(params) => (
                                <TextField {...params} label="End Day" />
                              )} // Update the label
                            /> 
                            </Stack>
                            
                          </Stack>
                          <Stack
                            direction={{ xs: 'column', sm: 'row', md: 'column' }}
                            spacing={{ xs: 3, sm: 2 }}
                          >
                             <Stack direction="row" alignItems="center" spacing={1}>
                            <Box
                component={ MobileTimePicker}
                label="Start Time"
                 value={values.start}
                 onChange={(time) => setFieldValue('start', time)}
                renderInput={(params) => (
                  <TextField size="small" {...params} fullWidth />
                )}
              />
               <Box
                component={ MobileTimePicker }
                label="End Time"
                 value={values.end}
                 onChange={(time) => setFieldValue('start', time)}
                renderInput={(params) => (
                  <TextField size="small" {...params} fullWidth />
                )}
              />
                </Stack>           
                          </Stack>
                          
                    <FormControlLabel control={<Switch defaultChecked />} label="Do you want call flow for non working hours?" />
                  
                    <FormControlLabel control={<Switch defaultChecked />} label="Do you want call flow for non working days?" />
                   
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end',gap:1 }}>
                        <Button type="submit" variant="contained" onClick={()=>{setAdd(false)}} >
                        Submit
                        </Button>
                        <Button type="submit" variant="outlined" onClick={()=>{setAdd(false)}} >
                        Cancel
                        </Button>
                      </Box>
                    </Stack>
                  
                </Grid>
                  </Grid>
                   
                  </Form>
                </FormikProvider>
              </Modal>
              )}
            </>
          ):(
            <Grid container spacing={2} margin={2} pr={2}>
      <Grid item xs={12} md={6}>
        
         <Card>
         <Stack sx={{p:2}} spacing={3}>
                      <LabelStyle>Music  On Hold</LabelStyle>
                      <Typography variant='overline' sx={{color:'text.secondary'}}>Music played when caller is on hold</Typography>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <Button variant='outlined' onClick={handleAttach}>
                            Select File
                        </Button> 
                        </Stack>
                        <Paper  sx={{borderRadius:10,bgcolor: 'background.neutral',width:'50%' }}>

                          <Stack sx={{display:'flex',flexDirection:'row'}}  >
                             <IconButton onClick={HandlePlaybtn}>
                              {!playbtn ?(<PlayCircleFilled/>):(<PauseCircle/>)}
                             </IconButton>
                             <Slider sx={{width:100,mt:1}} aria-label="Volume" value={value} onChange={handleChange} />
                             <IconButton onClick={HandleVolume}>
                             {!volumebtn?(<VolumeUp/>):(<VolumeOff/>)}
                             </IconButton>
                             <IconButton sx={{
            color: (theme) => theme.palette.common.white, 
            '&.Mui-checked': {
              color: (theme) => theme.palette.common.white 
            }
          }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          size="small">
                              <MoreVert/>
                             </IconButton>
                             <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Download  <Download/></MenuItem>
          <MenuItem onClick={handleClose}>Playback Speed  <SlowMotionVideo/></MenuItem>
        </Menu>
                            </Stack> 
                        </Paper>
                      </Stack>
                      <Stack sx={{p:2}} spacing={3}>
                      <LabelStyle>On wrong input</LabelStyle>  
                      <Typography  sx={{color:'text.secondary'}}>
                      Response when the caller press wrong input
                      </Typography>
                      <TextField
                          fullWidth  
                          value={'Sorry wrong input'}
                        />
                      </Stack>
         </Card>
       
        </Grid>
        <Grid item xs={12} md={6}>
        
        <Card>
        <Stack sx={{p:2}} spacing={3}>
                     <LabelStyle>Menu Repeat</LabelStyle>
                     <Typography sx={{color:'text.secondary'}}>Number of times menu is being re-played for callers

                      </Typography>
                      <Grid container spacing={1} alignItems="center">
      <Grid item>
        <TextField fullWidth type="number" label="" value={number} />
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <IconButton onClick={handleIncrement}>
            <ArrowDropUp />
          </IconButton>
          <IconButton onClick={handleDecrement}>
            <ArrowDropDown />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>

                     </Stack>
                     <Stack sx={{p:2}} spacing={3}>
                     <LabelStyle>Call Recording</LabelStyle>  
                     <Typography  sx={{color:'text.secondary'}}>
                     Recordings of all calls made to or from your call center number
                     </Typography>
                     <Autocomplete
                              fullWidth
                              id="combo-box-demo"
                              options={ABLE}
                              getOptionLabel={(state) => state.name}
                              // sx={{ width: 400 }}
                              renderInput={(params) => (
                                <TextField {...params}  />
                              )} // Update the label
                            /> 
                     </Stack>
        </Card>
      
       </Grid>
       <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start', }}>
                 
                  <Button variant="outlined" type="submit" >
                    Save
                  </Button>
                </Box>
        </Grid>
          )}
        </Stack>
      </Container>
      <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
    </Page>
  )
}
