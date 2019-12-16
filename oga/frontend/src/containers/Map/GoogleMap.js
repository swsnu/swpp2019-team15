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
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import GoogleMapReact from "google-map-react";
import API_KEY from "../../const/api_key";
import SearchBox from "../../components/MapSearchBox/MapSearchBox";
import LocationListener from "../../components/LocationListener/LocationListener";
import * as actionCreators from "../../store/actions/index";

import Grid from "@material-ui/core/Grid";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMap extends Component {
    static defaultProps = {
        zoom: 16
    };

    constructor(props) {
        super(props);

        this.state = {
            mapApiLoaded: false,
            mapInstance: null,
            mapApi: null,
            marker: null,
            infowindow: null,
            places: []
        };
    }

    apiHasLoaded = (map, maps) => {
        this.setState({
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
            marker: new maps.Marker({ map: map }),
            infowindow: new maps.InfoWindow()
        });
        // //mock a place object
        // let target = {lat: this.props.target.lat,
        //     lng: this.props.target.lng}

        if (this.props.viewOnly) {
            if (this.props.targets) {
              for (var i = 0; i < this.props.targets.length; i++) {
                let t = this.props.targets[i];
                var target = {
                    lat: t["lat"],
                    lng: t["lng"]
                };
                var marker = new maps.Marker({ map: map });
                marker.setPosition(target);
                var infowindow = new maps.InfoWindow();
                // var n = t["qid"]
                if (t["con"]) {
                  infowindow.setContent(t["con"] + " in " + t["loc"] + "?\n" + 
                                        t["ans"] + " answers");
                  infowindow.setOptions({
                      disableAutoPan: true,
                  });
                  infowindow.open(map, marker);
                  marker.addListener("click", 
                    () => this.props.history.push("/replies/" + t["qid"]
                  ));
                }
              }
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

    submitHandler = place => {
        console.log(place);
        //const { 0: place } = this.state.places;
        //if (place) {
        this.props.submitPlace(place);
        //}
        //this.props.history.goBack();
    };

    //as of now, use default markers
    //but we can render any component via this library
    renderMarkers = places => {
        const map = this.state.mapInstance;
        // const mapApi = this.state.mapApi;
        const marker = this.state.marker;
        const infowindow = this.state.infowindow;
        const { 0: place } = places;
        marker.setPosition(place.geometry.location);
        infowindow.setContent(place.name);
        infowindow.open(map, marker);
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
        const { 0: plc } = this.state.places;
        if (plc) {
            this.props.submitPlace(plc);
        }
    };

    onClick = coord => {
        if (this.props.viewOnly) {
          return;
        }
        const map = this.state.mapInstance;
        const maps = this.state.mapApi;
        const marker = this.state.marker;
        const infowindow = this.state.infowindow;
        const latlng = { lat: coord.lat, lng: coord.lng };
        const service = new maps.places.PlacesService(map);
        var self = this;
        const request = {
            location: latlng,
            //openNow: true,
            types: [
                "point_of_interest",
                "bus_station",
                "atm",
                "bar",
                "park",
                "gym",
                "store",
                "cafe",
                "library",
                "school",
                "restaurant",
            ],
            language: "kor",
            //radius: 200,}
            rankBy: maps.places.RankBy.DISTANCE
        };
        service.nearbySearch(request, function(results, status) {
            if (status === maps.places.PlacesServiceStatus.OK) {
                if (results[0]) {
                    marker.setPosition(latlng);
                    console.log(results[0]);
                    //placeid = results[0].place_id;
                    //console.log(results);
                    infowindow.setContent(results[0].name);
                    infowindow.open(map, marker);
                    //self.addPlace([results[0]]);
                    self.submitHandler(results[0]);
                } else {
                    window.alert("No results found");
                }
            } else {
                window.alert("Geocoder failed due to: " + status);
            }
        });
    };

    render() {
        const { places, mapApiLoaded, mapInstance, mapApi } = this.state;
        let center = { lat: 37.448134, lng: 126.952427 };

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
            <Grid className="Map">
                <LocationListener />
                {mapApiLoaded && !this.props.viewOnly && (
                    <SearchBox
                        style={{ top: 100 }}
                        map={mapInstance}
                        mapApi={mapApi}
                        addplace={this.addPlace}
                    />
                )}
                <GoogleMapReact
                    style={{
                        position: "relative",
                        height: "91.5vh",
                        top: 14,
                        width: "100%"
                    }}
                    defaultZoom={this.props.zoom}
                    center={center}
                    bootstrapURLKeys={{
                        key: API_KEY,
                        libraries: ["places", "geometry"]
                    }}
                    options={{ disableDefaultUI: this.props.viewOnly }}
                    //styles:[{featureType: "transit", elementType: "labels"}],
                    //labels: true, mapTypeControl: false, mapTypeId: "roadmap", tilt: 0}}
                    //layerTypes={['TransitLayer']}
                    onClick={this.onClick}
                    yesIWantToUseGoogleMapApiInternals
                    onChildClick={this.clickSubmitHandler}
                    onGoogleApiLoaded={({ map, maps }) =>
                        this.apiHasLoaded(map, maps)
                    }
                />
            </Grid>
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
