
// import * as Yup from 'yup';
// import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';// Change this import path to your actual sentenceCase function
// import { useNavigate, useParams } from 'react-router-dom';

// import { Form, FormikProvider, useFormik } from 'formik';
import {
     Container,
     Stack,Button, 
     
    } from '@material-ui/core';
    // import Label from 'src/components/Label';
    import { Icon } from '@iconify/react';
    import plusFill from '@iconify/icons-eva/plus-fill';
    // redux
    // import { useDispatch, useSelector } from '../../redux/store';
    // import { getPost, getRecentPosts } from '../../redux/slices/blog';
    // import { LoadingButton } from '@material-ui/lab';
    // routes
    import { PATH_DASHBOARD } from 'src/routes/paths.js';
    import { Link as RouterLink } from 'react-router-dom';
    // components
    import Page from 'src/components/Page.js';
    // import Markdown from '../../components/Markdown';
    // import Scrollbar from 'src/components/Scrollbar.js';
    import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs.js';
    // import UserRoleView from 'src/components/_dashboard/user/list/UserRoleView.js';
    // import UserList from './UserList';
    // import Modal from '../../components/_dashboard/blog/ProjectModel';
// import { UserListHead, UserMoreMenu } from 'src/components/_dashboard/user/list';
import  UserRoleList from 'src/pages/dashboard/UserRoleList.js';

// import { tr } from 'faker/lib/locales';

export default function UserRole(){
    
    return(
    <Page title="User Role | Sign-Wise Solution">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
        <HeaderBreadcrumbs
        //   heading="Requests"
        />
        {/* <Box>
        <Button
              onClick={()=>{
                navigate(PATH_DASHBOARD.onboard.create)
              }}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
             Create New Workflows
            </Button>
        </Box> */}
        <Button
            variant="text"
            sx={{ width: 'fit-content' , marginBottom: '20px'}}
            startIcon={<Icon icon={plusFill} />}
            component={RouterLink}
            to={PATH_DASHBOARD.adminAccount.userRoleAdd}
          >
          Add User Roles
          </Button>
        </Stack>
        <UserRoleList />
        
      </Container>
    </Page>
  );
}