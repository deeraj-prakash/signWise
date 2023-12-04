import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { paramCase } from 'change-case';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { BlockOutlined } from '@material-ui/icons';
import { useFormik } from 'formik';
// material
import { useTheme } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import { ChromePicker } from 'react-color';

import Modal from 'src/components/_dashboard/blog/ProjectModel.js';

import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText,Typography,Grid,Box ,Stack,TextField,Button } from '@material-ui/core';
import  UserRoleEdit from 'src/components/_dashboard/user/list/UserRoleEdit.js';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

ClientTypeView.propTypes = {
  onDelete: PropTypes.func,
  userName: PropTypes.string
};

export default function ClientTypeView({ onDelete, userName }) {
  const ref = useRef(null);
  const theme = useTheme()
  const [color, setColor] = useState('#2f715a');
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [colorPicker, setColorPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: 'Builders',
    }})
    const { errors,  touched, getFieldProps } = formik;

    const handleColorChange = (updatedColor) => {
        console.log({updatedColor});
        setColor(updatedColor.hex);
      };

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
           onClick={() => {
            setAdd(!add);
           }}
          // onClick={()=>
          //   setEdit(true)} 
        >
          <ListItemIcon>
            {/* <Icon icon={editFill} width={24} height={24} /> */}
          </ListItemIcon>
          <ListItemText onClick={()=>
            setEdit(true)} 
            primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
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
            modalTitle={'Edit Client Type'}
            >
               <Stack spacing={2}>
                    <TextField
                        name="Name" // Add the name prop to the TextField component
                        label="Name"
                        placeholder="Name"
                        fullWidth // add this line to make the Autocomplete component full width
                        {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    ></TextField>
                    <Stack direction={'row'}>
                        <Box onClick={()=>setColorPicker(!colorPicker)} sx={{width:'10%',p:2,background:color,borderLeft:`1.5px solid ${color}`,borderTop:`1.5px solid ${color}`,borderBottom:`1.5px solid ${color}`,borderRadius:'10px 0px 0px 10px'}}>
                            
                        </Box>
                        <Box sx={{width:'90%',p:2,height:'5%',borderRight:`1.5px solid ${color}`,borderTop:`1.5px solid ${color}`,borderBottom:`1.5px solid ${color}`,borderRadius:'0px 10px 10px 0px'}}>
                            {color}
                        </Box>
                    </Stack>
                    <Box>
                    {colorPicker&&<ChromePicker color={color} onChange={handleColorChange} />}
                    </Box>
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
