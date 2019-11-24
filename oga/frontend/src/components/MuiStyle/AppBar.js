// This codes are originated from
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/components/app-bar/MenuAppBar.js
// and modified.

import React from "react";
import { withRouter } from "react-router";

// Material UI imports
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import Home from "@material-ui/icons/Home";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LiveHelp from "@material-ui/icons/LiveHelp";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SettingsApplications from "@material-ui/icons/SettingsApplications";

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexGrow: 1
    },
    appBar: {
        padding: 5,
        zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
        paddingLeft: 10,
        marginRight: 25
    },
    hide: {
        display: "none"
    },
    drawer: {
        paddingTop: 56,
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap"
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1
        }
    },
    paper: {
        padding: 8,
        background: "#272727"
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar
    },
    title: {
        flexGrow: 1
    },
    selected: {
        color: "#fff"
    }
}));

function MenuAppBar(props) {
    const classes = useStyles();
    var auth = props.auth;

    var func = props.func;
    //   const [setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    MenuItem.displayName = "menu_item";

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawer = () => {
        setOpen(!open);
    };

    // const handleMenu = event => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    return (
        <div className="AppBar">
            {auth && (
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        id="app-bar"
                        position="sticky"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="light"
                                aria-label="menu"
                                onClick={handleDrawer}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h4" className={classes.title}>
                                <b>askAT</b>
                            </Typography>
                            <div>
                                <IconButton
                                    id="menu-button"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="light"
                                >
                                    <AccountCircle />
                                </IconButton>
                                {/* <FormGroup id="menugroup">
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
                                        onClose={handleDrawerClose}
                                    >
                                        <MenuItem
                                            id="profile-button"
                                            onClick={() =>
                                                props.history.push("/profile/")
                                            }
                                        >
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
                                </FormGroup> */}
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
                    <Drawer
                        position="sticky"
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open
                        })}
                        classes={{
                            paper: clsx(classes.paper, {
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open
                            })
                        }}
                        open={open}
                    >
                        <List style={{ paddingTop: 100 }}>
                            {["Profile", "Settings"].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? (
                                            <AccountCircle
                                                color="primary"
                                                id="profile-button"
                                                onClick={() =>
                                                    props.history.push(
                                                        "/profile/"
                                                    )
                                                }
                                            />
                                        ) : (
                                            <SettingsApplications
                                                color="primary"
                                                id="settings-button"
                                                onClick={() =>
                                                    props.history.push(
                                                        "/settings/"
                                                    )
                                                }
                                            />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary: classes.selected
                                        }}
                                        primary={text}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {["Main", "Ask"].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? (
                                            <Home
                                                color="primary"
                                                id="home-button"
                                                onClick={() =>
                                                    props.history.push("/main/")
                                                }
                                            />
                                        ) : (
                                            <LiveHelp
                                                color="primary"
                                                id="ask-button"
                                                onClick={() =>
                                                    props.history.push("/ask/")
                                                }
                                            />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary: classes.selected
                                        }}
                                        primary={text}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </div>
            )}
        </div>
    );
}

export default withRouter(MenuAppBar);
