
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';// Change this import path to your actual sentenceCase function
import { useNavigate, useParams } from 'react-router-dom';

import { Form, FormikProvider, useFormik } from 'formik';
import {
     Container,Grid,
     Stack,Box,Button,TextField
    } from '@material-ui/core';
    import { LoadingButton } from '@material-ui/lab';
    // import Label from 'src/components/Label';
    import Modal from 'src/components/_dashboard/blog/ProjectModel.js';
   
    import { Icon } from '@iconify/react';
    import plusFill from '@iconify/icons-eva/plus-fill';
    // import { experimentalStyled as styled } from '@material-ui/core/styles';
    
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
    // import UserRoleView from 'src/components/_dashboard/user/list/UserRoleView.js';
    // import UserList from './UserList';
    // import Modal from '../../components/_dashboard/blog/ProjectModel';
// import { UserListHead, UserMoreMenu } from 'src/components/_dashboard/user/list';
import  SkillsAndServiceList from 'src/pages/dashboard/SkillsAndServiceList.js';
// import  SkillsAndServiceView from 'src/components/_dashboard/user/list/SkillsAndServiceView.js';
// import { tr } from 'faker/lib/locales';

export default function SkillsAndService(){
    
    const [add, setAdd] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
      
    return(
    <Page title="Skills And Service | Sign-Wise Solution">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
        <HeaderBreadcrumbs
        //   heading="Requests"
        />
        
        <Button
            variant="text"
            sx={{ width: 'fit-content' , marginBottom: '20px'}}
            startIcon={<Icon icon={plusFill} />}
            onClick={() => {
             setAdd(!add);
            }}
          >
           Add Skills/Services
          </Button>

          <Modal
            open={add}
            handleClose={() => {
                setAdd(false);
            }}
            modalTitle={'Add Skills/Services'}
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

        <SkillsAndServiceList />
        
      </Container>
    </Page>
  );
}