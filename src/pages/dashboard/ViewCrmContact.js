import { Icon } from '@iconify/react'
import { capitalCase } from 'change-case'
import { useState, useEffect } from 'react'
import { experimentalStyled as styled } from '@material-ui/core/styles'
import {
  Stack,
  Container,
  Grid,
  Card,
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'
//components
import Page from 'src/components/Page'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Createcampaign from 'src/components/_dashboard/crm/campaign/CreateCampaign'
import AddTarget from 'src/components/_dashboard/crm/targetlist/AddTarget'
import Calls from 'src/components/_dashboard/crm/contacts/Calls'
import CallNotes from 'src/components/_dashboard/crm/contacts/CallNotes'
import Sms from 'src/components/_dashboard/crm/contacts/Sms'
import Whatsapp from 'src/components/_dashboard/crm/contacts/Whatsapp'
import ContactTickets from 'src/components/_dashboard/crm/contacts/ContactTickets'
const RowStyle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
})
const ACCOUNT_TABS = [
  {
    value: 'contact information',

    component: <ContactInfo />,
  },
  {
    value: 'calls',

    component:<Calls/>
  },
  {
    value: 'calls notes',

    component:<CallNotes/>
  },
  {
    value: 'sms',

    component: <Sms/>,
  },
  {
    value: 'whatsapp',

    component:<Whatsapp/>,
  },
  {
    value: 'tickets',

    component: <ContactTickets/>,
  },
]
export default function ViewCrmContact() {
  const [currentTab, setCurrentTab] = useState('contact information')

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue)
  }
  return (
    <Page title="View Contacts | Sign-Wise Solution">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <HeaderBreadcrumbs heading="View Contacts" />
        </Stack>
        <Grid container sx={{ justifyContent: 'center' }} spacing={3}>
          <Grid item xs={12} md={10}>
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
      </Container>
    </Page>
  )
}

function ContactInfo() {
  const currentBalance = 187650
  const sentAmount = 25500
  const totalAmount = currentBalance - sentAmount

  return (
    <Grid container sx={{ justifyContent: 'center' }} spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            spacing={3}
          >
            <Stack
              direction="row"
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2">Name: OG Holdings</Typography>
              <Typography variant="subtitle2">
                Email: Danasedibles@gmail.com
              </Typography>
            </Stack>
            <Stack
              direction="row"
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2">Phone: 8978943453</Typography>
              <Typography variant="subtitle2">
                Address: 782 CR 1520 Rush Springs, OK. 73208
              </Typography>
            </Stack>
            <Stack
              direction="row"
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2">City: Commerce</Typography>
              <Typography variant="subtitle2">State: Oklahoma</Typography>
            </Stack>
            <Stack
              direction="row"
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2">
                Zip/Postal Code: 74339
              </Typography>
              <Typography variant="subtitle2">
                Country: United States
              </Typography>
            </Stack>
            <Stack display="flex" justifyContent="center">
              Description : this is a small operation has no website uses Facebook
              as main social media and appears to only post a couple posts a
              month. Has Twitter account but has no posts , they are mentioned
              or #Danasedibles by two dispensaries. Their online/ social media
              presents is weak. stated that he has reached out to Leafly several
              times but has not gotten a response so he gave up.
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  )
}
