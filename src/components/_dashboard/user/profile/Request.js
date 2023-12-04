
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';// Change this import path to your actual sentenceCase function
import { useNavigate, useParams } from 'react-router-dom';

// import { Form, FormikProvider, useFormik } from 'formik';
import {
     Container,Stack,
    } from '@material-ui/core';
    // import Label from 'src/components/Label';
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
    import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs.js';
    // import UserList from './UserList';
    // import Modal from '../../components/_dashboard/blog/ProjectModel';
// import { UserListHead, UserMoreMenu } from 'src/components/_dashboard/user/list';
// import  RequestView from 'src/components/_dashboard/user/list/RequestView.js';
import  RequestList from 'src/pages/dashboard/RequestList.js';
// import { tr } from 'faker/lib/locales';

export default function Requests(){
    const navigate = useNavigate()
     
    return(
    <Page title="Requests | Sign-Wise Solution">
      <Container>

        <RequestList />
        
      </Container>
    </Page>
  );
}