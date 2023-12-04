import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { paramCase } from 'change-case';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { BlockOutlined } from '@material-ui/icons';
// material
import { useTheme } from '@material-ui/core/styles';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText,  } from '@material-ui/core';
import  UserRoleEdit from 'src/components/_dashboard/user/list/UserRoleEdit.js';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

UserRoleView.propTypes = {
  onDelete: PropTypes.func,
  userName: PropTypes.string
};

export default function UserRoleView({ onDelete, userName }) {
  const ref = useRef(null);
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);

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
          component={RouterLink}
          to={`${PATH_DASHBOARD.adminAccount.userRoleEdit}`}
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
    </>
  );
}
