import {
    Container,
    Stack,
    Grid,
    Card,
    Box,
    Typography,
  } from '@material-ui/core'
  
  //components
  import Page from 'src/components/Page'
  import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
  import { useState } from 'react'
  import { WeeklyCalls } from 'src/components/_dashboard/general-ecommerce'
  //
  export default function Insights() {
    const  [array,setArray] = useState([
        { text: 'Total Inbound Calls', value: '1039'},
        { text: 'Total Outbound Calls', value: '316'},
        { text: 'Total Missed Calls', value: '222'},
        { text: 'Total Answered Calls', value: '1129'},
        { text: 'Total Inbound Talk Time', value: '4h 5m 17s'},
        { text: 'Total Outbound Talk Time', value: '4h 54m 31s'},
        { text: 'Average Handle Time', value: '23s'},
        { text: 'Rate of Answered Calls', value: '0.84'},
    ])
  
    return (
      <Page title="Analytics: Analytics | Sign-Wise Solution">
        <Container maxWidth="xl">
            
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <HeaderBreadcrumbs heading="Analytics" />
          </Stack>
          <Grid container spacing={3}>
            {array.map((item)=><Grid item xs={12} md={3}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" paragraph>
                    {item.text}
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                    {item.value}
                    </Typography>
                </Box>
            </Card>
            </Grid>)}
            
            <Grid item xs={12} md={10} lg={12}>
              <WeeklyCalls />
            </Grid>

            </Grid>
        </Container>
      </Page>
    )
  }
  