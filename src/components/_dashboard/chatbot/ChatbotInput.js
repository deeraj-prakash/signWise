import { IconButton, InputAdornment, Stack, TextField } from "@material-ui/core";
//
import { Icon } from '@iconify/react';
import roundSend from '@iconify/icons-ic/round-send';
import heartFill from '@iconify/icons-eva/heart-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import messageSquareFill from '@iconify/icons-eva/message-square-fill';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
//components
import EmojiPicker from "src/components/EmojiPicker";

export default function ChatbotInput({message,setMessage,fileInputRef,commentInputRef,handleChangeMessage,handleClickAttach}){
    const theme = useTheme()
    const HandlesendMsg=(value)=>{
       console.log(value)
    }
    return(
        <Stack direction="row" alignItems="center">
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
                <IconButton size="small" 
                 onClick={handleClickAttach}
                >
                  <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
                </IconButton>
                <EmojiPicker alignRight 
                 value={message}
                  setValue={setMessage}
                  />
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
        <IconButton onClick={()=>setMessage('')}>
          <Icon icon={roundSend} width={24} height={24} />
        </IconButton>
        <input type="file" 
         ref={fileInputRef} 
        style={{ display: 'none' }} />
      </Stack>
    )
}