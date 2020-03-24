import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  geolocationPending,
  geolocationSuccess,
  geolocationFailure,
} from '../../actions/geolocationActions';
import { getStoreList, updateAddress } from '../../actions/storeActions';
import GetGeolocation from '../geolocation/GetGeolocation';
import isEmpty from '../../validation/is-empty';
import StoreItem from './StoreItem';
import './index.scss';

class StoreContainer extends Component {
  componentDidMount() {
    this.props.geolocationPending();
  }

  getGeolocation = fullAddress => {
    if (fullAddress === -1) {
      this.props.geolocationFailure('현재 사용중인 브라우저는 위치를 가져올 수가 없습니다.');
    } else if (fullAddress === -2) {
      this.props.geolocationFailure('현재위치 가져오기 기능이 차단되었습니다.');
    } else {
      let { requestData } = this.props.store;
      requestData = {
        ...requestData,
        address: fullAddress,
      };
      this.props.geolocationSuccess(fullAddress);
      this.props.getStoreList(requestData);
    }
  };

  render() {
    const { geolocation, store } = this.props;
    const { pending, error, errorMessage } = geolocation;
    const storePending = store.pending;
    const storeError = store.error;
    let storeList = store.list;

    let result;

    if (error || storeError || !isEmpty(storeList.errors)) {
      if (error) {
        result = (
          <div>
            {errorMessage}
          </div>
        );
      } else if (storeError) {
        result = <div> 식상 목록을 불러 올 수 없습니다. 문제가 지속 될 경우 관리자에게 문의해주세요.</div>;
      } else {
        result = (
          <div>
            {storeList.errors.crawling_error}
          </div>
        );
      }
    } else if (pending || storePending) {
      result = <div> 로딩중...</div>;
    } else {
      storeList = storeList.result;

      if (storeList) {
        result = (
          <div className="card-wrap">
            {storeList.map((store, index) => {
              return <StoreItem store={store} key={`store_${index}`} />;
            })}
          </div>
        );
      }
    }

    return (
      <div className="StoreContainer">
        <GetGeolocation getGeolocation={this.getGeolocation} />
        {result}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  geolocation: state.geolocation,
  store: state.store,
  // errors: state.errors,
});

export default connect(mapStateToProps, {
  geolocationPending,
  geolocationSuccess,
  geolocationFailure,
  getStoreList,
  updateAddress,
})(StoreContainer);
