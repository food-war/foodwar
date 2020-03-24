import React from 'react';
import { Link } from 'react-router-dom';
import './StoreItem.scss';

const StoreItem = ({ store }) => {
  // console.log(store);
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

  return (
    <a href={link} target="_blank">
      <div className="store-card-wrap">
        <div className="store-card">
          <div className="store-card-image">
            <img src={store_imageSrc} alt={store_name} />
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
