import React from 'react';
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import './index.css'; // Certifique-se de que o caminho está correto
import PropTypes from "prop-types";
import { theme } from "../../Styles/global";

const MuiDialog = ({ openSuccessDialog, setOpenSuccessDialog, submitForm, handleCloseSuccessDialog, text }) => {

    // Função para submeter o formulário e fechar o diálogo
    const handleSubmit = () => {
        submitForm(); // Chama a função de submissão do formulário
        handleCloseSuccessDialog(); // Fecha o diálogo após a submissão
    };

    return (
        <Dialog className='custom-dialog'
            open={openSuccessDialog}
            onClose={handleCloseSuccessDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className='custom-dialog-header'>
            <DialogTitle id="alert-dialog-title" >
                {"Ao confirmar essa solicitação, você estará concordando com a declaração a seguir:"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText 
                    id="alert-dialog-description" 
                    className="custom-dialog-content-text"
                >
                    {text} {/* O texto é passado como prop e exibido aqui */}
                    
                </DialogContentText>
            </DialogContent>
            </div>
            <DialogActions>
                <div className='botoes-dialogo'>
                    <SecondaryButton 
                        text="CANCELAR"
                        onClick={handleCloseSuccessDialog}
                    />
                    <PrimaryButton 
                        text='solicitar filiação ao sindpol-df'
                        onClick={handleSubmit}
                        autoFocus
                    />
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default MuiDialog;
