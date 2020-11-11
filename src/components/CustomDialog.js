import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CustomDialog({
    open,
    handleClose,
    handleOk,
    title,
    contentText,
    okText,
    handleCancel
}) {
    const { t } = useTranslation();

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {t(title)}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>{t(contentText)}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {handleCancel && (
                        <Button
                            autoFocus
                            onClick={handleCancel}
                            color="primary"
                        >
                            {t(cancelText)}
                        </Button>
                    )}
                    {handleOk && (
                        <Button onClick={handleOk} color="primary">
                            {t(okText)}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
