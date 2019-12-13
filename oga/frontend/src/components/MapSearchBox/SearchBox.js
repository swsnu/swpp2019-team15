/**
 * Searchbox component for App bar
 */
import React, { Component } from "react";

// Import Search Bar Components

// Material UI imports
import {
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Input
} from "@material-ui/core";
import { Close, Search } from "@material-ui/icons";

// Import React Scrit Library to load Google object
import Script from "react-load-script";
import API_KEY from "../../const/api_key.js";

class SearchBox extends Component {
    // Define Constructor
    constructor(props) {
        super(props);

        // Declare State
        this.state = {
            city: "",
            query: ""
        };
    }

    handleScriptLoad = () => {
        // Declare Options For Autocomplete
        //const options = {
        //types: ['(cities)'],
        //};

        // Initialize Google Autocomplete
        /*global google*/ // To disable any eslint 'google not defined' errors
        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete")
            //options,
        );

        // Avoid paying for data that you don't need by restricting the set of
        // place fields that are returned to just the address components and formatted
        // address.
        //this.autocomplete.setFields(['address_components', 'formatted_address']);

        // Fire Event when a suggested name is selected
        this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
    };

    handlePlaceSelect = () => {
        // Extract City From Address Object
        const addressObject = this.autocomplete.getPlace();
        const address = addressObject.address_components;

        // Check if address is valid
        if (address) {
            // Set State
            this.setState({
                city: address[0].long_name,
                query: addressObject.formatted_address
            });
        }
    };

    onClearSearchBox = () => {
        this.searchInput = "";
    };

    render() {
        var url_str =
            "https://maps.googleapis.com/maps/api/js?" +
            "key=" +
            API_KEY +
            "&libraries=places";
        return (
            <Grid
                style={{ position: "fixed" }}
                align="right"
                className="MapSearchBox"
                // style={{ zIndex: 5555000 }}
            >
                <TextField
                    // style={{ width: "70%" }}
                    position="fixed"
                    id="autocomplete"
                    type="input"
                    variant="outlined"
                    placeholder="Search for a location"
                    // Remove textfield border padding
                    inputProps={{
                        style: {
                            padding: 10,
                            right: 100
                        }
                    }}
                    InputProps={{
                        style: {
                            // height: "100%",
                            width: "180%",
                            backgroundColor: "#fff",
                            height: 40,
                            // top: -18,
                            right: "-350%"
                            // marginRight: 30
                        },
                        endAdornment: (
                            <InputAdornment>
                                {this.state.city == "" ? (
                                    <Search />
                                ) : (
                                    <IconButton
                                        id="clear-search-button"
                                        onClick={() => this.onClearSearchBox()}
                                    >
                                        <Close />
                                    </IconButton>
                                )}
                            </InputAdornment>
                        )
                    }}
                />
                <Script url={url_str} onLoad={this.handleScriptLoad} />
            </Grid>
        );
    }
}

export default SearchBox;
