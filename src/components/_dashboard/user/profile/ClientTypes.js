
// import * as Yup from 'yup';
import { useState } from 'react';
// import { sentenceCase } from 'change-case';// Change this import path to your actual sentenceCase function
// import { useNavigate, useParams } from 'react-router-dom';

import { useFormik } from 'formik';
import {
     Container,Grid,
     Stack,Box,Button,TextField
    } from '@material-ui/core';
    // import Label from 'src/components/Label';
    import { Icon } from '@iconify/react';
    import plusFill from '@iconify/icons-eva/plus-fill';
    // redux
    // import { useDispatch, useSelector } from '../../redux/store';
    // import { getPost, getRecentPosts } from '../../redux/slices/blog';
    import { LoadingButton } from '@material-ui/lab';
    // routes
    // import { PATH_DASHBOARD } from 'src/routes/paths.js';
    // components
    import Page from 'src/components/Page.js';
    // import Markdown from '../../components/Markdown';
    // import Scrollbar from 'src/components/Scrollbar.js';
    import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs.js';
    // import ClientTypeView from 'src/components/_dashboard/user/list/ClientTypeView.js';
    // import UserList from './UserList';
    // import Modal from '../../components/_dashboard/blog/ProjectModel';
    // import { UserListHead, UserMoreMenu } from 'src/components/_dashboard/user/list';
    import  ClientTypeList from 'src/pages/dashboard/ClientTypeList.js';
    import { ChromePicker } from 'react-color';
    import Modal from 'src/components/_dashboard/blog/ProjectModel.js';
    // import { tr } from 'faker/lib/locales';

export default function ClientTypes(){
    
    const [add,setAdd] = useState(false)
    const [colorPicker, setColorPicker] = useState(false);
    const [color, setColor] = useState('#2F3171');
    const [isSubmitting] = useState(false);
    
    

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        name: '',
      }})

    const handleColorChange = (updatedColor) => {
      console.log({updatedColor});
      setColor(updatedColor.hex);
    };

    const { errors,  touched, getFieldProps } = formik;

    
    return(
    <Page title="Client Types | Sign-Wise Solution">
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
            onClick={() => {
              setAdd(!add);
             }}
          >
            Add Client Type
          </Button>
        </Stack>

        <ClientTypeList />

        <Modal
            open={add}
            handleClose={() => {
                setAdd(false);
            }}
            modalTitle={'Add Client Type'}
            >
               <Stack spacing={2}>
                    <TextField
                        name="Name" // Add the name prop to the TextField component
                        label="Name"
                        placeholder="Name"
                        fullWidth // add this line to make the Autocomplete component full width
                        {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    ></TextField>
                    <Stack direction={'row'}>
                        <Box onClick={()=>setColorPicker(!colorPicker)} sx={{width:'10%',p:2,background:color,borderLeft:`1.5px solid ${color}`,borderTop:`1.5px solid ${color}`,borderBottom:`1.5px solid ${color}`,borderRadius:'10px 0px 0px 10px'}}>
                            
                        </Box>
                        <Box sx={{width:'90%',p:2,height:'5%',borderRight:`1.5px solid ${color}`,borderTop:`1.5px solid ${color}`,borderBottom:`1.5px solid ${color}`,borderRadius:'0px 10px 10px 0px'}}>
                            {color}
                        </Box>
                    </Stack>
                    <Box>
                    {colorPicker&&<ChromePicker color={color} onChange={handleColorChange} />}
                    </Box>
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
      </Container>
    </Page>
  );
}