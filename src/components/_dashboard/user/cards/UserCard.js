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
import { Box, Card, Grid, Avatar, Tooltip, Divider, Typography, IconButton } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
//
import SvgIconStyle from '../../../SvgIconStyle';
import Label from 'src/components/Label';
import ViewProject from '../../../../pages/dashboard/ViewProject';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'src/routes/paths';
// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />
  },
  {
    name: 'Instagram',
    icon: <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
  },
  {
    name: 'Linkedin',
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />
  }
];

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
  // background: `url(${src}) center/cover no-repeat`
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

UserCard.propTypes = {
  user: PropTypes.object.isRequired
};

export default function UserCard({user}) {
  const theme = useTheme();
  const navigate=useNavigate()
  const { projectName, dueDate,id, status, numberOfMembers, tasks, img, following,logo } = user;                 
  

  return (
    <Card onClick={()=>{
       navigate(PATH_DASHBOARD.blog.viewproject)
        // component={RouterLink}
              // to={PATH_DASHBOARD.blog.newPost}
      // <ViewProject project={user} />
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
        <SvgIconStyle
          color="paper"
          src="/static/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            bottom: -26,
            position: 'absolute'
          }}
        />
        <Avatar
          alt={projectName}
          src={img}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            position: 'absolute',
            transform: 'translateY(-50%)'
          }}
        />
        <CoverImgStyle alt="cover" src={logo} />
      </CardMediaStyle>

      <Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
        {projectName}
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
        Date:{dueDate}
      </Typography>

      {/* <Box sx={{ textAlign: 'center', mt: 2, mb: 2.5 }}>
        {SOCIALS.map((social) => (
          <Tooltip key={social.name} title={social.name}>
            <IconButton>{social.icon}</IconButton>
          </Tooltip>
        ))}
      </Box> */}

      <Divider />
      
      <Grid container sx={{ py: 3, textAlign: 'center',justifyContent:'space-between' ,display:'flex',flexDirection:'row',px:2, }}>
        <Typography>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
           color={(status === 'In Active' && 'error') || 'success'} >
           Status: {sentenceCase(status)}
          </Label>
        </Typography>
        <Typography>{` Tasks:${tasks}`}</Typography>
      </Grid>
      <Grid container sx={{paddingBottom:1, textAlign: 'center',justifyContent:'center'  }}>
      <Typography>{` Members:${numberOfMembers}`}</Typography>
      </Grid>
    </Card>
  );
}
