import { Card, Typography,Stack } from "@material-ui/core";


export default function viewRequest(){
    return(
       <Card>
        <Stack sx={{m:3}} spacing={3}>
            <Stack direction={{ xs: 'row', sm: 'row' }} sx={{justifyContent:'space-between'}} spacing={{ xs: 3, sm: 2 }}>
              <Typography variant="overline" sx={{color:'text.secondary'}}>Testing Lab</Typography>
              <Stack>             
               <Typography variant="overline" sx={{color:'text.secondary'}}>Budget</Typography>
               <Typography variant="body" sx={{color:'text.secondary'}}>Price Unknown</Typography>
               </Stack>
            </Stack>
            <Stack direction={{ xs: 'row', sm: 'row' }}
             sx={{justifyContent:'space-between'}} 
             spacing={{ xs: 3, sm: 2 }}>
                 <Typography variant="body" sx={{color:'text.secondary'}}>Description:Its just a sample</Typography>
                 <Stack>
                    <Typography  variant="overline" sx={{color:'text.secondary'}}>Response need to be submitted by :11/30/2023</Typography>
                    <Typography variant="overline" sx={{color:'text.secondary'}}>Participation Ends: 12/21/2023</Typography>
                 </Stack>
                </Stack>
        </Stack>
       </Card>
    )
}