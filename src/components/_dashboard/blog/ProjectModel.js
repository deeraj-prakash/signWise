import { Typography, Card } from '@material-ui/core'
import { DialogAnimate } from 'src/components/animate'

export default function Modal({ open, handleClose, modalTitle, children }) {
  return (
    <DialogAnimate open={open} onClose={handleClose}>
      <Card sx={{ p: 3, maxWidth: 768, mx: 'auto' }}>
        <Typography variant="h6" sx={{ marginBottom: 3, textAlign: 'center' }}>
          {modalTitle}
        </Typography>
        {children}
      </Card>
    </DialogAnimate>   
  )
}