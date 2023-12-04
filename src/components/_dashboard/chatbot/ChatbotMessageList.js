//materail

import { Box, Stack,Paper,Card,Typography } from "@material-ui/core"
import Scrollbar from "src/components/Scrollbar"
import { fData } from "src/utils/formatNumber"
import { fNumber } from "src/utils/formatNumber"
import { fDate } from "src/utils/formatTime"
export default function ChatbotMessageList({displayedComments}){
    return(
        <Box sx={{ mt: 4 }} minWidth={400} minHeight={430}>
        <Scrollbar>
          <Stack spacing={3} sx={{  mt: 3,minHeight:'400px' }}>
            {displayedComments.map((comment, index) => (
              <Stack
                key={comment.id}
                direction="row"
                spacing={2}
                justifyContent={index % 2 === 0 ? 'flex-start' : 'flex-end'}
                // alignItems="center"
              >
                <Paper
                  sx={{
                    // p: 1.5,
                     flexGrow: .5,
                    maxWidth: 350,
                    bgcolor: index % 2 === 0 ? 'background.neutral' : 'primary.main',
                    color: index % 2 !== 0 && 'common.white',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column', 
                    alignItems: 'center',
                    textAlign: 'center', 
                  }}
                >
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ sm: 'center' }}
                    justifyContent="space-between"
                    sx={{ mb: 0.5 }}
                  >
                    <Typography justifyContent={index % 2 === 0 ? 'flex-start' : 'flex-end'} 
                    variant="caption" sx={{ color: 'text.disabled' }}>
                      {fDate(comment.createdAt)}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{
                      color: index % 2 === 0 ? 'text.secondary' : 'inherit',
                      maxWidth: '100%', 
                      whiteSpace: 'normal', 
                    }}
                  >
                    {comment.message}
                  </Typography>
                </Paper>
              </Stack>
            ))}
          </Stack>
        </Scrollbar>
      </Box>
      
    )
}