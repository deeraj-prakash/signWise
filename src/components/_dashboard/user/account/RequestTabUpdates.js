import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import roundSend from '@iconify/icons-ic/round-send';
import heartFill from '@iconify/icons-eva/heart-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import messageSquareFill from '@iconify/icons-eva/message-square-fill';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
// material
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  Avatar,
  TextField,
  Typography,
  Button,
  CardHeader,
  IconButton,
  AvatarGroup,
  InputAdornment,
  FormControlLabel
} from '@material-ui/core';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';
// hooks
import useAuth from '../../../../hooks/useAuth';
//
import MyAvatar from '../../../MyAvatar';
import EmojiPicker from '../../../EmojiPicker';
import { MCheckbox } from '../../../@material-extend';

// ----------------------------------------------------------------------

ProfilePostCard.propTypes = {
  post: PropTypes.object
};

const predefinedComments = [
    {
      id: 1,
      author: {
        name: 'John Doe',
        avatarUrl: '/static/mock-images/avatars/avatar_1.jpg',
      },
      createdAt: new Date().toISOString(),
      message: 'Request has been accepted.'
    },
    {
      id: 2,
      author: {
        name: 'Jane Smith',
        avatarUrl: '/static/mock-images/avatars/avatar_2.jpg',
      },
      createdAt: new Date().toISOString(),
      message: 'RFP request has been updated.',
    },

    {
        id: 3,
        author: {
          name: 'John Doe',
          avatarUrl: '/static/mock-images/avatars/avatar_3.jpg',
        },
        createdAt: new Date().toISOString(),
        message: 'Request has been Reopened.',
      },

      {
        id: 4,
        author: {
          name: 'Jane Smith',
          avatarUrl: '/static/mock-images/avatars/avatar_4.jpg',
        },
        createdAt: new Date().toISOString(),
        message: 'Request has been reject.',
      },

      {
        id: 5,
        author: {
          name: 'John Doe',
          avatarUrl: '/static/mock-images/avatars/avatar_5.jpg',
        },
        createdAt: new Date().toISOString(),
        message: 'Request has been accepted.',
      },

      {
        id: 6,
        author: {
          name: 'Jane Smith',
          avatarUrl: '/static/mock-images/avatars/avatar_6.jpg',
        },
        createdAt: new Date().toISOString(),
        message: 'Partner, John Doe has been added to the request',
      },

      {
        id: 7,
        author: {
          name: 'John Doe',
          avatarUrl: '/static/mock-images/avatars/avatar_7.jpg',
        },
        createdAt: new Date().toISOString(),
        message: 'New RFP request has been created',
      }
    // Add more predefined comments as needed
  ];

export default function ProfilePostCard() {

  const initialComments = predefinedComments.slice(0, 4);
  const remainingComments = predefinedComments.slice(4);
  const [displayedComments, setDisplayedComments] = useState(initialComments);
  const [showAll, setShowAll] = useState(false);

  const handleLoadMore = () => {
    setDisplayedComments(predefinedComments);
    setShowAll(true);
  };

  const handleLoadLess = () => {
    setDisplayedComments(initialComments);
    setShowAll(false);
  };

  return (
    <Card>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1.5}>
          {displayedComments.map((comment) => (
            <Stack key={comment.id} direction="row" spacing={2}>
              <Avatar alt={comment.author.name} src={comment.author.avatarUrl} />
              <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: 'background.neutral' }}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems={{ sm: 'center' }}
                  justifyContent="space-between"
                  sx={{ mb: 0.5 }}
                >
                  <Typography variant="subtitle2">{comment.author.name}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                    {fDate(comment.createdAt)}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {comment.message}
                </Typography>
              </Paper>
            </Stack>
          ))}
        </Stack>
        {remainingComments.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" onClick={showAll ? handleLoadLess : handleLoadMore}>
              {showAll ? 'Load Less' : 'Load More'}
            </Button>
          </Box>
        )}
      </Stack>
    </Card>
  );
}
