import { useEffect } from 'react';
// material
import { Card, Container,Button } from '@material-ui/core';
// redux
import { useDispatch } from '../../redux/store';
import { getConversations, getContacts } from '../../redux/slices/chat';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { Link as RouterLink } from 'react-router-dom';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ChatSidebar, ChatWindow } from '../../components/_dashboard/chat';


// ----------------------------------------------------------------------

export default function Chat() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <Page title="Chat | SignWise Solutions">
      <Container maxWidth="xl">
      <HeaderBreadcrumbs
        heading="Whatsapp"
        // links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Chat' }]}
          >     
        {/* <Button
          variant="outlined"
          type="submit"
          component={RouterLink}
          to={PATH_DASHBOARD.user.account}
          sx={{ marginLeft: '10px' }}
        >
          Cancel
        </Button> */}
      </HeaderBreadcrumbs>

        <Card sx={{ height: '72vh', display: 'flex' }}>
          <ChatSidebar />
          <ChatWindow />
        </Card>
      </Container>
    </Page>
  );
}
