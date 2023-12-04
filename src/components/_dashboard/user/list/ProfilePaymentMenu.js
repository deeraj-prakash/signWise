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
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

CustomerOrderMenu.propTypes = {
  onDelete: PropTypes.func,
  userName: PropTypes.string
};

export default function CustomerOrderMenu({ onDelete, userName }) {
  const ref = useRef(null);
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(false);

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
        // component={RouterLink}
        // to={`${PATH_DASHBOARD.customerOrders.create}`}
        >
          <ListItemIcon>
            {/* <Icon icon={editFill} width={24} height={24} /> */}
          </ListItemIcon>
          <ListItemText primary="Invoice" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
        >
          <ListItemIcon>
            {/* <Icon icon={editFill} width={24} height={24} /> */}
          </ListItemIcon>
          <ListItemText primary="Complete Order" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
        >
          <ListItemIcon>
            {/* <Icon icon={editFill} width={24} height={24} /> */}
          </ListItemIcon>
          <ListItemText primary="Cancel Order" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
