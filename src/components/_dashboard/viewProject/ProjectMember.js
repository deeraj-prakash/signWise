
import { Icon } from '@iconify/react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import DeleteIcon from '@material-ui/icons/Delete';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

// material
import {
  Box,
  Grid,
  Card,
  Link,
  Avatar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Button,
  Checkbox,
} from '@material-ui/core';
import { alpha, useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'src/routes/paths';

export default function ProjectMember(){
    const members =[
        { id:0,
          name:'Printer',
          place:'USA',
          post:'Printer All',
          task:1,
          avatarUrl:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1lcmljYW4lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D'
        },
        {   id:1,
            name:'John Honnai',
            place:'USA',
            post:'Project Manager',
            task:0,
          },
          { id:2,
            name:'Carlos',
            place:'USA',
            post:'Project Manager',
            task:0,
          },
          { id:3,
            name:'Robert',
            place:'USA',
            post:'Project Manager',
            task:2,
          },
    ]
    return(
        <Grid container spacing={3}>
        {members?.map((friend) => (
          <Grid key={friend.id} item xs={12} md={4}>
            <FriendCard friend={friend} />
          </Grid>
        ))}
      </Grid>
    )
}

function FriendCard({ friend }) {
    const theme = useTheme()
    const navigate = useNavigate()
    const { name, avatarUrl,post,task } = friend;
  
    return (
      <Card
        sx={{
          py: 5,
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
         <Checkbox
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
        <Avatar alt={name} src={avatarUrl} sx={{ width: 64, height: 64, mb: 3 }} />
        <Link to="#" variant="subtitle1" color="text.primary">
          {name}
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {post}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Tasks:{task}
        </Typography>
        <Button sx={{marginTop:2}} onClick={()=>{
          navigate(PATH_DASHBOARD.blog.viewmember)   
        }} variant='contained'>View Profie</Button>
        <IconButton
          sx={{
            top: 8,
            right: 8,
            position: 'absolute'
          }}
        >
          <Icon color={theme.palette.primary.main} icon={trash2Outline} width={24} height={24} />
        </IconButton>
      </Card>
    );
  }