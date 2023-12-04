//material
import { Container, Stack, Grid, Typography, Paper, Card, List, ListItem,Box, Button,Autocomplete,TextField } from "@material-ui/core"
import { useTheme } from '@material-ui/core/styles';
import { useNavigate } from "react-router"
import { experimentalStyled as styled } from '@material-ui/core/styles'
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd"
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { Form, FormikProvider, useFormik } from 'formik'
import { LoadingButton, MobileDatePicker } from '@material-ui/lab'
//components
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs"
import Page from "src/components/Page"

import { useRef } from "react"
import { useState } from "react"

const SAMPLEDATA = [
    { id: 0, value: 'Name' },
    { id: 1, value: 'Client Name' },
    { id: 2, value: 'Title' },
    { id: 3, value: 'Website' },
    { id: 4, value: 'Email' },
    { id: 5, value: 'Phone' },
    { id: 6, value: 'City' },
    { id: 7, value: 'Zip code' },
    { id: 8, value: 'Industry' },

]

  const STATUS = [
    { id: 0, value: 'Select Campaign' },
    { id: 1, value: 'Tridan Free Trail ' },
    { id: 2, value: 'Website Contact Form' },
    { id: 3, value: 'National Cannabis Bureau' },
  ]
export default function CustomContactBuilder() {
    const theme = useTheme()
    const navigate = useNavigate()
    const ref = useRef()
    const [add,setAdd] =useState(false)
    const [task, setTask] = useState(SAMPLEDATA)
    const [destinationList, setDestinationList] = useState([]);

    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Campaign Name is required'),
        budget: Yup.string().required('Budget is required'),
        target: Yup.string().required('Target is required'),
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
            
            navigate()
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
    const onDragEnd = (result) => {
        if (!result.destination) return; // Dropped outside of a valid droppable area

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        const draggedItem = result.source.droppableId === 'task' ? task[sourceIndex] : destinationList[sourceIndex];

        if (result.destination.droppableId === 'destination') {
            const updatedSourceList = task.filter((item, index) => index !== sourceIndex);
            const updatedDestinationList = [...destinationList, draggedItem];
            setTask(updatedSourceList);
            setDestinationList(updatedDestinationList);
        } else if (result.destination.droppableId === 'task') {
            const updatedDestinationList = destinationList.filter((item, index) => index !== sourceIndex);
            const updatedSourceList = [...task, draggedItem];
            setTask(updatedSourceList);
            setDestinationList(updatedDestinationList);
        }
    };
    return (
        <Page title="contact builder | Sign-Wise Solution">
            <Container>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <HeaderBreadcrumbs heading="Create Custom Contact" />
                </Stack>
                {!add ? (
                <Grid container sx={{ justifyContent: 'center' }} spacing={3}>
                    <Grid item xs={12} md={8} sx={{ justifyContent: 'flex-start' }}>
                        <LabelStyle>Available Fields</LabelStyle>
                        <Stack style={{ display: 'flex', flexDirection: 'row' }}>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="task" direction="vertical">
                                    {(provided) => (
                                        <List
                                            style={{
                                                border: '1px solid #ccc',
                                                padding: '8px',
                                                width: '200px',
                                                minHeight: '100px',
                                            }}
                                            ref={provided.innerRef} {...provided.droppableProps}>
                                            {task.map((task, index) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id.toString()}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <ListItem sx={{ backgroundColor: theme.palette.info.light }}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                        >
                                                            <Typography sx={{ color: theme.palette.grey[100] }} variant="subtitle2">{task.value}</Typography>
                                                        </ListItem>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </List>
                                    )}
                                </Droppable>

                                <Stack style={{ width: '20px' }} />
                                <Droppable droppableId="destination" direction="vertical">
                                    {(provided) => (
                                        <List
                                            style={{
                                                border: '1px solid #ccc',
                                                padding: '8px',
                                                width: '200px',
                                                minHeight: '100px',
                                            }}
                                            ref={provided.innerRef} {...provided.droppableProps}>
                                            {destinationList.map((task, index) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id.toString()}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <ListItem sx={{ backgroundColor: theme.palette.info.light }}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                        >
                                                            <Typography sx={{ color: theme.palette.grey[100] }} variant="subtitle2">{task.value}</Typography>
                                                        </ListItem>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </List>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Stack>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start',gap:1 }}>
                  <LoadingButton type="submit" variant="contained" onClick={()=>{setAdd(!add)}} >
                    Next
                  </LoadingButton>
                  <Button variant="outlined" type="submit" onClick={()=>{setAdd(false)}}>
                    Cancel
                  </Button>
                </Box>
                </Grid>
                    </Grid>
                    ):(
                        <FormikProvider value={formik}>
                        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                              <Card sx={{ p: 3 }}>
                                <Stack spacing={3}>
                                  <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={{ xs: 3, sm: 2 }}
                                  >
                                     <Stack
                                     sx={{ display: 'flex', flexDirection: 'column', }}
                                    >
                                    <LabelStyle>Contact Form Name</LabelStyle>
                                   <TextField
                                    //   fullWidth
                                      sx={{width:300}}
                                      label="Name"
                                      {...getFieldProps('name')}
                                      error={Boolean(touched.name && errors.name)}
                                      helperText={touched.name && errors.name}
                                    />
                                    </Stack>
                                    <Stack
                                     sx={{ display: 'flex', flexDirection: 'column', }}
                                    >
                                         <LabelStyle>Form Header</LabelStyle>
                                     <TextField
                                    //    fullWidth
                                     sx={{width:300}}
                                      label="Header"
                                      {...getFieldProps('header')}
                                      error={Boolean(touched.header && errors.header)}
                                      helperText={touched.header && errors.header}
                                    />
                                    </Stack>
                                  </Stack>
                                  <LabelStyle>Form Description</LabelStyle>
                                  <TextField
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    maxRows={9}
                                    label="Description"
                                    {...getFieldProps('description')}
                                    error={Boolean(touched.description && errors.description)}
                                    helperText={touched.description && errors.description}
                                  />
                                  <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={{ xs: 3, sm: 2 }}
                                  > 
                                   <Stack
                                     sx={{ display: 'flex', flexDirection: 'column', }}
                                    >
                                    <LabelStyle>Contact Form Name</LabelStyle>
                                    <TextField
                                     sx={{width:300}}
                                      label="Name"
                                      {...getFieldProps('footer')}
                                      error={Boolean(touched.footer && errors.footer)}
                                      helperText={touched.footer && errors.footer}
                                    />
                                    </Stack>
                                    <Stack
                                     sx={{ display: 'flex', flexDirection: 'column', }}
                                    >
                                    <LabelStyle>Contact Form Name</LabelStyle>
                                    <TextField
                                      sx={{width:300}}
                                      label="Website URL"
                                      {...getFieldProps('url')}
                                      error={Boolean(touched.url && errors.url)}
                                      helperText={touched.url && errors.url}
                                    />
                                    </Stack>
                                  </Stack>
                                 
                                  <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={{ xs: 3, sm: 2 }}
                                  >
                                    <Autocomplete
                                      fullWidth
                                      id="combo-box-demo"
                                      options={STATUS}
                                      getOptionLabel={(state) => state.value}
                                      // sx={{ width: 400 }}
                                      renderInput={(params) => (
                                        <TextField {...params} label="Related Campaign" />
                                      )} // Update the label
                                    />
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
                                    >
                                      Save
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