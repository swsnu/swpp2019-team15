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
import React, { Component } from 'react';
import './MapSearchBox.css';

class MapSearchBox extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount({ map, mapApi } = this.props) {
    this.searchBox = new mapApi.places.SearchBox(this.searchInput);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
    this.searchBox.bindTo('bounds', map);
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
    this.searchInput.value = '';
  };

  render() {
    return (
      <div className="MapSearchBox">
        <input
          id="searchbox"
          ref={(ref) => {
            this.searchInput = ref;
          }}
          type="text"
          onFocus={this.clearSearchBox}
          placeholder="Enter a location"
        />
      </div>
    );
  }
}

export default MapSearchBox;
