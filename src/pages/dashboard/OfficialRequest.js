
import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { sentenceCase } from 'change-case';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import {
     Container,Grid,IconButton,
     Stack,Box,Button, TableRow,
     TableBody, Checkbox,Card,
     TableCell,Typography,
     TableContainer,Table,
     TablePagination,
     TextField,
     Switch,
     FormControlLabel,
     Autocomplete,
     Divider,
     Paper,
     Popover,
    } from '@material-ui/core';
    import { useTheme } from '@material-ui/core/styles';
import { experimentalStyled as styled } from '@material-ui/core/styles';
    import { Icon } from '@iconify/react';
    import plusFill from '@iconify/icons-eva/plus-fill';
    // redux
    import { LoadingButton, MobileDatePicker } from '@material-ui/lab';
    // routes
    // components
    import Page from '../../components/Page';
    import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
    import Modal from '../../components/_dashboard/blog/ProjectModel';
import { UserListHead, UserMoreMenu } from 'src/components/_dashboard/user/list';
import Label from 'src/components/Label';
import { useSnackbar } from 'notistack';
import { UploadFile } from '@material-ui/icons';
import OfficialRequestSearch from 'src/components/_dashboard/official-request/OfficialRequestSearch';
import InfiniteScroll from 'react-infinite-scroll-component';
import OfficialCard from 'src/components/_dashboard/official-request/OfficialCard';
import Scrollbar from 'src/components/Scrollbar';
// import IMAGE from '../../../public/static/mock-images/avatars/avatar_default1.jpg'
//
const OFFICIAL=[
  {
  id:0,
  name:'Request ',
  status:'success',
  time_period:'2',
  message:2,
  request:3,
  image:'/static/mock-images/avatars/avatar_default1.jpg',
  people:[
    {id:65,name:'tom',image:'https://images.unsplash.com/photo-1488716820095-cbe80883c496?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW1lcmljYW4lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D'},
    {id:56,name:'head',image:'https://images.unsplash.com/photo-1488716820095-cbe80883c496?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW1lcmljYW4lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D'},
    {id:34,name:'albi',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWVxPdQFbBpKXWT1kwW8IescmGrkeL7DWmwQ&usqp=CAU'},
  ]
  },
  {
    id:1,
    name:'Request Sample',
    status:'Rejected',
    time_period:'2',
    message:0,
    request:2,
    image:'/static/mock-images/avatars/avatar_default1.jpg',
    people:[
      
      {id:230,name:'denvor',image:'sdfdsf'},
    ]
    },
    {
      id:2,
      name:'Sample Request',
      status:'open',
      time_period:'2',
      message:1,
      request:0,
      image:'../static/mock-images/avatars/avatar_default1.jpg',
      people:[
        {id:40,name:'nairobi',image:'sdfdsf'},
        {id:80,name:'lisbon',image:'sdfdsf'},
      ]
      },
      {
        id:3,
        name:'Sample ',
        status:'open',
        time_period:'2',
        message:0,
        request:3,
        image:'../static/mock-images/avatars/avatar_default1.jpg',
        people:[
          {id:7,name:'john',image:'sdfdsf'},
          
        ]
        },
        {
          id:4,
          name:'Request',
          status:'Rejected',
          time_period:'2',
          message:1,
          request:1,
          image:'../static/mock-images/avatars/avatar_default1.jpg',
          people:[
            {id:10,name:'tom',image:'sdfdsf'},
            {id:90,name:'sam',image:'sdfdsf'},
          ]
          },
          {
            id:5,
            name:'Free Request',
            status:'success',
            time_period:'2',
            message:0,
            request:2,
            image:'../static/mock-images/avatars/avatar_default1.jpg',
            people:[
              {id:0,name:'katty',image:'sdfdsf'},
              {id:1,name:'perry',image:'sdfdsf'},
              {id:2,name:'latham',image:'sdfdsf'},
            ]
            },
            {
              id:6,
              name:'Request',
              status:'success',
              time_period:'2',
              message:0,
              request:5,
              image:'../static/mock-images/avatars/avatar_default1.jpg',
              people:[
                {id:32,name:'katty',image:'sdfdsf'},
                {id:54,name:'katty',image:'sdfdsf'},
                {id:23,name:'katty',image:'sdfdsf'},
              ]
              },
              
]
const VALUE=[
    {id:0,value:'Products'},
    {id:1,value:'Price'},
    {id:2,value:'Quantity'},
    {id:3,value:'Subtotal'},
    {id:4,value:'Product ID'},
    {id:5,value:'Discount'},
    {id:6,value:'Total Discount'},
]
const SKILLS=[
    {id:0,value:'Cultivation'},
    {id:1,value:'Medical'},
    {id:2,value:'Testing lab'},
    {id:3,value:'Private Label'},
    {id:4,value:'Retail'},
    {id:5,value:'Low MOQ'},
    {id:6,value:'Legal'},
    {id:7,value:'Distribution'},
]
const DATA=[
    {id:0,value:'MDO sign 4*8 Double Face'},
    {id:1,value:'MDO sign 4*8 Single Face'}
]
const Service = [
  { title: 'All Requests' },
  { title: 'RFI Requests' },
  { title: 'RFP Requests' },
  { title: 'Assignments' },
];
export default function OfficialRequest(){
  const theme = useTheme()
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const fileInputRef = useRef(null);
    const [open,setOpen] = useState(false)
    const [openPreview,setPreview] = useState(false)
    const [services, setServices] = useState([]);
    const [anchorElServices, setAnchorElServices] = useState(null);
    const handleClickServices = (event) => {
      setAnchorElServices(event.currentTarget);
    };
    const handleAttach = () => {
        fileInputRef.current.click();
      };
      const openServices = Boolean(anchorElServices);
      const handleClose = () => {
        setAnchorElServices(null);
      };
    const NewUserSchema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
    });
  //
  const LabelStyle = styled(Typography)(({ theme }) => ({
      ...theme.typography.subtitle2,
      color: theme.palette.text.secondary,
    //   marginBottom: theme.spacing(1)
    }));
    const LabelStyleHead =styled(Typography)(({theme})=>({
      ...theme.typography.h5 ,
      color:theme.palette.text.secondary,
    }))
    //
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
    
      },
      validationSchema: NewUserSchema,
      onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
        try {
          await fakeRequest(500);
          resetForm();
         
          enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
          
        } catch (error) {
          console.error(error);
         
        }
      }
    });
  
    const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
    return(
        <Page title="Official request: list | Sign Wise Solutions">
      <Container>    
      <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
        <HeaderBreadcrumbs
          heading="Official Requests"
          />
          <Box>
        <Button
              onClick={()=>{
                 setOpen(!open)
              }}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
             Add New Requests
            </Button>
        </Box>
        </Stack>
        {open ? (
            <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                
                <Grid item xs={12} md={10}>
                  <Card sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <Stack flexDirection={'column'}>
                            <LabelStyle>Name</LabelStyle>
                        <TextField
                        //   fullWidth
                        sx={{width:400}}
                          label="Requested Name"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                        </Stack>
                      </Stack>
                      <LabelStyle>Description</LabelStyle>
                      <TextField
                          fullWidth
                          multiline
                          minRows={3}
                          maxRows={7}
                          label="keep the summary brief and make it communicates"
                          {...getFieldProps('description')}
                          error={Boolean(touched.description && errors.description)}
                          helperText={touched.description && errors.description}
                        />
                        <LabelStyle>Attach File</LabelStyle>
                        <Stack
                      sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                
                        <Button variant='outlined' onClick={handleAttach}>
                           Upload <UploadFile/>
                        </Button>
                        </Stack>
                        <LabelStyle>Skills or services required</LabelStyle>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                      <Autocomplete
                    multiple
                   sx={{width:400}}
                    id="combo-box-demo"
                    options={SKILLS}
                    renderInput={(params) => (
                        <TextField {...params} label="What skills or services are required" />
                      )}
                    getOptionLabel={(option) => option.value}
                   
                  />
                      </Stack>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                      <Box
                      component={ MobileDatePicker }
                      label="Submission deadline"
                       value={values.start}
                      onChange={(date) => setFieldValue('start', date)}
                      renderInput={(params) => (
                        <TextField size="small" {...params} fullWidth />
                      )}
                    />
                        <Box
                      component={ MobileDatePicker }
                      label="Participation ends (Optional)"
                       value={values.end}
                      onChange={(date) => setFieldValue('end', date)}
                      renderInput={(params) => (
                        <TextField size="small" {...params} fullWidth />
                      )}
                    />
                      </Stack>
                      <Divider/>
                      <LabelStyleHead>Products</LabelStyleHead>
                      <Typography></Typography>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                      <Autocomplete
                   sx={{width:400}}
                    id="combo-box-demo"
                    options={DATA}
                    renderInput={(params) => (
                        <TextField {...params} label="Select a product:" />
                      )}
                    getOptionLabel={(option) => option.value}
                   
                  />
                      </Stack>
                      <LabelStyle>SelectedProducts</LabelStyle>
                      <Grid container>
                         <Grid item flexDirection={{ xs: 'column', sm: 'row',md:'row' }}>
                            {VALUE?.map((val)=>(                             
                           <Typography>{val.value}</Typography>                        
                            ))}
                        
                         </Grid>
                      </Grid>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <Stack>
                        <LabelStyle>Extra Discount</LabelStyle>
                        <TextField
                          sx={{width:400}}
                          type='number'
            
                          label="Extra Discount"
                          {...getFieldProps('number')}
                          error={Boolean(touched.number && errors.number)}
                          helperText={touched.number && errors.number}
                        />
                        <Typography sx={{color:'text.secondary'}}>Total:0.0</Typography>
                        <Typography sx={{color:'text.secondary'}}>Total Discount: 0.00</Typography>
                      </Stack>
                      <FormControlLabel
                control={<Switch {...getFieldProps('isPublic')} color="primary" />}
                labelPlacement="end"
                label="Use Custom Welcome Message"
                sx={{ mt: 5 }}
              />
                      </Stack>
                     <LabelStyle>Request state</LabelStyle>
                       <Typography>While in draft mode, clients you add to request tasks won't be notified</Typography>
                       <FormControlLabel
                control={<Switch {...getFieldProps('idraft')} color="primary" />}
                labelPlacement="end"
                label="Draft"
                sx={{ mt: 5 }}
              /> 
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end',gap:1 }}>
                        <LoadingButton type="submit" variant="contained" onClick={()=>{setOpen(false)}} >
                          Save Request
                        </LoadingButton>
                        <Button variant="outlined" type="submit" onClick={()=>setPreview(!openPreview)}>
                         Preview
                        </Button>
                        <Button variant="outlined" type="submit" onClick={()=>{setOpen(false)}}>
                          Cancel
                        </Button>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        ):(<>
         <Stack mb={5}  direction={{ xs: 'column', sm: 'row' }} 
         spacing={{ xs: 3, sm: 2 }} alignItems="center" 
         justifyContent="space-between">
          <Stack direction={{ xs: 'column', sm: 'row' }} 
         spacing={{ xs: 3, sm: 2 }} alignItems="center" 
         justifyContent="space-between">
          <Typography variant="overline" onClick={handleClickServices} sx={{ color:'text.secondary'}}>    
          Filter by
      </Typography>
      <OfficialRequestSearch/> 
      <Popover
        id="popover-services"
        open={openServices}
        anchorEl={anchorElServices}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Grid container sx={{ minWidth: '200px' }} spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              options={Service}
              disableCloseOnSelect
              value={services}
              onChange={(event, newValue) => {
                setServices(newValue);
              }}
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    sx={{ width: '24px', height: '24px' }} 
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Filter by" placeholder="Filter by" />
              )}
            />
          </Grid>
        </Grid>
      </Popover>
          </Stack>
           
           <Stack flexDirection='row' alignItems='center'>
            <Typography variant='overline'>sort by</Typography>
           <Button variant='outlined'>Recently Updated</Button>
           </Stack>
         </Stack>
         <Scrollbar>
          <Grid container spacing={3}>
            {OFFICIAL?.map((data, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
              <OfficialCard card={data} key={index} />
            </Grid>
            ))}
          </Grid>
          </Scrollbar>
        </>)}
        {openPreview&&(
            <Modal
            open={openPreview}
          handleClose={() => {
            setPreview(false);
          }}
          modalTitle={'Preview'}
            >
              <Grid container sx={{ justifyContent: 'center' }} spacing={3}>
      <Grid item xs={12} md={10}>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            spacing={3}
          >
            <Stack
              direction="row"
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2">Name: Sample</Typography>
              <Typography variant="subtitle2">
                Description:
              </Typography>
            </Stack>
            <Stack
              direction="row"
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2">Skills or services required: </Typography>
              <Typography variant="subtitle2">
              Submission deadline: 
              </Typography>
            </Stack>
            <Stack
              direction="row"
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2">Participation ends:</Typography>
              <Typography variant="subtitle2">Minimum Budget:</Typography>
            </Stack>
            <Stack
              direction="row"
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2">
              Maximum Budget: 
              </Typography>
              <Typography variant="subtitle2">
              Budget Settings:
              </Typography>
            </Stack>
            <Stack
              direction="row"
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2">
              Use custom welcome message:No
              </Typography>
              <Typography variant="subtitle2">
              Subject :Not Applicable
              </Typography>
            </Stack>
            <Stack
              direction="row"
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2">
              Email content:
              </Typography>
              <Typography variant="subtitle2">
              Request state:Open
              </Typography>
            </Stack>
          
          </Stack>
      </Grid>
    </Grid>
            </Modal>
        )}
          </Container>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
          </Page>
    )
}