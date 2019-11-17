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
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import GoogleMapReact from 'google-map-react';
import API_KEY from '../../const/api_key';
import SearchBox from '../../components/MapSearchBox/MapSearchBox';
import LocationListener from '../../components/LocationListener/LocationListener';
import * as actionCreators from '../../store/actions/index';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMap extends Component {
    static defaultProps = {
        //somewhere in SNU, but should actually get from user
        zoom: 14,
    };

    constructor(props) {
        super(props);

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
    //mock a place object
    let target = {lat: this.props.target.lat,
                  lng: this.props.target.lng}
  };

        this.state = {
            mapApiLoaded: false,
            mapInstance: null,
            mapApi: null,
            places: []
        };
    }

    apiHasLoaded = (map, maps) => {
        this.setState({
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps
        });
        //mock a place object

        if (this.props.viewOnly) {
            if (this.props.target) {
                var target = {
                    lat: this.props.target["lat"],
                    lng: this.props.target["lng"]
                };
                let marker = new maps.Marker({
                    position: target,
                    map: map,
                    title: "HERE"
                });
            }
        }
    };

    clickSubmitHandler = () => {
        const { 0: place } = this.state.places;
        if (place) {
            this.props.submitPlace(place);
        }
        //this.props.history.goBack();
    };

    //as of now, use default markers
    //but we can render any component via this library
    renderMarkers = places => {
        const mapInstance = this.state.mapInstance;
        const mapApi = this.state.mapApi;
        const { 0: place } = places;
        let marker = new mapApi.Marker({
            position: place.geometry.location,
            map: mapInstance,
            title: place.name
        });
        marker.addListener("click", this.clickSubmitHandler);
    };

    renderMap = places => {
        const map = this.state.mapInstance;
        const { 0: place } = places;

        if (!place.geometry) return;
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(20);
        }
    };

    addPlace = place => {
        this.setState({ places: place });
        this.renderMap(place);
        this.renderMarkers(place);
    };

    render() {
        const { places, mapApiLoaded, mapInstance, mapApi } = this.state;
        let center = null;

        //FIXME: BUGGY
        console.log(this.props.currentCoordinates);
        if (this.props.currentCoordinates && places.length == 0) {
            center = {
                lat: this.props.currentCoordinates.latitude,
                lng: this.props.currentCoordinates.longitude
            };
            console.log(center);
        }
        return (
            <div className="Map" style={{ height: "50vh", width: "40%", margin: "auto"}}>
                <LocationListener />
                {mapApiLoaded && !this.props.viewOnly && (
                    <SearchBox
                        map={mapInstance}
                        mapApi={mapApi}
                        addplace={this.addPlace}
                    />
                )}
                <GoogleMapReact
                    defaultZoom={this.props.zoom}
                    center={center}
                    bootstrapURLKeys={{
                        key: API_KEY,
                        libraries: ["places", "geometry"]
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onChildClick={this.clickSubmitHandler}
                    onGoogleApiLoaded={({ map, maps }) =>
                        this.apiHasLoaded(map, maps)
                    }
                ></GoogleMapReact>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        currentCoordinates: state.location.currentCoordinates
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //upon submit, should send name, and coordinates of the location
        submitPlace: target =>
            dispatch(actionCreators.setTargetLocation(target))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(GoogleMap));
