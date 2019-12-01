/**
 * Summary.
 * MapSearchBox for Maps, using google maps API.
 * Referred from google-map-react examples
 *
 * Description.
 * MapSearchBox component that provides recommendations near the map location.
 * @author taehioum
 * @since  2019-10-18
 */

/** jshint {inline configuration here} */
import React, { Component } from "react";
import "./MapSearchBox.css";

// Material ui components
import Close from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TextField } from "@material-ui/core";

class MapSearchBox extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount({ map, mapApi } = this.props) {
        this.searchBox = new mapApi.places.SearchBox(this.searchInput);
        this.searchBox.addListener("places_changed", this.onPlacesChanged);
        this.searchBox.bindTo("bounds", map);
    }

    componentWillUnmount({ mapApi } = this.props) {
        mapApi.event.clearInstanceListeners(this.searchInput);
    }

    onPlacesChanged = ({ map, addplace } = this.props) => {
        const selected = this.searchBox.getPlaces();
        //const { 0: place } = selected;
        addplace(selected);
        this.searchInput.blur();
    };

    clearSearchBox = () => {
        this.searchInput.value = "";
    };

    render() {
        return (
            <Grid item align="left" className="MapSearchBox">
                <TextField
                    style={{
                        backgroundColor: "#fff",
                        margin: 30,
                        zIndex: 1000 // determines layer position for overlaying components
                    }}
                    id="searchbox"
                    type="text"
                    inputRef={ref => {
                        this.searchInput = ref;
                    }}
                    variant="outlined"
                    autoFocus
                    placeholder="Enter a location"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    id="clear-search-button"
                                    onClick={this.clearSearchBox}
                                >
                                    <Close />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </Grid>
        );
    }
}

export default MapSearchBox;
