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
  Typography,Paper,
} from '@material-ui/core'
//components
import Page from 'src/components/Page'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Createcampaign from 'src/components/_dashboard/crm/campaign/CreateCampaign'
import AddTarget from 'src/components/_dashboard/crm/targetlist/AddTarget'
import CallLead from 'src/components/_dashboard/crm/lead/CallLead'
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
    value: 'lead information',

    component: <ContactInfo />,
  },
  {
    value: 'calls',

    component:<CallLead/>,
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
export default function viewlead() {
  const [currentTab, setCurrentTab] = useState('lead information')

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue)
  }
  return (
    <Page title="View Lead | Sign-Wise Solution">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <HeaderBreadcrumbs heading="View Leads" />
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
  

  return (
    <Grid container sx={{ justifyContent: 'center' }} spacing={3}>
      <Grid item xs={12} md={12}>
        {/* <Card sx={{ p: 3 }}> */}
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            spacing={3}
          >
            <Paper
            key={'ddf'}
            sx={{
              p: 3,
              width: 1,
              bgcolor: 'background.neutral'
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
            Name :John 
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
               Industry: &nbsp;
              </Typography>
              
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Brand: &nbsp;
              </Typography>
              Sample
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Email: &nbsp;
              </Typography>
              johnallukas@gmail.com
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Phone: &nbsp;
              </Typography>
              +919496351674
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
              Are you currently using a seed to sale software: &nbsp;
              </Typography>
              Yes
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
              Would you be interested in receiving our newsletter: &nbsp;
              </Typography>
             Yes
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
              Are you currently using a marketplace to sell you products: &nbsp;
              </Typography>
             Yes
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
              If so which one: &nbsp;
              </Typography>
             
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
              Do have a need for credit card processing or banking: &nbsp;
              </Typography>
             Yes
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Lead Status: &nbsp;
              </Typography>
              Active
            </Typography>
          </Paper>
           
        
            
           
          </Stack>
        {/* </Card> */}
      </Grid>
    </Grid>
  )
}
