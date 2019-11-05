import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
    root: {
        height: "100%",
        width: "100%"
    },
    palette: {
        background: {
            default: "#fff",
            secondary: "#ffb366"
        },
        primary: {
            light: "#ffe699",
            main: "#ffb366",
            dark: "#ff9933" //color for button hover
        },
        secondary: {
            main: "#003366"
        }
    },
    typography: {
        fontFamily: "Raleway, Arial",
        useNextVariants: true
    },
    overrides: {
        MuiCard: {
            card: {
                position: "relative",
                backgroundColor: "light",
                borderStyle: "solid",
                borderColor: "primary",
                boxShadow:
                    "rgba(255, 0, 0, 0.117647) 0px 1px 6px, rgba(255, 0, 0, 0.117647) 0px 1px 4px"
            }
        },
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
                marginBottom: "10px",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
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
