
import * as Yup from 'yup';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';

import {
     Container,Grid,IconButton,
     Stack,Box,Button, TableRow,
     TableBody, Checkbox,Card,
     TableCell,Typography,
     TextField,Table,
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
    import { Link as RouterLink } from 'react-router-dom';
    // import Markdown from '../../components/Markdown';
    // import Scrollbar from 'src/components/Scrollbar.js';
    import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs.js';
    // import UserList from './UserList';
    import Modal from 'src/components/_dashboard/blog/ProjectModel.js';
// import { UserListHead, UserMoreMenu } from 'src/components/_dashboard/user/list';
// import Label from 'src/components/Label';
// import  ProductsSearch  from 'src/components/_dashboard/blog/ProductsSearch.js';
// import  ProductsMenu  from 'src/components/_dashboard/user/list/ProductsMenu.js';
import  CustomFieldTemplateList  from 'src/pages/dashboard/CustomFieldTemplateList';


export default function AllCustomFieldTemplates(){
    
    return(
        <Page title="All Custom Field Templates | Sign-Wise Solution">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
        <HeaderBreadcrumbs
          heading="All Custom Field Templates"
        />
        <Box>
        <Button
              component={RouterLink}
              to={`${PATH_DASHBOARD.customfieldtemplate.create}`}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
             Create CustomField Template
            </Button>
        </Box>
        
        </Stack>

        <CustomFieldTemplateList />
        
      </Container>
    </Page>
  );
}