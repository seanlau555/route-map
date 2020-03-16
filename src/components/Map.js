import React from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from 'react-google-maps'
import * as R from 'ramda'

const Map = ({ center, directions }) => {
  return (
    <GoogleMap defaultCenter={center} defaultZoom={11}>
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: '#ff2343',
              strokeOpacity: 0.8,
              strokeWeight: 3
            }
          }}
        />
      )}
    </GoogleMap>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

class SimpleMap extends React.PureComponent {
  state = {
    directions: null
  }
  componentDidUpdate(prevProps) {
    const {
      isFetching,
      route: { path }
    } = this.props
    if (
      isFetching !== prevProps.isFetching &&
      !isFetching &&
      !R.isEmpty(path)
    ) {
      this.delayedShowMarkerAndRoute()
    }
  }

  delayedShowMarkerAndRoute = () => {
    const {
      origin,
      destination,
      route: { path }
    } = this.props
    const directionsService = new window.google.maps.DirectionsService()

    const waypts = []
    for (var i = 0; i < path.length; i++) {
      waypts.push({
        location: new window.google.maps.LatLng(path[i][0], path[i][1]), //path[i].value,
        stopover: true
      })
    }
    directionsService.route(
      {
        origin,
        destination,
        waypoints: waypts,
        travelMode: 'DRIVING',
        optimizeWaypoints: true
      },
      (response, status) => {
        if (status === 'OK') {
          this.setState({ directions: response })
        } else {
          console.log('Directions request failed due to ' + status)
        }
      }
    )
  }

  render() {
    const { directions } = this.state
    return (
      <WrappedMap
        center={this.props.center}
        directions={directions}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `90vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

SimpleMap.defaultProps = {
  center: {
    lat: 22.284419,
    lng: 114.15951
  },
  zoom: 13
}

export default SimpleMap
