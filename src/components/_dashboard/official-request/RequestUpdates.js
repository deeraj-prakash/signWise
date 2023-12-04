import { Avatar, Button, Card, Stack, Typography } from "@material-ui/core";

export default function RequestUpdates(){
    return(
        <Card>
          <Stack sx={{m:3}} spacing={3}>
          <Stack direction={{ xs: 'row', sm: 'row' }} 
          sx={{justifyContent:'flex-start'}}
           spacing={{ xs: 3, sm: 2 }}>
            <Avatar sx={{width:45,height:45}}
            src='https://sp-ao.shortpixel.ai/client/q_lossy,ret_img,w_500,h_517/https://skyniche.com/wp-content/uploads/2020/08/CFO.jpg' alt="image"
            />
            <Stack>
             <Typography variant="overline" sx={{color:'text.secondary'}}>Rakesh K</Typography>
             <Typography variant="body" sx={{color:'text.secondary'}}>New RFP request has been created.</Typography>
            </Stack>
            </Stack>
            <Typography variant="body" sx={{color:'text.secondary'}}>Updated 4 hours ago</Typography>
            </Stack>  
            <Button sx={{ml:2}} variant="outlined">
                    Load More
                </Button>  
        </Card>
    )
}