/**
 * Modified from Material UI RadioGroup API documentation
 * https://material-ui.com/api/radio-group/
 */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
    root: {
        backgroundColor: "transparent"
    },
    icon: {
        borderRadius: "50%",
        padding: 30,
        width: 150,
        height: 150,
        boxShadow:
            "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
        backgroundColor: "#eceff9", //"#cde5f7", //"#efeff5", //"#f5f8fa",
        backgroundImage:
            "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
        "$root.Mui-focusVisible &": {
            outline: "2px auto rgba(19,124,189,.6)",
            outlineOffset: 2
        },
        "input:hover ~ &": {
            backgroundColor: "#cde5f7"
        },
        "input:disabled ~ &": {
            boxShadow: "none",
            background: "rgba(206,217,224,.5)"
        }
    },
    checkedIcon: {
        width: 150,
        height: 150,
        padding: 30,
        backgroundColor: "#80aaff",
        backgroundImage:
            "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
        "&:before": {
            display: "block",
            width: 100,
            height: 100,
            backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
            content: '""'
        },
        "input:hover ~ &": {
            backgroundColor: "#80aaff"
        }
    }
});

// Inspired by blueprintjs
export default function CustomRadio(props) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={
                <Avatar
                    className={classes.checkedIcon}
                    src={props.imgsrc}
                    compont="img"
                />
            }
            icon={
                <Avatar
                    className={classes.icon}
                    src={props.imgsrc}
                    compont="img"
                />
            }
            {...props}
        />
    );
}
