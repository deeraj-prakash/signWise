import { Avatar, Box, Button, Card, Grid, IconButton, Stack, Tooltip, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import phoneCallFill from '@iconify/icons-eva/phone-call-fill';
import baselineTextsms from '@iconify/icons-ic/baseline-textsms';
// import Scrollbar from './Scrollbar';
// import MyAvatar from './MyAvatar';

const SOCIALS = [
    {
      name: 'Call',
      icon: <Icon icon={phoneCallFill} width={50} height={50} color="#006097" />
    },
    {
      name: 'Message',
      icon: <Icon icon={baselineTextsms} width={50} height={50} color="#1C9CEA" />
    }
  ];


function MinimizablePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [filterName, setFilterName] = useState('');

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };


  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={8}>
        <Box 
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt:2,
            }}
        >
      <Card sx={{ px: 3, py: 10, height:'90vh', width:'80vw' }}>
      <Stack>
        <Box>
          {/* <MyAvatar
            sx={{
              mx: 'auto',
              width: { xs: 120, md: 192 },
              height: { xs: 120, md: 192 }
            }}
          /> */}
          <Avatar
            sx={{
                mx: 'auto',
                width: { xs: 90, md: 144 },
                height: { xs: 90, md: 144 }
            }} 
            alt={'PI'} 
            src={''} />
        </Box>
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 3, },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <Typography variant="h4">{'Profile Name'}</Typography>
          {/* <Typography sx={{ opacity: 0.72 }}>{'Traffic Solutions'}</Typography> */}
        </Box>
        <Stack direction={'row'} marginTop={5} spacing={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            }}
        >
            <Button variant="outlined">View Profile</Button>
        </Box>
        <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            }}
        >
            <Button variant="outlined">Edit Profile</Button>
        </Box>
        </Stack>
        <Box sx={{ textAlign: 'center', mt: 5, mb: 2.5 }}>
            {SOCIALS.map((social) => (
            <Tooltip key={social.name} title={social.name}>
                <IconButton>{social.icon}</IconButton>
            </Tooltip>
            ))}
        </Box>
      </Stack>
      
      </Card>
      </Box>
      </Grid>
      
      </Grid>
  )
}

export default MinimizablePopup;

