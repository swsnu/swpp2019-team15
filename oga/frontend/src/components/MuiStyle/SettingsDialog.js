import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function SettingsDialog(props) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Welcome to askAT!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Location and notification settings must be enabled in
                        order to ask questions and receive updates. You can
                        enable these settings in the Settings page.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        id="cancel-button"
                        onClick={handleClose}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        id="settings-button"
                        onClick={props.openSettings}
                        color="primary"
                    >
                        Settings
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
