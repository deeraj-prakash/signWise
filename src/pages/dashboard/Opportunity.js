
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { experimentalStyled as styled } from '@material-ui/core/styles'
import {
    Container, Grid, IconButton,
    Stack, Box, Button, TableRow,
    TableBody, Checkbox, Card,
    TableCell, Typography,
    TableContainer, Table,
    TablePagination, Autocomplete,
    useTheme, TextField,
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// redux

import { LoadingButton, MobileDatePicker } from '@material-ui/lab';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Modal from '../../components/_dashboard/blog/ProjectModel';
import { UserListHead, UserMoreMenu } from 'src/components/_dashboard/user/list';
import Label from 'src/components/Label';

export default function opportunity() {
    const navigate = useNavigate()
    const theme = useTheme()
    const [add, setAdd] = useState(false)
    const [selected, setSelected] = useState([])
    const onboard_data = [
        {
            id: 0,
            status: 'Active',
            name: 'Test 1',
            updateby: 'Warne',
            lastupdate: '07/23/2021 14:34:19',
        },
        {
            id: 1,
            status: 'Active',
            name: 'Test 2',
            updateby: 'Ricky ',
            lastupdate: '07/23/2021 14:31:59',
        },
        {
            id: 2,
            status: 'Active',
            name: 'Test 4',
            updateby: 'Mattew Hyden',
            lastupdate: '07/23/2021 14:31:33',
        },
        {
            id: 3,
            status: 'Active',
            name: 'Test 8',
            updateby: 'Adam Gilchrist',
            lastupdate: '07/23/2021 14:31:59',
        },
        {
            id: 4,
            status: 'In-Active',
            name: 'Test 3',
            updateby: 'Smith',
            lastupdate: '07/23/2021 14:31:33',
        },
        {
            id: 5,
            status: 'In-Active',
            name: 'Test 9',
            updateby: 'Jack',
            lastupdate: '07/23/2021 14:34:19',
        },
    ]
    const TABLE_HEAD = [
        { id: 0, label: 'Opportunity Name', alignRight: false },
        { id: 1, label: 'Updated By', alignRight: false },
        { id: 2, label: 'LastUpdated At', alignRight: false },
        { id: 4, label: 'Status', alignRight: false },
        { id: 5, }
    ]
    const Stage = [
        { id: 0, value: 'Prospecting' },
        { id: 1, value: 'Qualification' },
        { id: 2, value: 'Proposal' },
        { id: 4, value: 'Negotiation' },
        { id: 5, value: 'closed Won' },
        { id: 6, value: 'closed Lost' }
    ]
    const Source = [
        { id: 0, value: 'Call' },
        { id: 1, value: 'Email' },
        { id: 2, value: 'Web site' },
        { id: 4, value: 'Partner' },
        { id: 5, value: 'Public Relations' },
        { id: 6, value: 'Campaign' }
    ]
    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        amount: Yup.string().required('Amount is required'),
        probability: Yup.string().required('Probability is required'),
    })
    const LabelStyle = styled(Typography)(({ theme }) => ({
        ...theme.typography.subtitle2,
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(1),
    }))
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {},
        validationSchema: NewUserSchema,
        onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
            try {
                await fakeRequest(500)
                resetForm()
                setSubmitting(false)
                enqueueSnackbar()
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
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };
    return (
        <Page title="All Opportunity: All Opportunity | Sign-Wise Solution">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <HeaderBreadcrumbs
                        heading="All Opportunity"
                    />
                    <Box>
                        {!add && (
                            <Button
                                onClick={() => {
                                    setAdd(!add)
                                }}
                                variant="contained"
                                startIcon={<Icon icon={plusFill} />}
                            >
                                Add Opportunity
                            </Button>
                        )}
                    </Box>
                </Stack>
                {!add ? (
                    <Card>

                        <Scrollbar>
                            <TableContainer sx={{ minWidth: 800 }}>
                                <Table>
                                    <UserListHead
                                        //   order={order}
                                        //   orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        from={'onboard'}
                                    //   rowCount={userList.length}
                                    //   numSelected={selected.length}
                                    //   onRequestSort={handleRequestSort}
                                    //   onSelectAllClick={handleSelectAllClick}
                                    />
                                    <TableBody>
                                        {/* {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => { */}
                                        {onboard_data?.map(row => {
                                            const { id, name, status, updateby, lastupdate } = row;
                                            const isItemSelected = selected.indexOf(id) !== -1;

                                            return (
                                                <TableRow
                                                    hover
                                                    key={id}
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                    selected={isItemSelected}
                                                    aria-checked={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                                                    </TableCell>

                                                    <TableCell align="center" onClick={() => { navigate(PATH_DASHBOARD.crm.opportunityinfo) }}>{name}</TableCell>
                                                    <TableCell align="left">{updateby}</TableCell>
                                                    <TableCell align="left">{lastupdate}</TableCell>
                                                    <TableCell align="left">

                                                        <Label
                                                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                                            color={(status === 'In-Active' && 'error') || 'success'}
                                                        >
                                                            {sentenceCase(status)}
                                                        </Label>
                                                    </TableCell>

                                                    <TableCell align="right">
                                                        <UserMoreMenu
                                                            onDelete={''} userName={name}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}

                                    </TableBody>


                                </Table>
                            </TableContainer>
                        </Scrollbar>


                    </Card>
                ) : (
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
                                                    label="Name"
                                                    {...getFieldProps('name')}
                                                    error={Boolean(touched.name && errors.name)}
                                                    helperText={touched.name && errors.name}
                                                />
                                                <Autocomplete
                                                    fullWidth
                                                    id="combo-box-demo"
                                                    options={Stage}
                                                    getOptionLabel={(state) => state.value}
                                                    // sx={{ width: 400 }}
                                                    renderInput={(params) => (
                                                        <TextField {...params} label="Stages" />
                                                    )} // Update the label
                                                />
                                            </Stack>
                                            <Stack
                                                direction={{ xs: 'column', sm: 'row' }}
                                                spacing={{ xs: 3, sm: 2 }}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="Amount"
                                                    {...getFieldProps('amount')}
                                                    error={Boolean(touched.amount && errors.amount)}
                                                    helperText={touched.amount && errors.amount}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Probability (%)"
                                                    {...getFieldProps('probability')}
                                                    error={Boolean(touched.probability && errors.probability)}
                                                    helperText={touched.probability && errors.probability}
                                                />
                                            </Stack>

                                            <Stack
                                                direction={{ xs: 'column', sm: 'row', }}
                                                spacing={{ xs: 3, sm: 2 }}
                                            >
                                                <Box
                                                    component={MobileDatePicker}
                                                    label="Start Date"
                                                    value={values.start}
                                                    onChange={(date) => setFieldValue('start', date)}
                                                    renderInput={(params) => (
                                                        <TextField sx={{ width: 400 }} size="small" {...params} />
                                                    )}
                                                />
                                                <Stack
                                                    sx={{ display: 'flex', flexDirection: 'column', }}
                                                >
                                                    <LabelStyle>Lead Source</LabelStyle>
                                                    <Autocomplete
                                                        fullWidth
                                                        id="combo-box-demo"
                                                        options={Source}
                                                        getOptionLabel={(state) => state.value}
                                                        sx={{ width: 400, }}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Type to search contact type" />
                                                        )} // Update the label
                                                    />
                                                </Stack>
                                            </Stack>
                                            <LabelStyle>Description</LabelStyle>
                                            <TextField
                                                fullWidth
                                                multiline
                                                minRows={5}
                                                maxRows={9}
                                                label="Please mention your description here"
                                                {...getFieldProps('description')}
                                                error={Boolean(touched.description && errors.description)}
                                                helperText={touched.description && errors.description}
                                            />

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
    );
}