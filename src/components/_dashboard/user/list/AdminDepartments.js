
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
    // import Markdown from '../../components/Markdown';
    // import Scrollbar from 'src/components/Scrollbar.js';
    import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs.js';
    // import UserList from './UserList';
    import Modal from 'src/components/_dashboard/blog/ProjectModel.js';
// import { UserListHead, UserMoreMenu } from 'src/components/_dashboard/user/list';
// import Label from 'src/components/Label';
// import  ProductsSearch  from 'src/components/_dashboard/blog/ProductsSearch.js';
// import  ProductsMenu  from 'src/components/_dashboard/user/list/ProductsMenu.js';
import  AllDepartmentsList  from 'src/pages/dashboard/AllDepartmentsList';


export default function AllDepartments(){
    const [add, setAdd] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    return(
        <Page title="Departments | Sign-Wise Solution">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
        <HeaderBreadcrumbs
          heading="All Departments"
        />
        <Box>
        <Button
              onClick={() => {
                setAdd(!add);
               }}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
             Add Departments
            </Button>
        </Box>
        <Modal
            open={add}
            handleClose={() => {
                setAdd(false);
            }}
            modalTitle={'Add Department'}
            >
               <Stack>
                    <TextField
                        name="Name" // Add the name prop to the TextField component
                        label="Name"
                        placeholder="Name"
                        fullWidth // add this line to make the Autocomplete component full width
                    ></TextField>
                </Stack>

              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <LoadingButton type="submit" variant="contained" onClick={() => { setAdd(false) }} loading={isSubmitting}>
                      {' Save '}
                    </LoadingButton>
                    <Button variant="outlined" type="submit" onClick={() => { setAdd(false) }}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>        
        </Modal>
        </Stack>

        <AllDepartmentsList />
        
      </Container>
    </Page>
  );
}