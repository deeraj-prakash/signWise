import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { capitalCase } from 'change-case';
import { useState, useEffect,useRef } from 'react';
import bellFill from '@iconify/icons-eva/bell-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// material
import { Container, Tab, Box, Tabs, Stack } from '@material-ui/core';
// redux
import { useDispatch, useSelector  } from '../../redux/store';
import { getCards, getProfile, getInvoices, getAddressBook, getNotifications } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Payments from 'src/components/_dashboard/user/profile/Payments.js'
import Documents from 'src/components/_dashboard/user/profile/Documents.js'
import PersonalSettings from 'src/components/_dashboard/user/PersonalSettings.js';
import CompanyProfile from 'src/components/_dashboard/user/CompanyProfile.js';
import ClientRanking from 'src/components/_dashboard/general-ecommerce/ClientRanking.js';
import UserRole from 'src/components/_dashboard/user/profile/UserRole.js';
import SkillsAndService from 'src/components/_dashboard/user/profile/SkillsAndService.js';
import ClientTypes from 'src/components/_dashboard/user/profile/ClientTypes.js';







// ----------------------------------------------------------------------

const conversationSelector = (state) => {
  const { conversations, activeConversationId } = state.chat;
  const conversation = conversations.byId[activeConversationId];
  if (conversation) {
    return conversation;
  }
  return {
    id: null,
    messages: [],
    participants: [],
    unreadMessages: 0
  };
};

export default function UserAccount() {
  const [currentTab, setCurrentTab] = useState('Personal Settings');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCards());
    dispatch(getAddressBook());
    dispatch(getInvoices());
    dispatch(getNotifications());
    dispatch(getProfile());
  }, [dispatch]);

  // const handleOpenLightbox = (url) => {
  //   const selectedImage = findIndex(images, (index) => index === url);
  //   setOpenLightbox(true);
  //   setSelectedImage(selectedImage);
  // };
  // const scrollRef = useRef();
  
  // const conversation = useSelector((state) => conversationSelector(state));
  // useEffect(() => {
  //   const scrollMessagesToBottom = () => {
  //     if (scrollRef.current) {
  //       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  //     }
  //   };
  //   scrollMessagesToBottom();
  // });

  const ACCOUNT_TABS = [
    {
      value: 'Personal Settings',
      // icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <PersonalSettings setCurrentTab={setCurrentTab} />
    },
    // {
    //   value: 'billing',
    //   icon: <Icon icon={roundReceipt} width={20} height={20} />,
    //   component: <AccountBilling />
    // },
    {
      value: 'Company Profile',
      // icon: <Icon icon={bellFill} width={20} height={20} />,
      component: <CompanyProfile />
    },

    {
      value: 'Client Ranking',
      // icon: <Icon icon={bellFill} width={20} height={20} />,
      component: <ClientRanking />
      
    },

    {
      value: 'User Roles',
      // icon: <Icon icon={shareFill} width={20} height={20} />,
      component: <UserRole />
    },
    {
      value: 'Skills And Services',
      // icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <SkillsAndService />
    },
    {
      value: 'Client Types',
      // icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <ClientTypes />
    },
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="User: Admin Settings | SignWise Solutions">
      <Container>
        <HeaderBreadcrumbs
          heading="Admin Settings"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Admin Settings' }
          ]}
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
