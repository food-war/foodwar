import axios from 'axios';

module.exports = {
  newNaverMapsCrawling: async query => {
    let errors = {};
    let result = [];
    query = encodeURI(query + ' 맛집');

    try {
      let html = '';

      //axios 옵션 정의
      const options = {
        url:
          'https://pcmap.place.naver.com/restaurant/list?query=' +
          query +
          '&x=127.22805261611943&y=37.5577359837473&entry=pll&filterId=r02&from=nx&fromNxList=true&sessionid=3KK7FPZfg3XxNa45%2B9aZmg%3D%3D&ts=1601791019499',
        headers: {
          headers: {
            accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            'cache-control': 'max-age=0',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
          },
          referrerPolicy: 'strict-origin-when-cross-origin',
          body: null,
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
        },
      };
      await axios
        .get(options.url, options.headers)
        .then(r => (html = r))
        .catch(e => console.log(e));

      //음식점 관련 데이터만 가져오기
      let data = html.data;
      let target1 = html.data.indexOf('window.__APOLLO_STATE__');
      let target2 = html.data.indexOf('window.__PLACE_STATE__');

      data = data.substring(target1, target2).trim();
      data = data.substring(25, data.length);

      let filterdData = [];
      var dataEval = new Function('return ' + data)(); // eval 함수 같은 역할

      //object.entries를 사용해 key,value 가진 배열로 만든 후 RestaurantSummary로 시작하는 것만 분리해옴
      for (const [key, value] of Object.entries(dataEval)) {
        if (key.search(/[^RestaurantSummary]/g) > 0) {
          filterdData.push(value);
        }
      }

      filterdData.forEach((store, storeCount) => {
        if (store && store.id) {
          const store_id = store.id || ''; // ID
          const store_name = store.name || ''; // 가게명
          const store_category = store.category || ''; // 분류 (한식, 카페, 낙지, 곱창, 막창, 양 등)
          const store_hasBooking = store.hasBooking || ''; // 예약 가능 여부 (true, false)

          /** promotionTitle은 대부분 undefined.
           * 값은 '예약 한팀 당 통감자 제공', '7시이전 네이버예약시 부안김치찌개+대파라면 공짜'
           * 진행중인 이벤트? 같은 게 들어가 있는 거 같음.
           */
          const store_promotionTitle = store.promotionTitle || '';

          const store_x = store.x || ''; // 지도 X좌표 값
          const store_y = store.y || ''; // 지도 Y좌표 값
          const store_distance = store.distance || ''; // 현재 위치로부터 가게까지의 거리? 확실히 확인 해 볼 필요가 있음. (4632.36 이런식으로 값이 들어가 있음)
          const store_imageSrc = store.imageUrl || ''; // 이미지 주소 (썸네일, 대표 이미지로 사용하면 됨)
          const store_virtualPhone = store.virtualPhone || ''; // 가상 전화번호 (있는 곳도 있고, 없는 곳도 있음)
          const store_phone = store.phone || ''; // 가게 전화번호
          const store_roadAddr = store.roadAddress || ''; // 신주소 상세 ('서울 관악구 신림동길 5 2층')
          const store_commonAddr = store.commonAddress || ''; // '서울 관악구'
          const store_addr = store.address || ''; // 상세 주소? ('신림동 1639-57')
          const store_blogCafeReviewCount = store.blogCafeReviewCount || ''; // 블로그 리뷰 개수
          const store_bookingReviewCount = store.bookingReviewCount || ''; // 예약 리뷰 개수?
          const store_totalReviewCount = store.totalReviewCount || ''; // 전체 리뷰 개수
          const store_tags = store.tags || ''; // 가게 관련 태그들
          const store_priceCategory = store.priceCategory || ''; // 가격대 (2만원 대, 3만원 대 등)
          const store_url = store_name
            ? `https://map.naver.com/v5/search/${encodeURI(store_name)}/`
            : ''; // 가게 링크 (내가 만든 거)

          // 업체 정보 하나로 묶기
          const result_data = {
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
          };

          // 각 업체들 배열로 저장
          if (storeCount < 20) result = result.concat(result_data);
        }
      });
    } catch (error) {
      console.log(error);
      errors.crawling_error = '서버 에러입니다. 관리자에게 문의해주세요. (c)';
    }

    return {
      result,
      errors,
    };
  },
};
