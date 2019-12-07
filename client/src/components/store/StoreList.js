import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import axios from 'axios';

class StoreList extends Component {
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
            region_1depth_name,
            region_2depth_name,
            region_3depth_name,
          } = resData;
          this.setState({
            fullAddress: address_name,
            si: region_1depth_name,
            gu: region_2depth_name,
            dong: region_3depth_name,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.coords) {
      this.setState({
        latitude: nextProps.coords.latitude,
        longitude: nextProps.coords.longitude,
      });
    }
  }

  render() {
    const { fullAddress, si, gu, dong } = this.state;
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <>
        전체 주소: {fullAddress}
        <br />
        시: {si}
        <br />
        구: {gu}
        <br />
        동: {dong}
        <br />
      </>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(StoreList);
