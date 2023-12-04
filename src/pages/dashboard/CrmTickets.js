import Page from "src/components/Page"
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs"
import { useNavigate } from 'react-router-dom'
import { capitalCase } from 'change-case';
import * as Yup from 'yup'
import { Form, FormikProvider, useFormik } from 'formik'
import { QuillEditor } from "src/components/editor";
//materail
import { useTheme } from '@material-ui/core/styles'
import { experimentalStyled as styled } from '@material-ui/core/styles'
import { MobileDatePicker,LoadingButton } from "@material-ui/lab";
import { ContactSupport } from '@material-ui/icons'
import {Stack, Divider,Tab,Tabs,Container,
    Grid,
    Button,
    Card,
    Box,
    TextField,
    Typography,
    Autocomplete,
    FormControlLabel,
    IconButton,
    Tooltip,Checkbox,
 } from "@material-ui/core"
import { useState } from "react"
import SupportTickets from "src/components/_dashboard/crm/tickets/SupportTickets";
import ClientTickets from "src/components/_dashboard/crm/tickets/ClientTickets";
import ContactTickets from "src/components/_dashboard/crm/tickets/ContactTickets";
import LeadTickets from "src/components/_dashboard/crm/tickets/LeadTickets";
//
const STATUS = [
    { id: 0, name: 'New' },
    { id: 1, name: 'In-Progress' },
    { id: 2, name: 'In-Testing' },
    { id: 3, name: 'Completed' },
    { id: 4, name: 'Cancelled' },
  ]
  const PROJECT = [
    { id: 0, name: 'Zeta' },
    { id: 1, name: 'Lafferty' },
    { id: 2, name: 'Rubiks-Built' },
    { id: 3, name: 'Element 79' },
  ]
const ACCOUNT_TABS = [
    {
      value: 'support tickets',
      component:<SupportTickets/>,
    },
    {
      value: 'client tickets',
      component:<ClientTickets/>,
    },
    {
      value: 'contact tickets',
      component:<ContactTickets/>,
    },
    {
      value: 'lead tickets',
      component: <LeadTickets/>,
    },
  ]
export default function CrmTickets(){
    const navigate = useNavigate()
    const theme = useTheme()
    const [add, setAdd] = useState(false)
    const [open, setOpen] = useState(false)
    const [currentTab, setCurrentTab] = useState('support tickets')
     //
     const NewUserSchema = Yup.object().shape({
        ticket: Yup.string().required('Ticket Name is required'),
        project: Yup.string().required('Project is required'),
      })
      //
      const LabelStyle = styled(Typography)(({ theme }) => ({
        ...theme.typography.subtitle2,
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(1),
      }))
      //
      const formik = useFormik({
        enableReinitialize: true,
        initialValues: {},
        validationSchema: NewUserSchema,
        onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
          try {
            await fakeRequest(500)
            resetForm()
            setSubmitting(false)
            enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', {
              variant: 'success',
            })
            navigate(PATH_DASHBOARD.user.list)
          } catch (error) {
            console.error(error)
            setSubmitting(false)
            setErrors(error)
          }
        },
      })
    
      const {
        errors,
        values,
        touched,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        getFieldProps,
      } = formik
    const handleChangeTab = (event, newValue) => {
      setCurrentTab(newValue)
    }
    return(
        <Page title="Tickets: Tickets | Sign-Wise Solution">
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <HeaderBreadcrumbs
                    heading="Tickets"
                />
                </Stack>
                {!add ? (
                <>
                <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
            marginTop={'-50px'}
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
        <Button variant="contained" onClick={() => setAdd(!add)}>
          Add new
        </Button>
      </Grid>
          </Grid>
           <Divider/>
           <Grid container sx={{ justifyContent: 'center' }} spacing={3}>
          <Grid item xs={12} md={12}>
            <Stack spacing={3}>
              <Stack spacing={5}>
                <Tabs
                  value={currentTab}
                  scrollButtons="auto"
                  variant="scrollable"
                  allowScrollButtonsMobile
                  onChange={handleChangeTab}
                >
                  {ACCOUNT_TABS.map((tab) => (
                    <Tab
                      disableRipple
                      key={tab.value}
                      label={capitalCase(tab.value)}
                    //   icon={tab.icon}
                      value={tab.value}
                    />
                  ))}
                </Tabs>

                {ACCOUNT_TABS.map((tab) => {
                  const isMatched = tab.value === currentTab
                  return isMatched && <Box key={tab.value}>{tab.component}</Box>
                })}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        </>):(
            <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={10}>
                  <Card sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 3, sm: 2 }}
                      >
                        <TextField
                          fullWidth
                          label="Ticket Name"
                          {...getFieldProps('ticket')}
                          error={Boolean(touched.ticket && errors.ticket)}
                          helperText={touched.ticket && errors.ticket}
                        />
                        <Autocomplete
                          fullWidth
                          id="combo-box-demo"
                          options={PROJECT}
                          getOptionLabel={(state) => state.name}
                          // sx={{ width: 400 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Project" />
                          )} // Update the label
                        />
                      </Stack>
                      <Stack>
                        <LabelStyle>Ticket Overview</LabelStyle>
                        <QuillEditor
                          simple
                          id="product-description"
                          value={values.description}
                          onChange={(val) => setFieldValue('description', val)}
                          error={Boolean(
                            touched.description && errors.description,
                          )}
                        />
                      </Stack>
  
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 3, sm: 2 }}
                      >
                        <Box
                          component={MobileDatePicker}
                          label="Start Date"
                          value={values.start}
                          onChange={(date) => setFieldValue('start', date)}
                          renderInput={(params) => (
                            <TextField size="small" {...params} fullWidth />
                          )}
                        />
                        <Box
                          component={MobileDatePicker}
                          label="Due Date"
                          value={values.end}
                          onChange={(date) => setFieldValue('end', date)}
                          renderInput={(params) => (
                            <TextField size="small" {...params} fullWidth />
                          )}
                        />
                      </Stack>
  
                      <Stack
                        direction={{ xs: 'column', sm: 'row', md: 'column' }}
                        spacing={{ xs: 3, sm: 2 }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <LabelStyle>Ticket Status</LabelStyle>
                          <Tooltip title="Status">
                            <IconButton
                              onClick={() => setOpen(!open)}
                              sx={{
                                position: 'relative',
                                marginLeft: '2px',                             
                              }}
                            >
                              <ContactSupport />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                        <Autocomplete
                          fullWidth
                          id="combo-box-demo"
                          options={STATUS}
                          getOptionLabel={(state) => state.name}
                          // sx={{ width: 400 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Status" />
                          )} // Update the label
                        />
                      </Stack>
                      <Stack
                        direction={{ xs: 'column', sm: 'row', md: 'column' }}
                        spacing={{ xs: 3, sm: 2 }}
                      >
                          <LabelStyle>Assign Yourself To Job</LabelStyle>
                          <FormControlLabel control={<Checkbox defaultChecked />} label="Selecting this option will add you to the Job Team." />
  
                      </Stack>
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
                            setAdd(false)
                          }}
                          loading={isSubmitting}
                        >
                          Add
                        </LoadingButton>
                        <Button
                          variant="outlined"
                          type="submit"
                          onClick={() => {
                            setAdd(false)
                          }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        )}
                </Container>
                </Page>
    )
}