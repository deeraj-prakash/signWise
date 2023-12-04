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

PublicMessageBoard.propTypes = {
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

export default function PublicMessageBoard({ post }) {
  // const { user } = useAuth();
  const commentInputRef = useRef(null);
  const fileInputRef = useRef(null);
  // // const [isLiked, setLiked] = useState(post.isLiked);
  // // const [likes, setLikes] = useState(post.personLikes.length);
  const [message, setMessage] = useState('');
  // const hasComments = post.comments.length > 0;

  // const handleLike = () => {
  //   setLiked(true);
  //   setLikes((prevLikes) => prevLikes + 1);
  // };

  // const handleUnlike = () => {
  //   setLiked(false);
  //   setLikes((prevLikes) => prevLikes - 1);
  // };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleClickAttach = () => {
    fileInputRef.current.click();
  };

  const handleClickComment = () => {
    commentInputRef.current.focus();
  };

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
      {/* <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link to="#" variant="subtitle2" color="text.primary" component={RouterLink}>
            
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            12-1-2020
          </Typography>
        }
        action={
          <IconButton>
            <Icon icon={moreVerticalFill} width={20} height={20} />
          </IconButton>
        }
      /> */}

      <Stack spacing={2} sx={{ p: -7 }}>
        {/* <Typography variant="body1">{post.message}</Typography>
        // 

        <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={
              <MCheckbox
                size="small"
                color="error"
                checked={isLiked}
                icon={<Icon icon={heartFill} width={20} height={20} />}
                checkedIcon={<Icon icon={heartFill} width={20} height={20} />}
                onChange={isLiked ? handleUnlike : handleLike}
              />
            }
            label={fShortenNumber(likes)}
            sx={{ minWidth: 72, mr: 0 }}
          />
          <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
            {post.personLikes.map((person) => (
              <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
            ))}
          </AvatarGroup>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleClickComment}>
            <Icon icon={messageSquareFill} width={20} height={20} />
          </IconButton>
          <IconButton>
            <Icon icon={shareFill} width={20} height={20} />
          </IconButton>
        </Stack>

        {hasComments && (
          <Stack spacing={1.5}>
            {post.comments.map((comment) => (
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
        )} */}
           <Box
            //  component="img"
            //  alt="post media"
            // src='/static/mock-images/feeds/feed_1.jpg'
          />
          <Stack spacing={3} sx={{ p: 1 }}>
        {displayedComments.map((comment, index) => (
          <Stack
            key={comment.id}
            direction="row"
            spacing={2}
            justifyContent={index % 2 === 0 ? 'flex-start' : 'flex-end'}
            alignItems="center"
          >
            {index % 2 === 0 ? (
              <Avatar alt={comment.author.name} src={comment.author.avatarUrl} />
            ) : null}
            <Paper
              sx={{
                p: 1.5,
                flexGrow: 1,
                maxWidth: 400, // Adjust this value as needed
                bgcolor: index % 2 === 0 ? 'background.neutral' : 'primary.main',
                color: index % 2 !== 0 && 'common.white',
                borderRadius: '12px',
              }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ sm: 'center' }}
                justifyContent="space-between"
                sx={{ mb: 0.5 }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: index % 2 === 0 ? 'text.primary' : 'common.white' }}
                >
                  {comment.author.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  {fDate(comment.createdAt)}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{
                  color: index % 2 === 0 ? 'text.secondary' : 'inherit',
                  maxWidth: '100%', // Adjust this value as needed
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {comment.message}
              </Typography>
            </Paper>
            {index % 2 !== 0 ? (
              <Avatar alt={comment.author.name} src={comment.author.avatarUrl} />
            ) : null}
          </Stack>
        ))}
        {/* ... (remaining components remain the same) */}
      </Stack>
      

        <Stack direction="row" alignItems="center">
          <MyAvatar />
          <TextField
            fullWidth
            size="small"
            value={message}
            inputRef={commentInputRef}
            placeholder="Write a Message…"
            onChange={handleChangeMessage}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClickAttach}>
                    <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
                  </IconButton>
                  <EmojiPicker alignRight value={message} setValue={setMessage} />
                </InputAdornment>
              )
            }}
            sx={{
              ml: 2,
              mr: 1,
              '& fieldset': {
                borderWidth: `1px !important`,
                borderColor: (theme) => `${theme.palette.grey[500_32]} !important`
              }
            }}
          />
          <IconButton>
            <Icon icon={roundSend} width={24} height={24} />
          </IconButton>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
        </Stack>
      </Stack>
    </Card>
  );
}
