import React, { useState } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import roundGroup from '@iconify/icons-ic/round-group';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_CALL, PATH_DASHBOARD } from 'src/routes/paths.js';
import { Group as GroupIcon } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import phoneCallFill from '@iconify/icons-eva/phone-call-fill';
import { LoadingButton } from '@material-ui/lab';
import { useTheme } from '@material-ui/core/styles';
import { Box, Card, Grid, Avatar, Tooltip, Divider, Typography, IconButton, Button,Stack,Autocomplete,TextField,Checkbox } from '@material-ui/core';
// utils
import Modal from 'src/components/_dashboard/blog/ProjectModel.js';
import { fShortenNumber } from '../../../../utils/formatNumber';
//
import SvgIconStyle from '../../../SvgIconStyle';
import { Form, FormikProvider, useFormik } from 'formik';
import Label from 'src/components/Label';

// ----------------------------------------------------------------------

const Group = [
  { code: 'AD', label: 'Admin' },
  { code: 'AE', label: 'Production'},
  { code: 'AF', label: 'Design' },
  { code: 'AG', label: 'Sales'},
  ] // replace with your Request data


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
    WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
    borderTopLeftRadius: theme.shape.borderRadiusMd,
    borderTopRightRadius: theme.shape.borderRadiusMd,
  }
}));

const CoverImgStyle = styled('img')({
  top: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const readOnlyRating = 3;

function InfoItem({ number }) {
  return (
    <Grid item xs={4}>
      <Typography variant="caption" sx={{ mb: 0.5, color: 'text.secondary', display: 'block' }}>
        Follower
      </Typography>
      <Typography variant="subtitle1">{fShortenNumber(number)}</Typography>
    </Grid>
  );
}

InfoItem.propTypes = {
  number: PropTypes.number.isRequired,
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default function UserCard({ user }) {
  const theme = useTheme();
  const { projectName, dueDate, status, numberOfMembers, tasks, img, following, logo,medal } = user;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popup,setPopup] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await updateProfile({ ...values });
        enqueueSnackbar('Add Success', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting } = formik;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)',
    }, }}
    onMouseEnter={()=>setIsHovered(true)}
    onMouseLeave={()=>setIsHovered(false)}
    > 

      {isHovered&&<Box sx={{ position: 'absolute', top: 0, left: 0, zIndex: 10, padding: '12px' }}>
        <Checkbox
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          sx={{
            color: (theme) => theme.palette.common.white, 
            '&.Mui-checked': {
              color: (theme) => theme.palette.common.white 
            }
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Box>}
      {!isHovered && <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 10, padding: '12px' }}>
        <img width={25} height={25} src={medal}/>
      </Box>}
      <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 10, padding: '12px' }}>
      <IconButton
          sx={{
            color: (theme) => theme.palette.common.white, 
            '&.Mui-checked': {
              color: (theme) => theme.palette.common.white 
            }
          }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          size="small"
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
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
        {!isHovered && <Typography
          sx={{
            zIndex: 12,
            position: 'absolute',
            top: 15,
            right: 10,
          }}
        >
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
           color={(status === 'In Active' && 'error') || 'success'} >
           {sentenceCase(status)}
          </Label>
        </Typography>}
      </CardMediaStyle>
      <Box sx={{ zIndex: 12, position: 'absolute', left: 7 ,mt:1}}>
        <Rating size="small" name="read-only" value={readOnlyRating} readOnly />
      </Box>
      <Box sx={{ zIndex:12,position:'absolute',right:15,mt:1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1" 
            sx={{ cursor: 'pointer', color: 'primary.main' }}>
              0 Reviews
            </Typography>
          </Stack>
        </Box>
      <Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
        {projectName}
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
        {dueDate}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2.5 }}>
        {SOCIALS.map((social) => (
          <Tooltip key={social.name} title={social.name}>
            <IconButton>{social.icon}</IconButton>
          </Tooltip>
        ))}
      </Box>
      {/* <Box component="fieldset" mb={3} borderColor="transparent" sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Rating name="read-only" value={readOnlyRating} readOnly />
      </Box> */}

      {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2.5 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2" 
            sx={{ cursor: 'pointer', color: 'primary.main' }}>
              0 Reviews
            </Typography>
          </Stack>
        </Box> */}

        

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2.5,}}>
          <Stack direction="row" alignItems="center" spacing={1}>
          <Button
          // component={RouterLink} to={PATH_DASHBOARD.user.minimizecall}
          onClick={()=>window.open(PATH_CALL.root, '_blank','width=500,height=1000')}
          >
          <Icon icon={phoneCallFill} width={40} height={40} color="#006097" />
          </Button>
        </Stack>
        </Box>

        

      <Divider />
      
      <Grid container sx={{ py: 3, textAlign: 'center',justifyContent:'center' ,display:'flex', px:2, }}>
        {/* <Typography>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
           color={(status === 'In Active' && 'error') || 'success'} >
           {sentenceCase(status)}
          </Label>
        </Typography> */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Button style={{ background:`${theme.palette.action.hover}`}}
          startIcon={<Icon icon={roundGroup}/>}
          onClick={() => 
            {
            setPopup(!popup);
            }}
          >
            <Typography variant='subtitle2'>{`Add To Group`}</Typography>
          </Button>
        <Button style={{ background:`${theme.palette.action.hover}`,}}
          component={RouterLink} to={PATH_DASHBOARD.user.account}>
          <Typography variant='subtitle2'>{`View Profile`}</Typography>
        </Button>
        </Stack>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem component={RouterLink} to={PATH_DASHBOARD.user.useredit} onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </Grid>
      <Grid container sx={{ paddingBottom: 1, textAlign: 'center', justifyContent: 'center' }}>
        <Typography>{` Requests : ${numberOfMembers}`}</Typography>
      </Grid>

      <Modal
          open={popup}
          handleClose={() => {
            setPopup(false);
          }}
          modalTitle={'Add To Groups'}
        >
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off">
              <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>
                <Autocomplete
                  multiple
                  fullWidth
                  id="checkboxes-tags-demo"
                  options={Group}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox checked={selected} />
                      {option.label}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Add To Groups"
                      placeholder="Search Groups"
                      error={Boolean(touched.Group && errors.Group)}
                      helperText={touched.Group && errors.Group}
                      fullWidth // add this line to make the Autocomplete component full width
                    />
                  )}
                />
              </Stack>

              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <LoadingButton variant="contained" onClick={() => { setPopup(false) }} loading={isSubmitting}>
                      {' Add '}
                    </LoadingButton>
                    <Button variant="outlined" onClick={() => { setPopup(false) }}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Modal>
    </Card>
  );
}
