import * as Yup from 'yup';
// import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { useTheme } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { LoadingButton } from '@material-ui/lab';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
    Container,
    Stack, Switch, Box,
    Typography, FormControlLabel,
    Grid, Card, TextField, Button, MenuItem, MenuList, Divider, FormControl, FormLabel, RadioGroup, Radio,

} from "@material-ui/core"
//components
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs"
import Page from "src/components/Page"
import { AccountBalance, AccountCircle, Assignment, AssignmentInd, MonetizationOn } from '@material-ui/icons';
import Modal from 'src/components/_dashboard/blog/ProjectModel';

const ClientFacing = [
    {
        id: 0,
        icon: <AccountCircle />,
        label: 'Data Collection'
    },
    {
        id: 1,
        icon: <AccountBalance />,
        label: 'Bank Information'
    },
    {
        id: 2,
        icon: <MonetizationOn />,
        label: 'Tax Information'
    },
    {
        id: 3,
        icon: <AccountCircle />,
        label: 'Portfolio'
    },
    {
        id: 4,
        icon: <AssignmentInd />,
        label: 'Questionnaire'
    },
    {
        id: 5,
        icon: <Assignment />,
        label: 'Sign Agreement'
    },

]
const InternalData = [
    {
        id: 0,
        icon: <AccountCircle />,
        label: 'Data Collection'
    },
    {
        id: 1,
        icon: <AssignmentInd />,
        label: 'Questionnaire'
    },
]
export default function AddNewWorkFlow() {
    const [clickClient, setClickClient] = useState(false)
    const [internal, setInternal] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [stageDetail, setStageDetail] = useState()
    const [radioValue,setRadioValue] = useState()
    const enqueueSnackbar = useSnackbar()
    const navigate = useNavigate()
    const theme = useTheme()
    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        stages: Yup.string().required('Stages is required'),
    });
    const LabelStyle = styled(Typography)(({ theme }) => ({
        ...theme.typography.subtitle2,
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(1)
    }));
    //
    const ClickClientFacing = () => {
        setClickClient(!clickClient)
        setInternal(false)
    }
    const ClickInternal = () => {
        setClickClient(false)
        setInternal(!internal)
    }
    const HandleClickToForm = (val) => {
        console.log(val)
        setStageDetail(val)
        setOpenModal(!openModal)
    }
    const HandleModalClose = () => {
        setOpenModal(!openModal)
    }
    const HandleRadioChange=(event)=>{
        setRadioValue(event.target.value)
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {


        },
        validationSchema: NewUserSchema,
        onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
            try {
                await fakeRequest(500);
                resetForm();
                setSubmitting(false);
                enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
                navigate(PATH_DASHBOARD.user.list);
            } catch (error) {
                console.error(error);
                setSubmitting(false);
                setErrors(error);
            }
        }
    });
    console.log(radioValue, 'FFFFFFFFFFFFFFF')
    const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
    return (
        <Page title="Onboard:Create New Workflow | Sign-Wise Solution">
            {!openModal ? (
                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <HeaderBreadcrumbs
                            heading="Create New Workflow"
                        />
                    </Stack>
                    <FormikProvider value={formik}>
                        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Card sx={{ p: 3 }}>
                                        <Stack spacing={3}>
                                            <TextField
                                                fullWidth
                                                label="Name"
                                                {...getFieldProps('name')}
                                                error={Boolean(touched.name && errors.name)}
                                                helperText={touched.name && errors.name}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Stages"
                                                {...getFieldProps('stages')}
                                                error={Boolean(touched.stages && errors.stages)}
                                                helperText={touched.stages && errors.stages}
                                            />
                                            <FormControlLabel
                                                control={<Switch {...getFieldProps('inStock')} checked={values.inStock} />}
                                                label="Default onboarding workflow"
                                                sx={{ mb: 2 }}
                                            />
                                        </Stack>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={3}>
                                        <Card sx={{ p: 2, display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between' }}>
                                            <Button
                                                variant='outlined'
                                                onClick={() => ClickClientFacing()}
                                                // startIcon={<Icon icon={plusFill} />}
                                            >
                                                Client-Facing stages
                                            </Button>

                                            <Button variant='outlined' onClick={() => ClickInternal()}>
                                                Internal stage
                                            </Button>
                                            <Button variant='outlined' onClick={''} >
                                             Action Stages
                                            </Button>
                                        </Card>
                                        {clickClient && (
                                            <MenuList>
                                                {ClientFacing?.map((option) => (
                                                    <MenuItem onClick={() => HandleClickToForm(option.label)} key={option.id}>
                                                        {option.icon} {option.label}
                                                    </MenuItem>
                                                ))}
                                            </MenuList>
                                        )}
                                        {internal && (
                                            <MenuList>
                                                {InternalData?.map((option) => (
                                                    <MenuItem key={option.id} onClick={() => HandleClickToForm(option.label)}>
                                                        {option.icon} {option.label}
                                                    </MenuItem>
                                                ))}
                                            </MenuList>
                                        )}
                                    </Stack>
                                </Grid>
                                
                            </Grid>
                        </Form>
                    </FormikProvider>
                </Container>
            ) : (
                <Container>
                <HeaderBreadcrumbs 
                    heading={stageDetail}
                />
                <FormikProvider value={formik}>
                    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <Card sx={{ p: 3, }}>
                                    <Stack spacing={3}>
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                            <TextField
                                                fullWidth
                                                label="Stage Name"
                                                {...getFieldProps('name')}
                                                error={Boolean(touched.name && errors.name)}
                                                helperText={touched.name && errors.name}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Select Templates"
                                                {...getFieldProps('sh_name')}
                                                error={Boolean(touched.sh_name && errors.sh_name)}
                                                helperText={touched.sh_name && errors.sh_name}
                                            />

                                        </Stack>
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                            <TextField
                                                fullWidth
                                                label="Select Requested Documents"
                                                {...getFieldProps('rfq')}
                                                error={Boolean(touched.rfq && errors.rfq)}
                                                helperText={touched.rfq && errors.rfq}
                                            />
                                         
                                        </Stack>
                                        <Stack sx={{ justifyContent: 'space-around' }} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                          {stageDetail =='Data Collection' && (
                                                 <Stack>
                                                 <Typography variant='body1'> Create new document request</Typography>
                                                 <TextField
                                                     fullWidth
                                                     label="Document"
                                                     {...getFieldProps('document')}
                                                     error={Boolean(touched.document && errors.document)}
                                                     helperText={touched.document && errors.document}
                                                 />
                                                 <Stack sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                 <Button variant='text'sx={{width:'fit-content'}}>Create</Button>
                                                 <Button variant='text' sx={{width:'fit-content'}}>Cancel</Button>
                                                 </Stack>
                                                 </Stack>
                                                 
                                          )} 
                                                                 
                                                <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label">Type of Stage</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="automatic"
                                                        value={radioValue}
                                                        onChange={(e)=>{HandleRadioChange(e)}}
                                                        name="radio-buttons-group"
                                                    >
                                                        <FormControlLabel value="automatic" control={<Radio />} label="Automatic Stage" />
                                                        <FormControlLabel value="manual" control={<Radio />} label="Manual Review Stage" />
                                                    </RadioGroup>
                                                </FormControl>
                                            
                                        </Stack>
                                        <LabelStyle>Message (Optional)</LabelStyle>
                                        <TextField
                                            fullWidth
                                            multiline
                                            minRows={3}
                                            maxRows={7}
                                            label="Description"
                                            {...getFieldProps('description')}
                                            error={Boolean(touched.description && errors.description)}
                                            helperText={touched.description && errors.description}
                                        />
                                         You can set the message that will be displayed when client exits this stage
                                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                            <LoadingButton type="submit" variant="contained" onClick={() =>{HandleModalClose()}} loading={isSubmitting}>
                                                Save
                                            </LoadingButton>
                                            <Button variant="outlined" type="submit" onClick={() =>{HandleModalClose()}}>
                                                Cancel
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Card>
                            </Grid>
                        </Grid>
                    </Form>
                </FormikProvider>
                </Container>
            )}

        </Page>
    )
}