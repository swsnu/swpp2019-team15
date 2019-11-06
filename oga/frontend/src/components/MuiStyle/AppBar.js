import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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

<<<<<<< HEAD
function MenuAppBar(props) {
  const classes = useStyles();
  var auth = props.auth;
  var func = props.func;
//   const [setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
=======
export default function MenuAppBar(props) {
    const classes = useStyles();
    var auth = props.auth;
    var func = props.func;
    //   const [setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
>>>>>>> cd3bb13532ed1e36e3529040f92b2061d0b52f1f

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
    <div className={classes.root}>
          {auth &&(
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            askAT
          </Typography>
           (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <FormGroup>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={()=>props.history.push("/settings/")}>Setting Page</MenuItem>
              </Menu>
              </FormGroup>
              <FormControlLabel
                control={<Switch checked={auth} onChange={() => func()} aria-label="login switch" />}
                label={auth ? 'Logout' : 'Login'}
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
