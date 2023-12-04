import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import bellFill from '@iconify/icons-eva/bell-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// material
import { Container, Tab, Box, Tabs, Stack } from '@material-ui/core';
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
import PublicMessageBoard from 'src/components/_dashboard/user/profile/PublicMessageBoard.js'
import RequestPayments from 'src/components/_dashboard/user/profile/RequestPayments'
import RequestProfile from 'src/components/_dashboard/user/account/RequestProfile.js'
import RequestTabUpdates from 'src/components/_dashboard/user/account/RequestTabUpdates'

import Sms from 'src/components/_dashboard/user/profile/Sms.js'
import Whatsapp from 'src/components/_dashboard/user/profile/Whatsapp.js'
import Request from 'src/components/_dashboard/user/profile/Request.js'
import Payments from 'src/components/_dashboard/user/profile/Payments.js'
import Documents from 'src/components/_dashboard/user/profile/Documents.js'
import Calls from 'src/components/_dashboard/user/profile/Calls.js'
import Tickets from 'src/components/_dashboard/user/profile/Tickets.js'
import { ProfilePostCard } from 'src/components/_dashboard/user/profile';

// ----------------------------------------------------------------------

export default function RequestViewTabs() {
  const [currentTab, setCurrentTab] = useState('Request');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCards());
    dispatch(getAddressBook());
    dispatch(getInvoices());
    dispatch(getNotifications());
    dispatch(getProfile());
  }, [dispatch]);

  const ACCOUNT_TABS = [
    {
      value: 'Request',
    //   icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <RequestProfile setCurrentTab={setCurrentTab} />
    },

    {
        value: 'Public Message Board',
        // icon: <Icon icon={bellFill} width={20} height={20} />,
        component: <PublicMessageBoard  />
      },
    {
      value: 'Updates',
    //   icon: <Icon icon={bellFill} width={20} height={20} />,
      component: <RequestTabUpdates />
    },

    {
      value: 'Payments',
    //   icon: <Icon icon={shareFill} width={20} height={20} />,
      component: <RequestPayments />
    },
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="Request View Tabs | SignWise Solutions">
      <Container>
        <Stack spacing={5}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Stack>
      </Container>
    </Page>
  );
}
