// This codes are originated from
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/components/app-bar/MenuAppBar.js
// and modified.

import React from "react";
import { withRouter } from "react-router";
import { Route, Redirect } from "react-router-dom";

// Material UI imports
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
    AccountCircle,
    Home,
    LiveHelp,
    SettingsApplications,
    ChevronLeft,
    ExitToApp
} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import {
    AppBar,
    Button,
    ClickAwayListener,
    CssBaseline,
    Drawer,
    Divider,
    FormControlLabel,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Toolbar,
    Typography
} from "@material-ui/core";

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    appBar: {
        // padding: 5,
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: ["none"]
    },
    menuButton: {
        paddingLeft: 10,
        marginRight: 25
    },
    hide: {
        display: "none"
    },
    drawer: {
        paddingTop: 50,
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        overflowX: "hidden",
        height: "100%"
    },
    drawerOpen: {
        width: drawerWidth,
        overflowX: "hidden",
        height: "100%",
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
        height: "100%",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
            height: "100%"
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
        flexGrow: 1,
        fontWeight: "bold"
    },
    selected: {
        color: "#fff"
    },
    listItem: {
        "&:hover": {
            backgroundColor: "#665200"
        }
    }
}));

function MenuAppBar(props) {
    const classes = useStyles();
    var auth = props.auth;
    var func = props.func
    var mouseLeaveTimeout = true;
    MenuItem.displayName = "menu_item";
    var Log_toggle = auth ? "Log-Out" : "Log-In"

    const [open, setOpen] = React.useState(false);

    const handleDrawer = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    /**
     * Add small timeout delay on mouseLeave to prevent
     * looping open and close animation when hovering in between
     */
    const handleDrawerCloseOnMouseLeave = () => {
        // Clear any existing timeout
        if (mouseLeaveTimeout) {
            clearTimeout(mouseLeaveTimeout);
        }

        mouseLeaveTimeout = setTimeout(() => {
            setOpen(false);
            mouseLeaveTimeout = false;
        }, 200);
    };
    // const handleMenu = event => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    return (
        <div className="AppBar">
            {(
                <ClickAwayListener onClickAway={handleDrawerClose}>
                    <div className={classes.root}>
                        <CssBaseline />
                        <AppBar
                            id="app-bar"
                            position="fixed"
                            className={clsx(classes.appBar, {
                                [classes.appBarShift]: open
                            })}
                        >
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    id="menu-button"
                                    className={classes.menuButton}
                                    color="light"
                                    aria-label="menu"
                                    onClick={handleDrawer}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <FormControlLabel
                                    className={classes.title}
                                    onClick={() => props.history.push("/")}
                                    control={
                                        <Typography
                                            variant="h4"
                                            className={classes.title}
                                        >
                                            askAT
                                        </Typography>
                                    }
                                />
                                <FormControlLabel
                                    control={
                                        <Button
                                            onClick={() => func()}
                                            aria-label="logout-button"
                                        >
                                            <ExitToApp />
                                            {Log_toggle}
                                        </Button>
                                    }
                                />
                            </Toolbar>
                        </AppBar>
                        <Drawer
                            variant="permanent"
                            containerStyle={{
                                marginLeft: "6.5%",
                                background: "#545454",
                                position: "fixed"
                            }}
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
                            onMouseEnter={handleDrawer}
                            onMouseLeave={handleDrawerCloseOnMouseLeave}
                        >
                            <List style={{ paddingTop: 100 }}>
                                <ListItem
                                    className={classes.listItem}
                                    button
                                    key="Profile"
                                    id="profile-button"
                                    onClick={() =>
                                        props.history.push("/profile/")
                                    }
                                >
                                    <ListItemIcon>
                                        <AccountCircle color="primary" />{" "}
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary: classes.selected
                                        }}
                                        primary="Profile"
                                    />
                                </ListItem>
                                <ListItem
                                    className={classes.listItem}
                                    button
                                    key="Settings"
                                    id="settings-button"
                                    onClick={() =>
                                        props.history.push("/settings/")
                                    }
                                >
                                    <ListItemIcon>
                                        <SettingsApplications color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary: classes.selected
                                        }}
                                        primary="Settings"
                                    />
                                </ListItem>
                            </List>
                            <Divider />
                            <List>
                                <ListItem
                                    className={classes.listItem}
                                    button
                                    key="Main"
                                    id="main-button"
                                    onClick={() => props.history.push("/main/")}
                                >
                                    <ListItemIcon>
                                        <Home
                                            color="primary"
                                            id="home-button"
                                        />{" "}
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary: classes.selected
                                        }}
                                        primary="Main"
                                    />
                                </ListItem>
                                <ListItem
                                    className={classes.listItem}
                                    button
                                    key="Ask"
                                    id="ask-button"
                                    onClick={() => props.history.push("/ask/")}
                                >
                                    <ListItemIcon>
                                        <LiveHelp color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary: classes.selected
                                        }}
                                        primary="Ask"
                                    />
                                </ListItem>
                            </List>
                            <List
                                style={{
                                    top: "90%",
                                    position: "absolute"
                                }}
                            >
                                <ListItem
                                    className={classes.listItem}
                                    button
                                    id="back-button"
                                    onClick={() => props.history.goBack()}
                                >
                                    <ListItemIcon>
                                        <ChevronLeft color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary: classes.selected
                                        }}
                                        primary="Back"
                                    />
                                </ListItem>
                            </List>
                        </Drawer>
                    </div>
                </ClickAwayListener>
            )}
        </div>
    );
}

export default withRouter(MenuAppBar);
