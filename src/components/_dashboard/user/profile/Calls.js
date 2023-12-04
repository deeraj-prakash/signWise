
// import * as Yup from 'yup';
// import { useEffect, useState } from 'react';
// import { sentenceCase } from 'change-case';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Form, FormikProvider, useFormik } from 'formik';
import {
     Container,
    } from '@material-ui/core';
    // import { Icon } from '@iconify/react';
    // import plusFill from '@iconify/icons-eva/plus-fill';
    // redux
    // import { useDispatch, useSelector } from '../../redux/store';
    // import { getPost, getRecentPosts } from '../../redux/slices/blog';
    // import { LoadingButton } from '@material-ui/lab';
    // routes
    // import { PATH_DASHBOARD } from 'src/routes/paths.js';
    // components
    import Page from 'src/components/Page.js';
    // import Markdown from '../../components/Markdown';
    // import Scrollbar from 'src/components/Scrollbar.js';
    // import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs.js';
    import ProfileCalls from 'src/pages/dashboard/ProfileCalls.js';
    
    // import UserList from './UserList';
    // import Modal from '../../components/_dashboard/blog/ProjectModel';
// import { UserListHead, UserMoreMenu } from 'src/components/_dashboard/user/list';
// import { tr } from 'faker/lib/locales';

export default function Calls(){
   
   
    return(
        <Page title="Calls | Sign-Wise Solution">
      <Container>
  
        <ProfileCalls />

      </Container>
    </Page>
  );
}