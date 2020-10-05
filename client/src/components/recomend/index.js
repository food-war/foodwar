import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  geolocationPending,
  geolocationSuccess,
  geolocationFailure,
} from '../../actions/geolocationActions';
import { getStoreList, updateAddress } from '../../actions/storeActions';
import { deleteStore } from '../../actions/recomendActions';
import GetGeolocation from '../geolocation/GetGeolocation';
import isEmpty from '../../validation/is-empty';
import StoreItem from '../store/StoreItem';
import { withRouter } from 'react-router-dom';
import './index.scss';
import Reload from '../../lotties/Reload';
import RecomendTable from './RecomendTable';

const RecomendContainer = props => {
  const [day, dayChange] = useState(1);
  const [isStopped, changeStopped] = useState(true);
  const [isPaused] = useState(false);

  //useDispatch
  const dispatch = useDispatch();

  //useSelector: Redux 스토어 상태에서 데이터를 추출
  const geolocation = useSelector(state => state.geolocation);
  const store = useSelector(state => state.store);
  const store_delete = useSelector(state => state.recomend.delete_list);
  const { pending, error, errorMessage, address } = geolocation;
  const storePending = store.pending;
  const storeError = store.error;
  let storeList = store.list;

  let result;
  let random = Math.floor(Math.random() * 20); //랜덤숫자
  const randomArr = [];

  useEffect(() => {
    geolocationPending();
  }); //},[]} => 가장 처음 렌더링 될떄만

  const storeDeleteList = useCallback(store => {
    const deleted_store = {
      store_id: store.store_id,
    };
    dispatch(deleteStore(deleted_store));
  });

  const getGeolocation = useCallback(
    fullAddress => {
      if (fullAddress === -1) {
        dispatch(geolocationFailure('현재 사용중인 브라우저는 위치를 가져올 수가 없습니다.'));
      } else if (fullAddress === -2) {
        dispatch(geolocationFailure('현재위치 가져오기 기능이 차단되었습니다.'));
      } else {
        let { requestData } = store;
        requestData = {
          ...requestData,
          address: fullAddress,
        };
        dispatch(geolocationSuccess(fullAddress));
        dispatch(getStoreList(requestData));
      }
    },
    [address], //리덕스 스토어의 geolocation의 주소가 바꼈을때 재실행되게끔
  );

  //스토어 랜덤으로 보여주기 위한 함수
  const randomStore = () => {
    // console.log('randomStore ~~');
    if (storeList.result instanceof Array) {
      // storeList.result.forEach(a =>
      //   console.log(store_delete, a.store_id, store_delete.includes(a.store_id)),
      // );
      console.log(storeList.result.filter(store => !store_delete.includes(store.store_id)));
      // storeList.result = storeList.result.filter(store => !store_delete.includes(store.store_id));
    }

    random = Math.floor(Math.random() * 20);
    randomArr.includes(random) || randomArr.push(random); //중복제거
    randomArr.length < Number(day) && randomStore(); //추천날짜의 수만큼 random배열 채워주기
  };
  randomStore();
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
      result = <div>식당 목록을 불러 올 수 없습니다. 문제가 지속 될 경우 관리자에게 문의해주세요.</div>;
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
                return <StoreItem store={store} storeDeleteList={storeDeleteList} key={index} />;
              }
            })}
          </div>
        );
      } else {
        // 5일치 추천
        let today = new Date();

        result = (
          <RecomendTable
            storeList={storeList}
            storeDeleteList={storeDeleteList}
            randomArr={randomArr}
          />
        );
      }
    }
  }

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
          </div>
        </div>
      </div>
      <GetGeolocation getGeolocation={getGeolocation} />
      {result}
    </div>
  );
};

export default withRouter(RecomendContainer);
