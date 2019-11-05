import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
    palette: {
        background: {
            default: "#fff"
        },
        primary: {
            light: "#ffe699",
            main: "#ffb366",
            dark: "#ff9933" //color for button hover
        },
        secondary: {
            main: "#800000"
        }
    },
    typography: {
        useNextVariants: true
    },
    overrides: {
        MuiCardHeader: {
            categoryHeaderText: {
                fontSize: 15,
                fontWeight: 500,
                color: "#ffb366"
            },
            itemText: {
                fontSize: 14,
                fontWeight: 500
            }
        },
        MuiPaper: {
            root: {
                padding: "10px",
                marginBottom: "10px"
            }
        },
        MuiButton: {
            raisedPrimary: {
                margin: "10px",
                padding: "10px",
                color: "#ffe699"
            }
        },
        MuiCard: {
            borderRadius: 0
        },
        MuiToolbar: {
            backgroundColor: "transparent"
        }
    }
});
