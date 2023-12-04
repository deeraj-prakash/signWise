import {
  Container,
  Stack,
  Grid,
  Card,
} from '@material-ui/core'

import {
  useTheme,
  experimentalStyled as styled,
} from '@material-ui/core/styles'

//components
import Page from 'src/components/Page'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import { useNavigate } from 'react-router'
import { sample } from 'lodash'
import { useState } from 'react'
import { EcommerceBestSalesman, EcommerceLatestProducts, EcommerceNewProducts, EcommerceProductSold, EcommerceSalesProfit, EcommerceTotalBalance, EcommerceWelcome, EcommerceYearlySales } from 'src/components/_dashboard/general-ecommerce'
//
//styling
const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.lighter,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    [theme.breakpoints.up('xl')]: { height: 320 }
  }));
//sample
const Dataonbard = [
    { label: 'Initial Onboarding - Initial Start Pilot', id:0 },
    { label: 'Employee Information - Employee Information',  id:1 },
    { label: 'Vendor Registration - Vendor Registration Onboarding',  id:2 },
    { label: 'Cannabis Laboratory Registration - Cannabis Laboratory Registration', id:3 },
    { label: 'Transportation Agent Registration - Transportation Agent Registration',  id:4 },
    { label: "Employee Pay - Employee Pay", id:5 },
   
]
const GroupData = [
    { label: 'All Groups', id:0, },
    { label: 'Admin',  id:1 },
    { label: 'Design',  id:2 },
    { label: 'Install', id:3 },
    { label: 'Production',  id:4 },
    { label: "Sales", id:5 },
   
]
export default function Insights() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [onboardingStage,setOnboardingStage] = useState()
  const  [groupData,setGroupsData] = useState()
  console.log(onboardingStage,'$$$$$$$$$$$$')
  console.log(groupData,'$$$$$$$$$$$$')

  return (
    <Page title="Insights: Insights | Sign-Wise Solution">
      <Container maxWidth="xl">
          
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <HeaderBreadcrumbs heading="Insights" />
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <EcommerceWelcome/>
          </Grid>
          <Grid item xs={12} md={4}>
            <EcommerceNewProducts />
          </Grid>
          <Grid item xs={12} md={4}>
            <EcommerceProductSold />
          </Grid>
          <Grid item xs={12} md={4}>
            <EcommerceTotalBalance />
          </Grid>
          <Grid item xs={12} md={4}>
            <EcommerceSalesProfit />
          </Grid>
          <Grid item xs={12} md={10} lg={12}>
            <EcommerceYearlySales />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <EcommerceBestSalesman />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <EcommerceLatestProducts />
          </Grid>
          </Grid>
      </Container>
    </Page>
  )
}
