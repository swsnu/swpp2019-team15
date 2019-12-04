// Imports
import React, { Component } from 'react';

// Import Search Bar Components

import { TextField } from "@material-ui/core";
//import SearchBar from '@material-ui/core/SearchBar';

// Import React Scrit Libraray to load Google object
import Script from 'react-load-script';
import API_KEY from '../../const/api_key.js';

class Search extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query: ''
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
      document.getElementById('autocomplete'),
      //options,
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    //this.autocomplete.setFields(['address_components', 'formatted_address']);

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }
  
  handlePlaceSelect = () => {

    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState(
        {
          city: address[0].long_name,
          query: addressObject.formatted_address,
        }
      );
    }
  }

  render() {
    var url_str = "https://maps.googleapis.com/maps/api/js?"
                  + "key=" + API_KEY
                  + "&libraries=places";
    return (
      <div>
        <Script
          url={url_str}
          onLoad={this.handleScriptLoad}
        />
        <TextField id="autocomplete" type="text" placeholder="search for"
          style={{
            backgroundColor: "#fff",
            margin: '0 0 0 0',
            maxWidth: 1200,
            zIndex: 999,
          }}
        />
      </div>
    );
  }
}

export default Search;
