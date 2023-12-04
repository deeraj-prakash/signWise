import { Avatar, Box, Button, Card, CardHeader, Grid, InputAdornment, OutlinedInput, Stack, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Scrollbar from './Scrollbar';
import MyAvatar from './MyAvatar';
import { PATH_CALL } from 'src/routes/paths';

const Data = [
  {
    id: 0,
    name: 'Person Name',
    to: '+919496351674',
    direction: 'Incoming',
    duration: '00:18',
  },
  {
    id: 1,
    name: 'Person Name',
    to: '+919496351674',
    direction: 'Incoming',
    duration: '00:18',
  },
  {
    id: 2,
    name: 'Person Name',
    to: '+919496351674',
    direction: 'Incoming',
    duration: '00:18',
  },
  {
    id: 3,
    name: 'Person Name',
    to: '+919496351674',
    direction: 'Incoming',
    duration: '00:18',
  },
  {
    id: 4,
    name: 'Person Name',
    to: '+919496351674',
    direction: 'Incoming',
    duration: '00:18',
  },
]

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 240, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

function MinimizablePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [filterName, setFilterName] = useState('');

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  useEffect(()=>{
    openNewTab(PATH_CALL.root)
    return ()=>window.close(PATH_CALL.root)
  },[])
  const openNewTab = (url) => {
    const windowFeatures = 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';
    window.open(url, '_blank','width=500,height=1000');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={8}>
      <Card sx={{ p: 3 }}>
      <Stack direction={'row'}>
        <Box>
          <MyAvatar
            sx={{
              // mx: 'auto',
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: 'common.white',
              width: { xs: 60, md: 96 },
              height: { xs: 60, md: 96 }
            }}
          />
          <Box sx={{
            height:'20px',
            width:'20px',
            backgroundColor:'green',
            position:'relative',
            bottom:15,
            left:65,
            borderRadius:'50%'
          }}/>
        </Box>
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <Typography variant="h4">{'Fusion Sign & Design'}</Typography>
          <Typography sx={{ opacity: 0.72 }}>{'Traffic Solutions'}</Typography>
        </Box>
      </Stack>
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <Button variant="contained" color='error'>Go Offline</Button>
      </Box>
      </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
          <Card>
          {/* <CardHeader title="Latest Orders" /> */}
          <Box 
          sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <SearchStyle
          value={filterName}
          onChange={handleFilterByName}
          placeholder="Search ..."
          startAdornment={
            <InputAdornment position="start">
              <Box sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
        </Box>
          <Scrollbar>
            <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
              {Data.map((item) => (
                <Stack direction="row" spacing={2}>
                <Avatar alt={item.name} src={''} />
          
                <Box sx={{ flexGrow: 1, minWidth: 200 }}>
                  <Typography variant='subtitle2' sx={{ color: 'text.primary',  }}>
                    {item.name}
                  </Typography>
          
                  <Stack direction="row">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.to}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              ))}
            </Stack>
          </Scrollbar>
        </Card>
      </Grid>
      </Grid>
  )
}

export default MinimizablePopup;

