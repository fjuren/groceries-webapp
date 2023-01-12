import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import '../assets/styles/basicModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  '@media (max-width: 480px)': {
    width: 244
  },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function BasicModal({ openStatus, handleModalStatus }) {
  const [open] = React.useState(openStatus);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalStatus}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div id="modal">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Please log in
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You will need to log in to continue. If you don&apos;t have an account, signing up is
              simple!
            </Typography>
            <Button variant="text" onClick={handleModalStatus}>
              Ok
            </Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
}
