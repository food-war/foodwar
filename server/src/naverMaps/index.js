import axios from 'axios';

module.exports = {
  naverMapsCrawling: async query => {
    let errors = {};
    let result = [];
    query = encodeURI(query + ' 맛집');

    try {
      const headers = {
        Connection: 'keep-alive',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
        'Sec-Fetch-User': '?1',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'navigate',
        Referer:
          'https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C+%EA%B4%80%EC%95%85%EA%B5%AC+%EC%8B%A0%EB%A6%BC%EB%8F%99+%EB%A7%9B%EC%A7%91',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'If-None-Match': 'W/"27baa-mo29uE5evjuRF3Ph++PV+w"',
      };

      const options = {
        url:
          'https://store.naver.com/restaurants/list?entry=pll&filterId=r09620102&query=' +
          query +
          '&sessionid=Y1DTUn93nu%2BCAh1RgFao6w%3D%3D',
        headers: headers,
      };

      // 네이버 map 응답 데이터
      const html = await axios.get(options.url, options.headers);
      let data = html.data;

      // 응답 데이터 정제하는 과정
      let gubn = html.data.indexOf('<div id="app">');
      data = data.substring(gubn);
      gubn = data.indexOf('<script>');
      let gubn2 = data.indexOf('</script>');
      data = data.substring(gubn, gubn2);
      data = data.substring(27);

      // eval 함수는 뭔가 에러나서 eval함수 대체 코드
      var dataEval = new Function('return ' + data)(); // eval 함수 같은 역할

      // dataEval 함수를 콘솔로 찍어보면 알 수 있음. 가게정보 가져오는 과정.
      const lastKey = dataEval.businesses.lastKey;
      const storeArray = dataEval.businesses[lastKey].items;

      for (const store of storeArray) {
        if (store) {
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
          const store_imageSrc = store.imageSrc || ''; // 이미지 주소 (썸네일, 대표 이미지로 사용하면 됨)
          const store_virtualPhone = store.virtualPhone || ''; // 가상 전화번호 (있는 곳도 있고, 없는 곳도 있음)
          const store_phone = store.phone || ''; // 가게 전화번호
          const store_roadAddr = store.roadAddr || ''; // 신주소 상세 ('서울 관악구 신림동길 5 2층')
          const store_commonAddr = store.commonAddr || ''; // '서울 관악구'
          const store_addr = store.addr || ''; // 상세 주소? ('신림동 1639-57')
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
          result = result.concat(result_data);
        }
      }
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
