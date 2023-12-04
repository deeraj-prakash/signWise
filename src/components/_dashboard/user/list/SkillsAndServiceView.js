import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { paramCase } from 'change-case';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { LoadingButton } from '@material-ui/lab';
import { BlockOutlined } from '@material-ui/icons';
import { useFormik } from 'formik';
// material
import { useTheme } from '@material-ui/core/styles';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Modal from 'src/components/_dashboard/blog/ProjectModel.js';

import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText,Typography,Grid,Box ,Stack,TextField,Button } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

SkillsAndServiceView.propTypes = {
  onDelete: PropTypes.func,
  userName: PropTypes.string
};

export default function SkillsAndServiceView({ onDelete, userName }) {
  const ref = useRef(null);
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  
  const LabelStyle = styled(Typography)(({ theme }) => ({
          ...theme.typography.subtitle2,
          color: theme.palette.text.secondary,
          marginBottom: theme.spacing(1)
        }));
  const [add, setAdd] = useState(false);
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: 'Compliance',
    }})
    const { errors,  touched, getFieldProps } = formik;

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >

        <MenuItem
        //   component={RouterLink}
        //   to={`${PATH_DASHBOARD.adminAccount.userRoleEdit}`}
        onClick={() => {
            setAdd(!add);
           }}
        >
          <ListItemIcon>
            {/* <Icon icon={editFill} width={24} height={24} /> */}
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
        >
          <ListItemIcon>
            {/* <Icon icon={editFill} width={24} height={24} /> */}
          </ListItemIcon>
          <ListItemText primary="Deactivate" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
        >
          <ListItemIcon>
            {/* <Icon icon={editFill} width={24} height={24} /> */}
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        {/* <MenuItem
        //   component={RouterLink}
        //   to={`${PATH_DASHBOARD.user.root}/${paramCase(userName)}/edit`}
        //   sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
          <BlockOutlined sx={{width:25,height:25}}/>
          </ListItemIcon>
          <ListItemText primary="Deactivate" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
        
      </Menu>

      <Modal
            open={add}
            handleClose={() => {
                setAdd(false);
            }}
            modalTitle={'Add Skills/Services'}
            >
               <Stack>
                    <TextField
                        name="Name" // Add the name prop to the TextField component
                        label="Name"
                        placeholder="Name"
                        fullWidth // add this line to make the Autocomplete component full width
                        {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    ></TextField>
                </Stack>

              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <LoadingButton type="submit" variant="contained" onClick={() => { setAdd(false) }} loading={isSubmitting}>
                      {' Save '}
                    </LoadingButton>
                    <Button variant="outlined" type="submit" onClick={() => { setAdd(false) }}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>        
        </Modal>
    </>
  );
}
