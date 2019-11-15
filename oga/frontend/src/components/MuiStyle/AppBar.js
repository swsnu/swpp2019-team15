// This codes are originated from
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/components/app-bar/MenuAppBar.js
// and modified.

import React from "react";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

// import * as actionCreators from "../../store/actions/";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(50)
    },
    title: {
        flexGrow: 1,
        marginRight: theme.spacing(50)
    }
}));

function MenuAppBar(props) {
    const classes = useStyles();
    var auth = props.auth;
    var func = props.func;
    //   const [setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    //   const handleChange = () => {
    //     () => dispatch(actionCreators.Logout())
    //   };

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="AppBar">
            {auth && (
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="light"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h4" className={classes.title}>
                            <b>askAT</b>
                        </Typography>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="light"
                            >
                                <AccountCircle />
                            </IconButton>
                            <FormGroup>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>
                                        Profile
                                    </MenuItem>
                                    <MenuItem
                                        id="settings-button"
                                        onClick={() =>
                                            props.history.push("/settings/")
                                        }
                                    >
                                        Settings Page
                                    </MenuItem>
                                </Menu>
                            </FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={auth}
                                        onChange={() => func()}
                                        aria-label="login switch"
                                        color="dark"
                                    />
                                }
                                label={auth ? "Logout" : "Login"}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            )}
        </div>
    );
}

// const mapDispatchToProps = dispatch => {
//     return {
//         logout: () =>
//             dispatch(actionCreators.Logout()),
//     }
// }

export default withRouter(MenuAppBar);
