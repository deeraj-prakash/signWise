import { Box, Typography,Stack, Avatar, IconButton } from "@material-ui/core";
//
import { Icon } from '@iconify/react';
import robotsIcon from '@iconify/icons-file-icons/robots';
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import { Search } from "@material-ui/icons";
import { useState } from "react";

const img = 'https://prod-images.tcm.com/Master-Profile-Images/LeonardoDiCaprio.jpg'
export default function ChatbotHeader({
    openForm,setOpenForm
}){
     console.log(openForm)
    const theme = useTheme()
    const HandleOpen=()=>{
        setOpenForm(!openForm)
    }
    return(
        <Box sx={{ width: 'auto', height: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Icon icon={robotsIcon} width={30} height={40} />
          <Stack pl={1}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>Atom</Typography>
            <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main }}>. Online</Typography>
          </Stack>
          <Stack pt={1} pl={2}>
            <Search />
          </Stack>
        </Box>
        <Box >
         <IconButton onClick={HandleOpen} >
             <Avatar alt="John"  src={img} />
         </IconButton>
        </Box>
      </Box>
      
    )
}