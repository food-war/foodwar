import React from 'react';
import { Link } from 'react-router-dom';
import './StoreItem.scss';

const StoreItem = ({ store, storeDeleteList }) => {
  const {
    store_id,
    store_name,
    store_category,
    store_hasBooking,
    store_promotionTitle,
    store_x,
    store_y,
    store_distance,
    store_imageSrc,
    store_virtualPhone,
    store_phone,
    store_roadAddr,
    store_commonAddr,
    store_addr,
    store_blogCafeReviewCount,
    store_bookingReviewCount,
    store_totalReviewCount,
    store_tags,
    store_priceCategory,
    store_url,
    store_pk_address,
    date,
  } = store;

  const link = `https://store.naver.com/restaurants/detail?id=${store_id}`;
  const storeDelete = () => {
    window.event.preventDefault();
    if (window.location.pathname === '/recomend') {
      //추천페이지에서만 가능하게끔
      if (window.confirm('이 식당을 추천 받지 않겠습니까?')) {
        // console.log(mouseClick);
        storeDeleteList(store);
      }
    }
  };
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="store-card-wrap">
        <div className="store-card">
          <div className="store-card-image">
            <div className="back-div">
              <span onClick={() => storeDelete()}>해당 식당 추천 받지않기</span>
            </div>
            {store_imageSrc ? <img src={store_imageSrc} alt={store_name} /> : null}
          </div>
          <div className="store-card-contents">
            <div className="store-card-name">
              {store_name}
            </div>
            <div className="store-card-category">
              {store_category}
            </div>
            <div className="store-card-address">
              {store_roadAddr}
            </div>
            <div className="store-card-phone">
              {store_phone}
            </div>
            <div className="store-card-review">
              전체 리뷰 개수: {store_totalReviewCount}개
            </div>
            <div className="store-card-tag">
              {store_tags.length > 0 && store_tags[0] !== ''
                ? store_tags.map(item => {
                    return `${item}, `;
                  })
                : '태그 없음'}
            </div>
            <div className="store-card-priceCategory">
              가격: {store_priceCategory ? store_priceCategory : '????'}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default StoreItem;
