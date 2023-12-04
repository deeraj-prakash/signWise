
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
     TablePagination,
    } from '@material-ui/core';
    // import { Icon } from '@iconify/react';
    // import plusFill from '@iconify/icons-eva/plus-fill';
    // redux
    // import { useDispatch, useSelector } from '../../redux/store';
    // import { getPost, getRecentPosts } from '../../redux/slices/blog';
    // import { LoadingButton } from '@material-ui/lab';
    // routes
    import { PATH_DASHBOARD } from 'src/routes/paths.js';
    // components
    import Page from 'src/components/Page.js';
    // import Markdown from '../../components/Markdown';
    import Scrollbar from 'src/components/Scrollbar.js';
    import ProfileTickets from 'src/pages/dashboard/ProfileTickets.js';
    import { useTheme } from '@material-ui/core/styles'
    // import UserList from './UserList';
    // import Modal from '../../components/_dashboard/blog/ProjectModel';
import { UserListHead, UserMoreMenu } from 'src/components/_dashboard/user/list';
import { tr } from 'faker/lib/locales';

export default function Tickets(){
    const navigate = useNavigate()
    const theme = useTheme()
    
    return(
        <Page title="Tickets | Sign-Wise Solution">
      <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        </Stack>
        <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
            marginTop={'-20px'}
            marginBottom={'20px'}
          >
            <Grid item>
              <Button variant="outlined">All Jobs</Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.info.light,
                  color: theme.palette.info.contrastText,
                }}
              >
                New
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.info.main,
                  color: theme.palette.info.contrastText,
                }}
              >
                In Progress
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.warning.light,
                  color: theme.palette.info.contrastText,
                }}
              >
                In Testing
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.success.light,
                  color: theme.palette.info.contrastText,
                }}
              >
                Completed
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.info.contrastText,
                }}
              >
                Cancelled
              </Button>
            </Grid>
            <Grid item sx={{ marginLeft: 'auto' }}>
            <Button
              onClick={()=>{
                navigate(PATH_DASHBOARD.user.addticket)
              }}
              variant="contained"
            //   startIcon={<Icon icon={plusFill} />}
            >
             Add New
            </Button>
      </Grid>
          </Grid>
           {/* <Divider/>  */}
           <ProfileTickets />
        
      </Container>
    </Page>
  );
}