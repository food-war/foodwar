import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  geolocationPending,
  geolocationSuccess,
  geolocationFailure,
} from '../../actions/geolocationActions';
import { getStoreList, updateAddress } from '../../actions/storeActions';
import { deleteStore } from '../../actions/recomendActions';

import GetGeolocation from '../geolocation/GetGeolocation';
import isEmpty from '../../validation/is-empty';
// import { isRegExp } from 'util';
import StoreItem from '../store/StoreItem';
import { withRouter } from 'react-router-dom';
import './index.scss';
import Reload from '../../lotties/Reload';

//hook를 사용할 떄는 대문자로 해야함
const RecomendContainer = props => {
  const [day, dayChange] = useState(1);
  const [isStopped, changeStopped] = useState(true);
  const [isPaused] = useState(false);

  const [delete_store, changeDelete] = useState('');

  const { geolocation, store } = props;
  const { pending, error, errorMessage } = geolocation;
  const storePending = store.pending;
  const storeError = store.error;
  let storeList = store.list;

  let result;
  let random = Math.floor(Math.random() * 20); //랜덤숫자
  const randomArr = [];

  //스토어 랜덤으로 보여주기 위한 함수
  const randomStore = () => {
    random = Math.floor(Math.random() * 20);
    randomArr.includes(random) || randomArr.push(random); //중복제거
    randomArr.length < day && randomStore(); //추천날짜의 수만큼 random배열 채워주기
  };
  randomStore();

  const storeDeleteList = store_delete_list => {
    // // changeDelete(store_delete_list);
    // console.log(delete_store, store_delete_list);
    const deleted_store = {
      store_id: store_delete_list,
      // ...store_delete_list,
    };
    props.deleteStore(deleted_store);
  };

  const storeReload = e => {
    changeStopped(!isStopped);
  };

  //store 에러 처리
  if (error || storeError || !isEmpty(storeList.error)) {
    if (error) {
      result = (
        <div>
          {errorMessage}
        </div>
      );
    } else if (storeError) {
      result = <div>색상 목록을 불러 올 수 없습니다. 문제가 지속 될 경우 관리자에게 문의해주세요.</div>;
    } else {
      result = (
        <div>
          {storeList.errors.crawling_error}
        </div>
      );
    }
  } else if (pending || storePending) {
    result = <div>로딩 중...</div>;
  } else {
    storeList = storeList.result;

    if (storeList) {
      if (day <= 1) {
        //하루 추천
        result = (
          <div className="card-wrap">
            {storeList.map((store, index) => {
              if (randomArr.includes(index)) {
                return <StoreItem store={store} storeDeleteList={storeDeleteList} />;
              }
            })}
          </div>
        );
      } else {
        // 5일치 추천
        let today = new Date();

        result = (
          <div className="store-table">
            <div className="store-table-header">
              <div> 날짜</div>
              <div> 이름</div>
              <div> 분류</div>
              <div> 주소</div>
              <div> 태그</div>
              <div> 추천받지않기</div>
            </div>
            {storeList.map((list, index) => {
              if (randomArr.includes(index)) {
                today.getDay() >= 4
                  ? today.setDate(today.getDate() + 3)
                  : today.setDate(today.getDate() + 1); //인덱스 만큼 날짜 더해줌

                let date = today.toLocaleString().slice(0, 11); //2020. 5. 16 형태
                let sDate = date.slice(-1) === '.' ? date.slice(0, date.length - 1) : date; // 2020. 5. 5. 이런 식이면 뒤에 0 자르고 보여줌
                let yoil = '';

                switch (today.getDay()) {
                  case 0:
                    yoil = '월';
                    break;
                  case 1:
                    yoil = '화';
                    break;
                  case 2:
                    yoil = '수';
                    break;
                  case 3:
                    yoil = '목';
                    break;
                  case 4:
                    yoil = '금';
                    break;
                  case 5:
                    yoil = '토';
                    break;
                  case 6:
                    yoil = '일';
                    break;
                }
                return (
                  <div
                    className="rows"
                    onClick={() => {
                      // alert(window.event.target);
                      // console.log(window.event.target.type);
                      window.event.target.type !== 'checkbox'
                        ? window.open(list.store_url)
                        : storeDeleteList(list.store_id); //list.store_id
                    }}
                  >
                    <div>
                      {/* 날짜(요일) */}
                      {sDate}({yoil})
                    </div>
                    <div>
                      {/* 스토어 이름 */}
                      <div>
                        <img src={list.store_imageSrc} />
                        <span>
                          {list.store_name}
                        </span>
                      </div>
                    </div>
                    <div>
                      {/* 분류 */}
                      {list.store_category}
                    </div>
                    <div>
                      {/* 주소 */}
                      {list.store_roadAddr}
                    </div>
                    <div>
                      {/* 태그 */}
                      {list.store_tags.filter((a, i) => i < 3).join(', ')}
                    </div>
                    <div>
                      <input type="checkbox" />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        );
      }
    }
  }
  useEffect(() => {
    geolocationPending();
  }); //},[]} => 가장 처음 렌더링 될떄만

  const getGeolocation = fullAddress => {
    if (fullAddress === -1) {
      props.geolocationFailure('현재 사용중인 브라우저는 위치를 가져올 수가 없습니다.');
    } else if (fullAddress === -2) {
      props.geolocationFailure('현재위치 가져오기 기능이 차단되었습니다.');
    } else {
      let { requestData } = props.store;
      requestData = {
        ...requestData,
        address: fullAddress,
      };

      props.geolocationSuccess(fullAddress);
      props.getStoreList(requestData);
    }
  };

  return (
    <div className="RecomendContainer">
      <div className="header">
        <div>Food war가 추천해줄게요~</div>
        <div className="selectGroup">
          <select onChange={() => dayChange(window.event.target.value)}>
            <option value="1">1 일치 추천하기</option>
            <option value="5">5 일치 추천하기</option>
          </select>

          <div className="reload" onClick={() => storeReload(window.event)}>
            <Reload isStopped={isStopped} isPaused={isPaused} />
            {/* isPaused={isPaused}  isStopped={isStopped}*/}
          </div>
        </div>
      </div>
      <GetGeolocation getGeolocation={getGeolocation} />
      {result}
    </div>
  );
};

// export default Index;
const mapStateToProps = state => ({
  geolocation: state.geolocation,
  store: state.store,
  store_delete: state.delete_store,
  // errors: state.errors,
});

export default connect(mapStateToProps, {
  geolocationPending,
  geolocationSuccess,
  geolocationFailure,
  getStoreList,
  updateAddress,
  deleteStore,
})(withRouter(RecomendContainer));
