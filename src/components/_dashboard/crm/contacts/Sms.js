import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
// material
import { Box, Divider } from '@material-ui/core';
// redux
import { useDispatch,useSelector } from 'src/redux/store';
import { addRecipients, onSendMessage,
    getConversation,
    getParticipants,
    markConversationAsRead,
    resetActiveConversation } from 'src/redux/slices/chat';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
//
import {ChatRoom} from '../../chat';
import {ChatMessageList} from '../../chat';
import {ChatHeaderDetail} from '../../chat';
import {ChatMessageInput} from '../../chat';
import { ChatHeaderCompose } from '../../chat';

// ----------------------------------------------------------------------

const conversationSelector = (state) => {
  const { conversations, activeConversationId } = state.chat;
  const conversation = conversations.byId[activeConversationId];
  if (conversation) {
    return conversation;
  }
  return {
    id: null,
    messages: [],
    participants: [],
    unreadMessages: 0
  };
};

export default function Sms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { conversationKey } = useParams();
  const { contacts, recipients, participants, activeConversationId } = useSelector((state) => state.chat);
  const conversation = useSelector((state) => conversationSelector(state));
  const mode = conversationKey ? 'DETAIL' : 'COMPOSE';

  const displayParticipants = participants.filter((item) => item.id !== '8864c717-587d-472a-929a-8e5f298024da-0');

  useEffect(() => {
    const getDetails = async () => {
      dispatch(getParticipants(conversationKey));
      try {
        dispatch(getConversation(conversationKey));
      } catch (error) {
        console.error(error);
        navigate(PATH_DASHBOARD.chat.new);
      }
    };
    if (conversationKey) {
      getDetails();
    } else if (activeConversationId) {
      dispatch(resetActiveConversation());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationKey]);

  useEffect(() => {
    if (activeConversationId) {
      dispatch(markConversationAsRead(activeConversationId));
    }
  }, [dispatch, activeConversationId]);

  const handleAddRecipient = (recipient) => {
    dispatch(addRecipients(recipient));
  };

  const handleSendMessage = async (value) => {
    try {
      dispatch(onSendMessage(value));
    } catch (error) {
      console.error(error);
    }
  };
console.log(conversation)
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
     

      <Divider />

      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
          <ChatMessageList conversation={conversation} />
            
          <Box sx={{ width:'100%' ,height:200,display: 'flex', flexGrow: 1, }}>

          </Box>

          <ChatMessageInput
            conversationId={activeConversationId}
            onSend={handleSendMessage}
            disabled={pathname === PATH_DASHBOARD.chat.new}
          />
        </Box>

        {mode === 'DETAIL' && <ChatRoom conversation={conversation} participants={displayParticipants} />}
      </Box>
    </Box>
  );
}
