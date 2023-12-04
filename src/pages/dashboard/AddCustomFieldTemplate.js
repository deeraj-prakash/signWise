//materails
import { useTheme } from '@material-ui/core/styles'
import { experimentalStyled as styled } from '@material-ui/core/styles'
import { LoadingButton, MobileDatePicker } from '@material-ui/lab'
import { Container, Stack, Grid, Card, TextField, Box, Typography,Button,Paper,  FormHelperText,
    FormControlLabel,Autocomplete, RadioGroup, Radio, FormGroup, Checkbox } from "@material-ui/core"
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
//compoenets
import Page from "src/components/Page"

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs"
import { CheckBox, Email, Event, RadioButtonCheckedOutlined, SelectAll, Tag, TextFields, TextSnippet, UploadFile } from "@material-ui/icons"
import { useNavigate } from 'react-router'
import Person from '@material-ui/icons/Person'
import { PATH_DASHBOARD } from 'src/routes/paths'
import { useState } from 'react'

const States = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
    { id: 4, name: 'Option 4' },
]
const DATA = [
    { id: 0, icon: <TextFields />, value: 'Text' },
    { id: 1, icon: <Tag />, value: 'Number' },
    { id: 2, icon: <Person />, value: 'Name' },
    { id: 3, icon: <Email />, value: 'Email' },
    { id: 4, icon: <TextSnippet />, value: 'TextArea' },
    { id: 5, icon: <Event />, value: 'Date' },
    { id: 6, icon: <SelectAll />, value: 'Select' },
    { id: 7, icon: <RadioButtonCheckedOutlined />, value: 'Radio Group' },
    { id: 8, icon: <CheckBox />, value: 'Checkbox/Group' },
    { id: 9, icon: <UploadFile />, value: 'File Upload' },

]
export default function CustomFields() {
    const theme = useTheme()
    const navigate = useNavigate()
    const [data,setData] = useState(DATA)
    const [field,setField] =useState('')
    const handleclick=(e)=>{
     console.log(e)
     setField(e.value)
    }
    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        sh_name: Yup.string().required('Short Name is required'),
        Type: Yup.string().required('Project Type is required'),
        Category: Yup.string().required('Project Category is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        tags: Yup.string().required('Tags is required'),
        rfq: Yup.string().required('RFQ is required'),
        company: Yup.string().required('Company is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        role: Yup.string().required('Role Number is required'),
        avatarUrl: Yup.mixed().required('Avatar is required')
        
      });
    //
    const LabelStyle = styled(Typography)(({ theme }) => ({
        ...theme.typography.subtitle2,
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(1)
      }));
      //
      const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
        //    name: currentUser?.name || '',
        //   email: currentUser?.email || '',
        //   phoneNumber: currentUser?.phoneNumber || '',
        //   address: currentUser?.address || '',
        //   country: currentUser?.country || '',
        //   state: currentUser?.state || '',
        //   city: currentUser?.city || '',
        //   zipCode: currentUser?.zipCode || '',
        //   avatarUrl: currentUser?.avatarUrl || null,
        //   isVerified: currentUser?.isVerified || true,
        //   status: currentUser?.status,
        //   company: currentUser?.company || '',
        //   role: currentUser?.role || ''
        },
        validationSchema: NewUserSchema,
        onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
          try {
            await fakeRequest(500);
            resetForm();
            setSubmitting(false);
            enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
            navigate(PATH_DASHBOARD.customfieldtemplate.root);
          } catch (error) {
            console.error(error);
            setSubmitting(false);
            setErrors(error);
          }
        }
      });
    const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
    return (
        <Page title="create Custom Fields | Sign-Wise Solution">
            <Container>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <HeaderBreadcrumbs heading="Create Custom Field" />
                </Stack>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={9}>
                        <Card sx={{
                            p: 3, minHeight: 400, border: '1px solid',
                            borderBlockColor: theme.palette.grey[200]
                        }}>
                            {field === 'Text' && (
                                <Paper
                                sx={{
                                  p: 3,
                                  width: 1,
                                  bgcolor: 'background.neutral'
                                }}
                              >
                                <Typography variant="subtitle1" gutterBottom>
                                   {field} 
                                </Typography>
                                <TextField fullWidth label='Type'/>
                                </Paper>
                            )}
                            {field === 'Number' && (
                                <Paper
                                sx={{
                                  p: 3,
                                  width: 1,
                                  bgcolor: 'background.neutral'
                                }}
                              >
                                <Typography variant="subtitle1" gutterBottom>
                                   {field} 
                                </Typography>
                                <TextField type='number' fullWidth label='Name'/>
                                </Paper>
                            )}
                            {field === 'Name' && (
                                <Paper
                                sx={{
                                  p: 3,
                                  width: 1,
                                  bgcolor: 'background.neutral'
                                }}
                              >
                                <Typography variant="subtitle1" gutterBottom>
                                   {field} 
                                </Typography>
                                <TextField  type='name' fullWidth label='Name'/>
                                </Paper>
                            )}
                            {field === 'Email' && (
                                <Paper
                                sx={{
                                  p: 3,
                                  width: 1,
                                  bgcolor: 'background.neutral'
                                }}
                              >
                                <Typography variant="subtitle1" gutterBottom>
                                   {field} 
                                </Typography>
                                <TextField type='email' fullWidth label='Email'/>
                                </Paper>
                            )}
                            {field === 'TextArea' && (
                                <Paper
                                sx={{
                                  p: 3,
                                  width: 1,
                                  bgcolor: 'background.neutral'
                                }}
                              >
                                <Typography variant="subtitle1" gutterBottom>
                                   {field} 
                                </Typography>
                                <TextField 
                                  fullWidth
                                  multiline
                                  minRows={5}
                                  maxRows={9}
                                  label="Description"
                                   />
                                </Paper>
                            )}
                            {field === 'Date' && (
                                <Paper
                                sx={{
                                  p: 3,
                                  width: 1,
                                  bgcolor: 'background.neutral'
                                }}
                              >
                                <Typography variant="subtitle1" gutterBottom>
                                   {field} 
                                </Typography>
                                <Box
                component={ MobileDatePicker }
                label="Date"
                onChange={(date) => setFieldValue('start', date)}
                renderInput={(params) => (
                  <TextField size="small" {...params} fullWidth />
                )}
              />
                                </Paper>
                            )}
                            {field === 'Select' && (
                                <Paper
                                sx={{
                                  p: 3,
                                  width: 1,
                                  bgcolor: 'background.neutral'
                                }}
                              >
                                <Typography variant="subtitle1" gutterBottom>
                                   {field} 
                                </Typography>
                                <Autocomplete
                    fullWidth                  
                    id="combo-box-demo"
                    options={States}
                    getOptionLabel={(state) => state.name}
                    // sx={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select" />
                    )} // Update the label
                  />
                                </Paper>
                            )}
                            {field === 'Radio Group' && (
                                <Paper
                                sx={{
                                  p: 3,
                                  width: 1,
                                  bgcolor: 'background.neutral'
                                }}
                              >
                                <Typography variant="subtitle1" gutterBottom>
                                   {field} 
                                </Typography>
                                <RadioGroup row {...getFieldProps('addressType')}>
              <FormControlLabel value="Home" control={<Radio />} label="Radio 1" sx={{ mr: 2 }} />
              <FormControlLabel value="Office" control={<Radio />} label="Radio 2" />
            </RadioGroup>
                                </Paper>
                            )}
                            {field === 'Checkbox/Group' && (
                                <Paper
                                sx={{
                                  p: 3,
                                  width: 1,
                                  bgcolor: 'background.neutral'
                                }}
                              >
                                <Typography variant="subtitle1" gutterBottom>
                                   {field} 
                                </Typography>
                                <FormGroup>
      <FormControlLabel control={<Checkbox />} label="Checkbox 1" />
      <FormControlLabel required control={<Checkbox />} label="Checkbox 2" />
      <FormControlLabel  control={<Checkbox />} label="Checkbox 3" />
    </FormGroup>
                                </Paper>
                            )}
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Card sx={{ p: 3 }}>

                            <Stack direction="column" gap={1}>
                                {data?.map((data, index) => (
                                    <Stack onClick={()=>handleclick(data)} key={index} sx={{
                                        display: 'flex', flexDirection: 'row', justifyContent: 'space-around', border: '1px solid',
                                        borderBlockColor: theme.palette.grey[200]
                                    }} 
                                    >
                                     {data.icon}
                                        <Typography color={theme.palette.primary.contrastText} variant="subtitle2">{data.value}</Typography>
                                    </Stack>
                                ))}

                            </Stack>

                        </Card>
                    </Grid>
                    <Box
                        sx={{
                            mt: 3,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 1,
                        }}
                    >
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            onClick={() => {
                                navigate(PATH_DASHBOARD.customfieldtemplate.root)
                            }}
                        >
                            Save Template
                        </LoadingButton>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            onClick={() => {
                                navigate(PATH_DASHBOARD.customfieldtemplate.edit)
                            }}
                           
                        >
                            Edit Template
                        </LoadingButton>
                        <Button
                            variant="outlined"
                            type="submit"
                            onClick={() => {
                                navigate(PATH_DASHBOARD.customfieldtemplate.root)
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Grid>
            </Container>
        </Page>
    )
}