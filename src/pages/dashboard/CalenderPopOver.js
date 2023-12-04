
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Stack, Button, Popover, Container, Typography ,IconButton,Icon} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { useTheme } from '@material-ui/core/styles';
import { Block } from '../components-overview/Block';
import Label from 'src/components/Label';
const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
export default function CalenderPopOver({title,open,handleClose,project}){
     const theme = useTheme();
    console.log('%%%%%%',project)
    return(
        
        <Popover
        open={open}
          anchorEl={open}
         onClose={!open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
       <Box sx={{ p: 2, maxWidth: 280 }}>
    <Stack sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
      <Typography variant='subtitle1' gutterBottom>Project Details</Typography>
      <IconButton
        onClick={handleClose}
        sx={{ position: 'relative', top: -5, right: 5, }}
      >
        <Close sx={{width:15,height:15}} />
      </IconButton>
    </Stack>
    <Typography variant="body2" sx={{ color: 'text.secondary' }} >
      Project Name:{project.title}
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      Start Date: {project.start}
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      End Date: {project.end}
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      installation Date: {project.installationDate}
    </Typography>
    <Typography variant='body2'sx={{ color: project.status === 'Up-Coming' ? theme.palette.info.light
      : project.status === 'In-Progress' ? theme.palette.warning.main
      : project.status === 'Success' ? theme.palette.success.main
      : theme.palette.text.primary
    }}>
     
      Status:{project.status}
      
    </Typography>
  </Box>
      </Popover>   
    )
}