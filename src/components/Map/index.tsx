import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import Place from './place';
import { connect } from 'react-redux';
import { GOOGLE_API_MAPS_KEY } from 'settings';

class Map extends Component<any, any> {

  divMap: any = null;

  componentDidUpdate(prevProps: any) {
    if (this.props.schools !== prevProps.schools) {
      this.divMap.scrollIntoView({block: 'start', behavior: 'smooth'});
    }
  }
  render() {
    const key = GOOGLE_API_MAPS_KEY;
    const { schools } = this.props;
    let placesArray = [];
    if (schools && schools.length > -1) {
      for(let i = 0; i < schools.length; i++) {
        placesArray.push({id: schools[i].name, lat: schools[i].latitude, lng: schools[i].longitude });
      }
    }

    const places = (placesArray && placesArray.length) ? placesArray
      .map((place: any) => {
        const {id, ...coords} = place;

        return (
          <Place
            key={id}
            {...coords}
            text={id}
            // use your hover state (from store, react-controllables etc...)
            hover={this.props.hoverKey === id} />
        );
    }) : null;
    return (
      <div style={{ height: '50vh', width: '100%' }} ref={(div: any) => { this.divMap = div; }} >
        <GoogleMap
        bootstrapURLKeys={{ key }}
        center={this.props.center}
        zoom={this.props.zoom}
        hoverDistance={40 / 2}
        >
        {places}
      </GoogleMap>
      </div>
    );
  }
}
function mapStateToProps(state: any, ownProps: any) {
  return {
    schools: state.app.School.list.data
  };
}
export default connect(mapStateToProps)(Map);