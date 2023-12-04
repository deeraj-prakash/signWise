import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import bellFill from '@iconify/icons-eva/bell-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import {
  Stack,
  Container,
  Grid,
  Card, Box,
  Button,
  Tab,
  Tabs,
} from '@material-ui/core'
//components
import Page from 'src/components/Page'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Createcampaign from 'src/components/_dashboard/crm/campaign/CreateCampaign';
import AddTarget from 'src/components/_dashboard/crm/targetlist/AddTarget';
import CustomContact from 'src/components/_dashboard/crm/customcontact/CustomContact';
import CustomFeildSetting from 'src/components/_dashboard/crm/CustomFeildSetting';
import CustomFeilds from 'src/components/_dashboard/crm/CreateCustomFields';

const ACCOUNT_TABS = [
  {
    value: 'campaign',
    icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    component:<Createcampaign/>,
  },
  {
    value: 'target list',
    icon: <Icon icon={roundReceipt} width={20} height={20} />,
    component:<AddTarget/>,
  },
  {
    value: 'all custom contact form',
    icon: <Icon icon={bellFill} width={20} height={20} />,
    component:<CustomContact/>,
  },
  {
    value: 'custom field settings',
    icon: <Icon icon={shareFill} width={20} height={20} />,
    component: <CustomFeildSetting/>,
  },
  {
    value: 'all custom field',
    icon: <Icon icon={roundVpnKey} width={20} height={20} />,
    component: <CustomFeilds/>,
  },
]

export default function Crmcampaign() {
  const [currentTab, setCurrentTab] = useState('campaign')

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue)
  }

  return (
    <Page title="campaign:CRM campaign | Sign-Wise Solution">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <HeaderBreadcrumbs heading="All Campaigns" />
        </Stack>
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
      </Container>
    </Page>
  )
}
