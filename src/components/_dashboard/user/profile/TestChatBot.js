import React, { useState, useRef, useEffect } from 'react';
import {
  IconButton,
  TextField,
  InputAdornment,
  Container,
  Paper,
  Typography,
  Stack,
  Divider,
  Avatar,
  Box,
  Button,
  Grid,
  Popover,
  makeStyles
} from '@material-ui/core';
import roundSend from '@iconify/icons-ic/round-send';
import { Icon } from '@iconify/react';
import Gif from 'src/Gif/chat-ai.gif';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
import EmojiPicker from 'src/components/EmojiPicker';
import { Search } from '@material-ui/icons';
import { MIconButton } from 'src/components/@material-extend/index.js';

const ChatBot = ({ handleClickAttach }) => {
  const [messages, setMessages] = useState([
    { text: 'Hi there! Atom here, how can I help you?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const img = 'https://prod-images.tcm.com/Master-Profile-Images/LeonardoDiCaprio.jpg';
  const [isThinking, setIsThinking] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentCom, setCurrentCom] = useState('trackOrder');
  const [showTrackOrder, setShowTrackOrder] = useState(true); // Set to true to display Track Your Order initially
  const [anchorEl, setAnchorEl] = useState(null);
  const messagesContainerRef = useRef(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAttachImage = () => {
    // Trigger the click event of the hidden file input
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Handle the selected file (you may want to upload or display it)
    console.log('Selected file:', file);
  };

  const inputFileRef = useRef(null);

  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji.native);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: theme.palette.primary.chatbotBack,
      padding: theme.spacing(1),
      borderRadius: 30,
      margin: theme.spacing(2),
    },
    text: {
      color: theme.palette.primary.main,
      fontSize: '1rem',
      fontWeight: 'medium',
    },
  }));
  
  const classes = useStyles();
    
  const handleSendMessage = () => {
    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Display "thinking..." message
    setIsThinking(true);

    // Simulate a delay before getting the bot's response
    setTimeout(() => {
      // Actual bot response
      const botMessage = { text: 'I received your message!', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsThinking(false); // Set thinking to false when the response arrives
    }, 2000);

    setInput('');
  };

  const handleToggleChat = () => {
    setCurrentCom('chat')
    setShowChat((prevShowChat) => !prevShowChat);
    setShowTrackOrder(false);

    // Add a predefined message when "Track Your Order" is clicked
    const trackOrderMessage = { text: 'Hey Atom, track my order', sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, trackOrderMessage]);

    // Simulate a delay before getting the bot's response
    setIsThinking(true);
    setTimeout(() => {
      // Actual bot response
      const botMessage = { text: 'Sure, let me check that for you...', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsThinking(false);
    }, 2000);
  };

  const handleMakeOrder = () => {
    setCurrentCom('chat')
    setShowChat((prevShowChat) => !prevShowChat);
    setShowTrackOrder(false);

    // Add a predefined message when "Track Your Order" is clicked
    const trackOrderMessage = { text: 'Hey Atom, make a new order', sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, trackOrderMessage]);

    // Simulate a delay before getting the bot's response
    setIsThinking(true);
    setTimeout(() => {
      // Actual bot response
      const botMessage = { text: 'Sure, i will make new order for you...', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsThinking(false);
    }, 2000);
  };

  const handleMoreSignboards = () => {
    setCurrentCom('chat')
    setShowChat((prevShowChat) => !prevShowChat);
    setShowTrackOrder(false);

    // Add a predefined message when "Track Your Order" is clicked
    const trackOrderMessage = { text: 'Hear More about signboards', sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, trackOrderMessage]);

    // Simulate a delay before getting the bot's response
    setIsThinking(true);
    setTimeout(() => {
      // Actual bot response
      const botMessage = { text: 'Signboards are used for branding for a product...', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsThinking(false);
    }, 2000);
  };

  const handleRequestDesign = () => {
    setCurrentCom('chat')
    setShowChat((prevShowChat) => !prevShowChat);
    setShowTrackOrder(false);

    // Add a predefined message when "Track Your Order" is clicked
    const trackOrderMessage = { text: 'Hey Atom, Provide a new design', sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, trackOrderMessage]);

    // Simulate a delay before getting the bot's response
    setIsThinking(true);
    setTimeout(() => {
      // Actual bot response
      const botMessage = { text: 'i will approve a new design for you...', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsThinking(false);
    }, 2000);
  };

  const handleWhyBranding = () => {
    setCurrentCom('chat')
    setShowChat((prevShowChat) => !prevShowChat);
    setShowTrackOrder(false);

    // Add a predefined message when "Track Your Order" is clicked
    const trackOrderMessage = { text: 'Why branding is needed ?', sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, trackOrderMessage]);

    // Simulate a delay before getting the bot's response
    setIsThinking(true);
    setTimeout(() => {
      // Actual bot response
      const botMessage = { text: 'Branding is to identify the duplicate products in the market...', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsThinking(false);
    }, 2000);
  };

  const handleToggleForm = () => {
  if(showForm){
    setShowChat(currentCom === 'chat' ? true : false);
    setShowTrackOrder(currentCom === 'chat' ? false : true);
  }else{
    setShowChat(false);
    setShowTrackOrder(false);
  }
    setShowForm(!showForm);
  };

  const handleToggleTrackOrder = () => {
    setCurrentCom('trackOrder')
    setShowTrackOrder(true);
    setShowChat(false);
    setShowForm(false);
  };

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? 'simple-popover' : undefined;

  const formatMessageText = (text, sender) => {
    const words = text.split(' ');
    const maxWordLength = 15;

    const formattedText = words
      .map((word) =>
        word.length > maxWordLength
          ? `<div style="word-wrap: break-word; max-width: 100%;">${word}</div>`
          : word
      )
      .join(' ');

    const messageStyle = {
      display: 'inline-block',
      padding: '8px 12px',
      borderRadius: '8px',
      backgroundColor: sender === 'user' ? '#1ccaff' : '#172e34',
      color: sender === 'user' ? 'white' : '#919eab',
      marginBottom: '15px',
      wordWrap: 'break-word',
      maxWidth: '70%',
    };

    return (
      <Box style={{ position: 'relative', textAlign: sender === 'user' ? 'right' : 'left' }}>
        {sender === 'bot' && (
          <img
            src={Gif} // Replace with the URL of your bot image
            alt="Bot Avatar"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '30px', // Adjust the height of the image as needed
              width: '30px', // Adjust the width of the image as needed
            }}
          />
        )}
        {sender === 'user' && (
          <img
            src={img} // Replace with the URL of the user's image
            alt="User Avatar"
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              height: '40px', // Adjust the height of the image as needed
              width: '40px', // Adjust the width of the image as needed
              borderRadius: '50%',
              border: '2px solid #1ccaff', // Add a border to the image
            }}
          />
        )}
        <Box
          style={{
            ...messageStyle,
            textAlign: sender === 'user' ? 'right' : 'left',
            marginLeft: sender === 'bot' ? '35px' : 0, // Adjust the margin for the user's message
            marginRight: sender === 'user' ? '50px' : 0, // Adjust the margin for the user's message
          }}
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      </Box>
    );
  };

  const renderContent = () => {
      return (
        <>
      {/* //ChatSection */}
        {showChat && <Paper
          ref={messagesContainerRef} // Attach the ref to the Paper element
          sx={{
            mb: 1,
            height: '300px',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '0.4em',
            },
            '&::-webkit-scrollbar-track': {
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
              webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,.1)',
              borderRadius: '4px',
            },
          }}
        >
          {messages.map((message, index) => (
            <Box key={index} style={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}>
              {formatMessageText(message.text, message.sender)}
            </Box>
          ))}
          {isThinking && (
            <Box style={{ textAlign: 'left' }}>{formatMessageText('Thinking...', 'bot')}</Box>
          )}
        </Paper>}
      {/* //FirstSection */}
        {showTrackOrder && <Grid sx={{height:'300px'}}>
          <Paper className={classes.root} onClick={handleToggleChat}>
            <Typography className={classes.text} variant="body2" align="center">
              {showTrackOrder ? 'Track Your Order' : 'Track Your Order'}
            </Typography>
          </Paper>

          <Paper className={classes.root} onClick={handleMakeOrder}>
            <Typography className={classes.text} variant="body2" align="center">
              {showTrackOrder ? 'Make A New Order' : 'Make A New Order'}
            </Typography>
          </Paper>

          <Paper className={classes.root} onClick={handleMoreSignboards}>
            <Typography className={classes.text} variant="body2" align="center">
              {showTrackOrder ? 'Hear More About Signboards' : 'Hear More About Signboards'}
            </Typography>
          </Paper>

          <Paper className={classes.root} onClick={handleRequestDesign}>
            <Typography className={classes.text} variant="body2" align="center">
              {showTrackOrder ? 'Request For A New Design' : 'Request For A New Design'}
            </Typography>
          </Paper>

          <Paper className={classes.root} onClick={handleWhyBranding}>
            <Typography className={classes.text} variant="body2" align="center">
              {showTrackOrder ? 'Why Branding Is Needed' : 'Why Branding Is Needed'}
            </Typography>
          </Paper>
        </Grid>}
      {/* //ProfileSection */}
        {showForm && <Grid container spacing={2} sx={{height:'300px',p:2}}>
          <Grid item xs={6}>
            <TextField label="First Name" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Last Name" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Phone" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Email" fullWidth />
          </Grid>
          <Grid item xs={12} sx={{mb:3,display:'flex', justifyContent:'flex-end'}}>
            <Button variant="outlined" color="primary" onClick={handleToggleForm}>
              Save
            </Button>
          </Grid>
        </Grid>}
        </>
      )}

  return (
    <>
      <MIconButton onClick={handleOpenPopover}>
        <Avatar alt="Atom" sx={{ width: 40, height: 40 }} src={Gif} />
      </MIconButton>
      <Popover
        id={popoverId}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Container component="main" maxWidth="xs">
          <Paper elevation={3} sx={{ pl:0,pr:0,pb:0,pt:2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img
                  src={Gif} // Replace with the URL of Atom's avatar
                  alt="Atom Avatar"
                  style={{
                    height: '40px', // Adjust the height of the image as needed
                    width: '40px', // Adjust the width of the image as needed
                    marginRight: '10px',
                  }}
                  onClick={handleToggleTrackOrder}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" gutterBottom>
                    Atom
                  </Typography>
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: 'green',
                        borderRadius: '50%',
                        marginRight: '4px',
                      }}
                    />
                    <Typography variant="caption" color="textSecondary">
                      Online
                    </Typography>
                  </Box>
                </Box>
                <Stack pl={2}>
                  <Search />
                </Stack>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mt: -9 }}>
                <IconButton onClick={handleToggleForm}>
                  <Avatar alt="John" sx={{ width: 40, height: 40 }} src={img} />
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

           {renderContent()}

            <Divider sx={{ mb: 2 }} />

            <Stack direction="row" alignItems="center">
              <TextField
                size="small"
                fullWidth
                id="message"
                placeholder="Write a Message…"
                name="message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                style={{ flex: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={handleAttachImage}>
                        <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
                      </IconButton>
                      <EmojiPicker setValue={setInput} value={input} onSelect={handleEmojiSelect} />
                    </InputAdornment>
                  ),
                }}
              />
              {/* Hidden file input for selecting images */}
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={inputFileRef}
                onChange={handleFileChange}
              />
              <IconButton onClick={handleSendMessage}>
                <Icon icon={roundSend} width={24} height={24} />
              </IconButton>
            </Stack>
          </Paper>
        </Container>
      </Popover>
    </>
  );
};

export default ChatBot;
