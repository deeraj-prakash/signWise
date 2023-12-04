
import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { sentenceCase } from 'change-case';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import Modal from 'src/components/_dashboard/blog/ProjectModel.js';
import { UploadMultiFile } from 'src/components/upload/index.js';
import {
     Container,Grid,IconButton,
     Stack,Box,Button, TableRow,
     TableBody, Checkbox,Card,
     TableCell,Typography,
     TableContainer,Table,
     TablePagination,TextField,FormControl, InputLabel, MenuItem, Select,FormControlLabel,Switch,CardContent
    } from '@material-ui/core';
    // import { Icon } from '@iconify/react';
    // import plusFill from '@iconify/icons-eva/plus-fill';
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
    // import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs.js';
    // import UserList from './UserList';
    // import Modal from '../../components/_dashboard/blog/ProjectModel';
import Agreements from 'src/pages/dashboard/Agreements';
import RequestedDocument from 'src/pages/dashboard/RequestedDocument';
import Files from 'src/pages/dashboard/Files';
// import { UserListHead, UserMoreMenu } from 'src/components/_dashboard/user/list';
// import { tr } from 'faker/lib/locales';

export default function Documents(){
  
    const [formik, setFormik] = useState({
      // Your formik state here
    });
  
    const [upload,setupload] = useState(false);
    const [preview, setPreview] = useState(false);
    const [files, setFiles] = useState([]);

    const handleDropMultiFile = useCallback(
        (acceptedFiles) => {
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file)
              })
            )
          );
        },
        [setFiles]
      );
      
    const handleRemoveAll = () => {
        setFiles([]);
      };
    
    const handleRemove = (file) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
    };
    return(
        <Page title="Documents | Sign-Wise Solution">
      <Container>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h4" component="h2">
            Requested Documents
          </Typography>
        </Box>

        <RequestedDocument />

        <Box sx={{ marginTop: '40px', marginBottom: '30px' }}>
          <Typography variant="h4" component="h2">
          Agreements
          </Typography>
        </Box>  

        <Agreements />
        
        <Box sx={{ marginTop: '40px', marginBottom: '20px' }}>
          <Typography variant="h4" component="h2">
          Files
          </Typography>
        </Box>
        <Stack
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
        >
          <Button
            variant="text"
            sx={{ width: 'fit-content',marginBottom: '30px' }}
            startIcon={<Icon icon={plusFill} />}
            onClick={() => {
              setupload(!upload);
            }}
            
          >
            Upload New File
          </Button>

          <Modal
          open={upload}
          handleClose={() => {
            setupload(false);
          }}
          modalTitle={'Upload New Files'}
        >
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off">
              <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>

                     <TextField
                      label="Name"
                      placeholder="Name"
                      fullWidth
                    />                      
                          <FormControlLabel
                            control={<Switch checked={preview} onChange={(event) => setPreview(event.target.checked)} />}
                            label="Show Preview"
                        />
                      <CardContent>
                        <UploadMultiFile
                          showPreview={preview}
                          files={files}
                          onDrop={handleDropMultiFile}
                          onRemove={handleRemove}
                          onRemoveAll={handleRemoveAll}
                        />
                      </CardContent>
              </Stack>

              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <LoadingButton type="submit" variant="contained" onClick={() => { setupload(false) }}>
                      {' Add '}
                    </LoadingButton>
                    <Button variant="outlined" type="submit" onClick={() => { setupload(false) }}>
                      Close
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Modal>

        </Stack>

        <Files />

      </Container>
    </Page>
  );
}