//material 
import { Container,Stack,Grid,Paper,Typography, } from "@material-ui/core"
//components
import Page from "src/components/Page"
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs"

export default function Opportunity(){
    return(
        <Page title="Opportunity Information | Sign-Wise Solution">
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <HeaderBreadcrumbs heading="Opportunity Information" />
          </Stack>
          <Grid container sx={{ justifyContent: 'center' }} spacing={3}>
      <Grid item xs={12} md={8}>
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
            key={''}
            sx={{
              p: 3,
              width: 1,
              bgcolor: 'background.neutral'
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
            Name :Test 1
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
              Stage: &nbsp;
              </Typography>
              Closed Won
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Amount: &nbsp;
              </Typography>
              5:0
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Probability: &nbsp;
              </Typography>
              6 %
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Closed Date: &nbsp;
              </Typography>
              07/23/2021
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
              Lead Source: &nbsp;
              </Typography>
              Others
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
             Description: &nbsp;
              </Typography>
            Test 1
            </Typography>

          </Paper>
           
        
            
           
          </Stack>
        {/* </Card> */}
      </Grid>
    </Grid>
          </Container>
          </Page>
    )
}