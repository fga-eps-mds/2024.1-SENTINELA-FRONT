import PropTypes from "prop-types";
import { Box, Modal } from "@mui/material";

export default function BigModal({ show, children, handleClose }) {
  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

BigModal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node,
  handleClose: PropTypes.any,
};
