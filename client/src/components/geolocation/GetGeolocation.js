import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import axios from 'axios';

class GetGeolocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      fullAddress: '',
      si: '',
      gu: '',
      dong: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    let result = true;
    if (this.state.latitude === nextState.latitude) result = false;
    return result;
  }

  componentDidUpdate() {
    const { latitude, longitude } = this.state;

    if (latitude > 0) {
      const url =
        'https://dapi.kakao.com/v2/local/geo/coord2address.json?x=' +
        longitude +
        '&y=' +
        latitude +
        '&input_coord=WGS84';
      const headers = {
        Authorization: 'KakaoAK b1e65b62b8c869dfb380e5edd7226199',
      };

      axios
        .get(url, { headers: headers })
        .then(res => {
          const resData = res.data.documents[0].address;
          const {
            address_name,
            // region_1depth_name,
            // region_2depth_name,
            // region_3depth_name,
          } = resData;
          this.props.getGeolocation(address_name);
          // this.setState({
          //   fullAddress: address_name,
          //   si: region_1depth_name,
          //   gu: region_2depth_name,
          //   dong: region_3depth_name,
          // });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.coords && prevState.latitude === 0) {
      return {
        latitude: nextProps.coords.latitude,
        longitude: nextProps.coords.longitude,
      };
    } else if (!nextProps.isGeolocationAvailable) {
      this.props.getGeolocation(-1);
      return null;
    } else if (!nextProps.isGeolocationEnabled) {
      this.props.getGeolocation(-2);
      return null;
    }
    return null;
  }

  render() {
    return null;
    // const { fullAddress, si, gu, dong } = this.state;
    // return !this.props.isGeolocationAvailable ? (
    //   <div>Your browser does not support Geolocation</div>
    // ) : !this.props.isGeolocationEnabled ? (
    //   <div>Geolocation is not enabled</div>
    // ) : this.props.coords ? (
    //   <>
    //     전체 주소: {fullAddress}
    //     <br />
    //     시: {si}
    //     <br />
    //     구: {gu}
    //     <br />
    //     동: {dong}
    //     <br />
    //   </>
    // ) : (
    //   <div>Getting the location data&hellip; </div>
    // );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GetGeolocation);
