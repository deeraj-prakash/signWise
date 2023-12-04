
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import {
     Container,Grid,IconButton,
     Stack,Box,Button, TableRow,
     TableBody, Checkbox,Card,
     TableCell,Typography,
     TableContainer,Table,
     TablePagination,useTheme
    } from '@material-ui/core';
    import { Icon } from '@iconify/react';
    import plusFill from '@iconify/icons-eva/plus-fill';
    // redux
    // import { useDispatch, useSelector } from '../../redux/store';
    // import { getPost, getRecentPosts } from '../../redux/slices/blog';
    import { LoadingButton } from '@material-ui/lab';
    // routes
    import { PATH_DASHBOARD } from 'src/routes/paths.js';
    // components
    import Page from 'src/components/Page.js';
    // import Markdown from '../../components/Markdown';
    import Scrollbar from 'src/components/Scrollbar.js';
    import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs.js';
    // import UserList from './UserList';
    // import Modal from '../../components/_dashboard/blog/ProjectModel';
// import { UserListHead, UserMoreMenu } from 'src/components/_dashboard/user/list';
// import { BlogPostsSearch } from 'src/components/_dashboard/blog/index.js';
// import  CustomerOrderSearch  from 'src/components/_dashboard/blog/CustomerOrderSearch.js';
// import  CustomerOrderMenu  from 'src/components/_dashboard/user/list/CustomerOrderMenu.js';
import  CustomerOrderList  from 'src/pages/dashboard/CustomerOrderList.js';
import Label from 'src/components/Label';


export default function CustomerOrders(){

    return(
        <Page title="Customer Orders | Sign-Wise Solution">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
        <HeaderBreadcrumbs
          heading="Customer Orders"
        />
        </Stack>

        <CustomerOrderList />

      </Container>
    </Page>
  );
}