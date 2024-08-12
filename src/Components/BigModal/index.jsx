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
  width: 600,
  bgcolor: "#f5f1e6", // Cor de fundo bege
  boxShadow: 24,
  p: 4,
  border: "2px solid #d4af37", // Borda dourada
  borderRadius: "10px", // Arredondamento dos cantos
  color: "#4e4e4e", // Cor do texto
  fontFamily: "'Roboto', sans-serif",
};

BigModal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node,
  handleClose: PropTypes.any,
};
