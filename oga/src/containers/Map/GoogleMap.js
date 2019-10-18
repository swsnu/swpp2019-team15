/**
 * Summary.
 * Wrapper for GoogleMapReact.
 * 
 *
 * Description.
 * Map with a search box
 * Referred from google-map-react examples
 * Searches will be bound to nearby areas, and 
 * upon search, the map will be zoomed in, with a clickable red marker
 * @author taehioum
 * @since  2019-10-18
 */
 
/** jshint {inline configuration here} */
import React, { Component } from 'react';
import isEmpty from 'lodash';
import {connect} from 'react-redux';
import GoogleMapReact from 'google-map-react';
import API_KEY from '../../const/api_key';
import SearchBox from '../../components/MapSearchBox/MapSearchBox';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMap extends Component {
  static defaultProps = {
  //somewhere in SNU, but should actually get from user
    center: {
      lat: 37.459882,
      lng: 126.9519053,
    },
    zoom: 14
  };

  constructor(props) {
    super(props);

    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
    };
  };

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };


  //as of now, use default markers
  //but we can render any component via this library
  renderMarkers = (places) => {
    const mapInstance = this.state.mapInstance;
    const mapApi = this.state.mapApi;
    const { 0: place } = places;
    console.log(place);
    console.log(place.geometry.location.lat());
    let marker = new mapApi.Marker({
      position: place.geometry.location,
      map: mapInstance,
      title: place.name,
    });
    console.log(marker);
  }

  renderMap = (places) => {
    const map = this.state.mapInstance;
    const { 0: place } = places;
    console.log(place.name);
    console.log(place.geometry.location.lat());
    console.log(place.geometry.location.lng());

    if (!place.geometry) return;
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(20);
    }
  }

  addPlace = (place) => {
    this.setState({ places: place });
    this.renderMap(place);
    this.renderMarkers(place);
  };


  render() {
    const {
      places, mapApiLoaded, mapInstance, mapApi,
    } = this.state;
    return (
      <div style= {{ height: '60vh', width: '40%' }}>
        {mapApiLoaded && 
          <SearchBox map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />}
          <GoogleMapReact
            defaultZoom={this.props.zoom}
            defaultCenter={this.props.center}
            bootstrapURLKeys={{
              key: API_KEY,
              libraries: ['places', 'geometry'],
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}>
          </GoogleMapReact>
        </div>
    );
  }
}

export default GoogleMap;