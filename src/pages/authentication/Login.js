import { Link as RouterLink } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import robotsIcon from '@iconify/icons-file-icons/robots';
// material
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import { Box, Card,Grid, Stack, Link, Alert, Tooltip, Container, Typography,TextField,
   Button,IconButton, Popover,  
} from '@material-ui/core';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { LoginForm } from '../../components/authentication/login';
import AuthFirebaseSocials from '../../components/authentication/AuthFirebaseSocial';
import { useEffect, useRef, useState } from 'react';
import ChatbotHeader from 'src/components/_dashboard/chatbot/ChatbotHeader';
import ChatbotInput from 'src/components/_dashboard/chatbot/ChatbotInput';
import ChatbotMessageList from 'src/components/_dashboard/chatbot/ChatbotMessageList';
import Scrollbar from 'src/components/Scrollbar';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------
const predefinedComments = [
  {
    id: 2,
    author: {
      name: 'John Doe',
      avatarUrl: '/static/mock-images/avatars/avatar_1.jpg',
    },
    createdAt: new Date().toISOString(),
    message: 'Hey can you track my order .'
  },
  {
    id: 1,
    author: {
      name: 'Jane Smith',
      avatarUrl: '/static/mock-images/avatars/avatar_2.jpg',
    },
    createdAt: new Date().toISOString(),
    message: 'Hello ,Let me know your order id',
  },

  {
      id: 4,
      author: {
        name: 'John Doe',
        avatarUrl: '/static/mock-images/avatars/avatar_3.jpg',
      },
      createdAt: new Date().toISOString(),
      message: 'My Order id - AD6545',
    },

    {
      id: 3,
      author: {
        name: 'Jane Smith',
        avatarUrl: '/static/mock-images/avatars/avatar_4.jpg',
      },
      createdAt: new Date().toISOString(),
      message: 'Hey this is a sample.',
    },  

];
export default function Login() {
  const theme = useTheme()
  const { method, login } = useAuth();
  const commentInputRef = useRef(null);
  const fileInputRef = useRef(null);
 const [openPop,setOpenPop] = useState(false)
 const [openForm,setOpenForm] = useState(false)
 const [message, setMessage] = useState('');
 const [displayedComments, setDisplayedComments] = useState(predefinedComments);
 const HandleClose=()=>{
  setOpenPop(false)
 }
 const handleChangeMessage = (event) => {
  setMessage(event.target.value);
};

const handleClickAttach = () => {
  fileInputRef.current.click();
};

const handleClickComment = () => {
  commentInputRef.current.focus();
};
  const handleLoginAuth0 = async () => {
    try {
      await login();
    } catch (error) {
      console.error(error);
    }
  };
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    
    
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
    //    name: currentUser?.name || '',
   
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
       
      
       
      } catch (error) {
        console.error(error);
      
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
  return (
    <RootStyle title="Login | SignWise Solutions">
      {/* <AuthLayout>
        Click Here &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink}
         to={PATH_AUTH.register}
         >
          Get started
        </Link>
      </AuthLayout> */}

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome To SignWise
          </Typography>
          <img src="/static/illustrations/illustration_login1.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
        <Stack direction="column" alignItems="center" sx={{ mb: 5 }}>
          <Tooltip title={method}>
            <Box component="img" src={`/static/auth/ic_${method}.png`} sx={{ width: 102, height: 102, mb: 1 }} />
          </Tooltip>
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Login in to SignWise Solutions
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Box>
        </Stack>
        
          {method === 'firebase' && <AuthFirebaseSocials />}

          <Alert severity="info" sx={{ mb: 3 }}>
            Use email : <strong>admin@signwise.com</strong> / password :<strong>&nbsp;signwise123</strong>
          </Alert>

          {method !== 'auth0' ?  (
            <LoginForm component={RouterLink} to={PATH_DASHBOARD.root}/>
          ) : (
            <Button fullWidth size="large" type="submit" variant="contained" component={RouterLink} to={PATH_DASHBOARD.root}>
              Login
            </Button>
          )}

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              {/* Click Here&nbsp;
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                Get started
              </Link> */}
            </Typography>
          </MHidden>
        </ContentStyle>
        
        {/* This is for the Popover in login  chat bot */}
        <Popover
        open={Boolean(openPop)}
        anchorEl={openPop}
        onClose={HandleClose}
        
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'center', horizontal: 'right' }}
        >
        <Grid container>
        <Box sx={{ width:500,height:550,p:2, bgcolor: 'background.neutral',borderRadius:3,
        border:'2px solid',borderColor:theme.palette.common.white}}>
        <ChatbotHeader setOpenForm={setOpenForm} openForm={openForm}/> 
        {openForm && (
           <FormikProvider value={formik}>
           <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
             <Grid container>
               <Grid sx={{mt:6,p:1}} item xs={12} md={12}>
               <TextField
                    fullWidth
                    sx={{pb:1}}
                    label="First Name"
                    {...getFieldProps('fname')}
                    error={Boolean(touched.fname && errors.fname)}
                    helperText={touched.fname && errors.fname}
                  />
                  <TextField
                    fullWidth
                    sx={{pb:1}}
                    label="Last Name"
                    {...getFieldProps('lname')}
                    error={Boolean(touched.lname && errors.lname)}
                    helperText={touched.lname && errors.lname}
                  />
                  <TextField
                    fullWidth
                    sx={{pb:1}}
                    type='number'
                    label="Phone"
                    {...getFieldProps('number')}
                    error={Boolean(touched.number && errors.number)}
                    helperText={touched.number && errors.number}
                  />
                  <TextField
                    fullWidth
                    sx={{pb:1,}}
                    type='email'
                    label="Email"
                    {...getFieldProps('mail')}
                    error={Boolean(touched.mail && errors.mail)}
                    helperText={touched.mail && errors.mail}
                  />
                  <Box sx={{  display: 'flex', justifyContent: 'flex-end', }}>
                 
                 <Button variant="outlined" type="submit" onClick={()=>{setOpenForm(false)}}>
                  Save
                 </Button>
               </Box>
                 </Grid>
                 
                 </Grid>
                 </Form>
                 </FormikProvider>
        )}
       {!openForm && (
          <>
         
          <ChatbotMessageList displayedComments={displayedComments}/>
         
          <ChatbotInput 
          message={message}
           setMessage={setMessage}
            fileInputRef={fileInputRef}
             commentInputRef={commentInputRef}
             handleClickAttach={handleClickAttach}
             handleChangeMessage={handleChangeMessage} />
          </>
          )}
        </Box>
        </Grid>
        </Popover>
      </Container>
      {!openPop && (
  <Box
    justifyContent="flex-end"
    sx={{
      ml: 2,
      position: "fixed",
      bottom: 16, 
      right: 16,
      zIndex: 1000, 
    }}
  >
    <IconButton  onClick={() => setOpenPop(!openPop)}>
      {/* <Icon  icon={robotsIcon} width={40} height={40} /> */}
      <img  alt='icon' width='50px' height='50px' src='../Gif/chat-ai.gif'/>
    </IconButton>
  </Box>
)}

    </RootStyle>
  );
}
