import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { sentenceCase } from 'change-case';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { Box, Card, Grid, Avatar, Tooltip, Divider,Stack,Typography, IconButton, AvatarGroup } from '@material-ui/core';
// utils
import { fShortenNumber } from 'src/utils/formatNumber';
//
import SvgIconStyle from 'src/components/SvgIconStyle';
import Label from 'src/components/Label';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Message, MessageSharp, RequestQuote } from '@material-ui/icons';
// ----------------------------------------------------------------------



const CardMediaStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  paddingTop: 'calc(100% * 9 / 16)',
  '&:before': {
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
    //  backdropFilter: 'blur(3px)',
     WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
    borderTopLeftRadius: theme.shape.borderRadiusMd,
    borderTopRightRadius: theme.shape.borderRadiusMd,
    // backgroundColor: alpha(theme.palette.primary.darker, 0.72)
  }
}));

const CoverImgStyle = styled('img')({
  top: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
//    background: `url(${src}) center/cover no-repeat`
});

// ----------------------------------------------------------------------

function InfoItem(number) {
  return (
    <Grid item xs={4}>
      <Typography variant="caption" sx={{ mb: 0.5, color: 'text.secondary', display: 'block' }}>
        Follower
      </Typography>
      <Typography variant="subtitle1">{fShortenNumber(number)}</Typography>
    </Grid>
  );
}

OfficialCard.propTypes = {
  card: PropTypes.object.isRequired
};

export default function OfficialCard({card}) {
  const theme = useTheme();
  const navigate=useNavigate()
  const { image,message,time_period,id,name,status,request,people } = card;                 
  

  return (
    <Card onClick={()=>{
    //    navigate(PATH_DASHBOARD.blog.viewproject)
       
    }} >
      <CardMediaStyle>
      <IconButton
        sx={{
          top: 8,
          right: 8,
          position: 'absolute'
        }}
      >
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>
        {/* <SvgIconStyle
          color="paper"
          src={image}
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            bottom: -26,
            position: 'absolute'
          }}
        /> */}
        
        <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 62, height: 62, zIndex: 10, } }}>
            {people.map((person) => {
                console.log(person)
                return(
              <Avatar key={person.id} sx={{ width: 30,
                height: 30, 
                 position: 'absolute',
                   transform: 'translateY(-50%)'
                }} alt={person.name} src={person.image} />
            )})}
          </AvatarGroup>
        <CoverImgStyle alt="cover" src={image} />
        <Typography sx={{position:'absolute',top:8,left:10,zIndex:10}}>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
           color={(status === 'open' ? 'info' :(status === 'Rejected' ?'error':'success'))} >
           Status: {sentenceCase(status)}
          </Label>
        </Typography>
      </CardMediaStyle>
       
      <Typography onClick={()=>navigate(PATH_DASHBOARD.official.viewRequest)} variant="subtitle1" align="center" 
      sx={{ mt: 6,color:theme.palette.primary.main,'&:hover':{
        cursor:'pointer'
      } }}>
      {name}
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
       RFQ
      </Typography>
      <Typography variant="overline" align="center" sx={{ color: 'text.secondary' }}>
     
      </Typography>
      

      <Divider />
      
       <Typography variant="subtitle1" align="center" sx={{ color: 'text.secondary',mt:2 }}>Updated at {time_period} months</Typography>
       <Grid container sx={{textAlign: 'center',justifyContent:'flex-end' ,display:'flex',flexDirection:'row',gap:1,pb:2,pr:2 }}>
       <Typography  variant="body2" align="center" sx={{ color: 'text.secondary' }}>
        <MessageSharp sx={{width:20,height:20}}/>{message}
        </Typography>
       <Typography  variant="body2" align="center" sx={{ color: 'text.secondary' }}>
        <RequestQuote sx={{width:20,height:20}}/>{request}
        </Typography>
       </Grid> 
    </Card>
  );
}
