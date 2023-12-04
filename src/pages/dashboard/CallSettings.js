import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import bellFill from '@iconify/icons-eva/bell-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';

import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Container, Tab, Box, Tabs, Stack, Card, Typography, TextField, InputAdornment, Link } from '@material-ui/core';
// redux
import { useDispatch } from '../../redux/store';
import { getCards, getProfile, getInvoices, getAddressBook, getNotifications } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountChangePassword
} from '../../components/_dashboard/user/account';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

const ACCOUNT_TABS = [
    {
      value: 'TWILIO SETTINGS',
    //   icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    //   component: <AccountGeneral />
    },
  ];

const ACTIVITY_OPTIONS = [
    {
      value: 'account_sid',
      label: 'Twilio Account SID',
      helperText:'https://www.twilio.com/console'
    },
    {
      value: 'auth_tocken',
      label: 'Twilio Auth Tocken',
      helperText:'https://www.twilio.com/console'
    },
    {
      value: 'application_sid',
      label: 'Twilio Application SID',
      helperText:'https://www.twilio.com/console/voice/twiml/app'
    },
    {
      value: 'workspace_sid',
      label: 'Twilio Workspace SID',
      helperText:'https://www.twilio.com/console/taskrouter/workspaces'
    },
    {
      value: 'workflow_sid',
      label: 'Twilio Workflow SID',
      helperText:'https://www.twilio.com/console/taskrouter/workspaces'
    },
    {
      value: 'call_forward_number',
      label: 'Call Forward Number',
      helperText:''
    },
  ];


export default function CallSettings() {
  const [currentTab, setCurrentTab] = useState('TWILIO SETTINGS');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCards());
    dispatch(getAddressBook());
    dispatch(getInvoices());
    dispatch(getNotifications());
    dispatch(getProfile());
  }, [dispatch]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      account_sid: 'AC8f8ee005c49f8ac129380518e1746b14',
      auth_tocken: '26620a1425cc36626986ffaf43d5c3ef',
      application_sid: 'AP62b3405e988b695966a7cf2b31094394',
      workspace_sid: 'WSdedacb16bb9fec64a34da66abb9ebd7d',
      workflow_sid: 'WWa96ba65f72b95a2fa4f620e0a1ed29d7',
      call_forward_number: '14173892684',
    },
    onSubmit: async (values, { setSubmitting }) => {
      // await fakeRequest(500);
      // setSubmitting(false);
      // alert(JSON.stringify(values, null, 2));
      // enqueueSnackbar('Save success', { variant: 'success' });
    }
  });

  const { values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Page title="User: Call Settings | SignWise Solutions">
      <Container>
        <HeaderBreadcrumbs
          heading="Call Settings"
        //   links={[
        //     { name: 'Dashboard', href: PATH_DASHBOARD.root },
        //     { name: 'User', href: PATH_DASHBOARD.user.root },
        //     { name: 'Profile Settings' }
        //   ]}
        />

        <Stack spacing={5}>
          <Tabs 
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={tab.value} value={tab.value} />
            ))}
          </Tabs>

          {currentTab === 'TWILIO SETTINGS' && 
          <Card sx={{ p: 3 }}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3} alignItems="flex-end">
                <Stack spacing={2} sx={{ width: 1 }}>
                  <Stack spacing={2} alignItems="flex-start">
                    {ACTIVITY_OPTIONS.map((activity) => (<>
                      <Typography variant="overline" >
                        {activity.label}
                      </Typography>
                      <TextField
                        key={activity.value}
                        fullWidth
                        helperText={
                            activity.helperText ? <span>
                                Click here to find it{' '}
                                <Link href={activity.helperText} target="_blank" rel="noopener">
                                    {activity.helperText}
                                </Link>
                            </span> : ''
                        }
                        {...getFieldProps(activity.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">{activity.icon}</InputAdornment>
                        }}
                      /></>
                    ))}
                  </Stack>
                </Stack>
    
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Save Changes
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Card>}
        </Stack>
      </Container>
    </Page>
  );
}
