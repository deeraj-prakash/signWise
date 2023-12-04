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
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountChangePassword
} from '../../components/_dashboard/user/account';
import Messages from 'src/components/_dashboard/user/profile/Messages.js'
import Sms from 'src/components/_dashboard/user/profile/Sms.js'
import Whatsapp from 'src/components/_dashboard/user/profile/Whatsapp.js'
import Request from 'src/components/_dashboard/user/profile/Request.js'
import Payments from 'src/components/_dashboard/user/profile/Payments.js'
import Documents from 'src/components/_dashboard/user/profile/Documents.js'
import Calls from 'src/components/_dashboard/user/profile/Calls.js'
import Tickets from 'src/components/_dashboard/user/profile/Tickets.js'
import { ProfilePostCard } from 'src/components/_dashboard/user/profile';
import  ChatWindow  from 'src/components/_dashboard/chat/ChatWindow.js';
import  ChatMessageItem  from 'src/components/_dashboard/chat/ChatMessageItem.js';
import Scrollbar from 'src/components/Scrollbar';
import Chat from 'src/pages/dashboard/Chat.js';







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
  const [currentTab, setCurrentTab] = useState('general');
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
      value: 'general',
      // icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral setCurrentTab={setCurrentTab} />
    },
    // {
    //   value: 'billing',
    //   icon: <Icon icon={roundReceipt} width={20} height={20} />,
    //   component: <AccountBilling />
    // },
    {
      value: 'More Info',
      // icon: <Icon icon={bellFill} width={20} height={20} />,
      component: <AccountNotifications />
    },

    {
      value: 'Messages',
      // icon: <Icon icon={bellFill} width={20} height={20} />,
    //   component: <Scrollbar scrollableNodeProps={{ ref: scrollRef }} sx={{ p: 3, flexGrow: 1 }}>
    //   {conversation.messages.map((message) => (
    //     <ChatMessageItem 
    //       key={message.id}
    //       message={message}
    //       conversation={conversation}
    //       onOpenLightbox={handleOpenLightbox}
    //     />
    //   ))}

    // </Scrollbar>
    component: <Messages />
      
    },

    {
      value: 'Request',
      // icon: <Icon icon={shareFill} width={20} height={20} />,
      component: <Request />
    },
    {
      value: 'Payments',
      // icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <Payments />
    },
    {
      value: 'Documents',
      // icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <Documents />
    },
    {
      value: 'Calls',
      // icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <Calls />
    },
    {
      value: 'SMS',
      // icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <Sms />
    },
    {
      value: 'Whatsapp',
      // icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <Chat />
    },
    {
      value: 'Tickets',
      // icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <Tickets />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="User: Profile Settings | SignWise Solutions">
      <Container>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Profile Settings' }
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
