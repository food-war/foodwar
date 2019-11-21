const axios = require('axios');
const cheerio = require('cheerio');
var request = require('request');

module.exports = {
  list: async (req, res) => {
    const test = req.body;

    /** ----------------------------------------------------- */

    try {
      var headers = {
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

      const address = '서울특별시 관악구 신림동'; // 나중에 req.body로 받아오면 됨.
      const query = encodeURI(address + ' 맛집');

      var options = {
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

      // 업체들 반복문 돌려서 일단 console로 찍어보기.
      for (const store of storeArray) {
        if (store) {
          /** 포함 안한 항목들
           * businessCategory - restaurant, bar
           * dbType - drt
           * desc - ''
           * hasNPay - true, false (Npay 가능 여부?? 거의다 false)
           * routeUrl - 'http://v4.map.naver.com/?eText=%EC%88%A0%EC%9D%B4%EB%82%A8&elng=126.9281698&elat=37.4873480' 지도 찍어주는 거 같은데, 바로 뜨진 않아서 패스. 비슷한 걸로 streetViewUrl 를 채택함.
           * street_panorama - 'Ocra7EHHuEl7pPtTrlQSBg==,73.17,10.00,126.9280771,37.4873199,120' (뭔지 모르겠음)
           * moreUGCReviewsPath - '/restaurants/fsasReviews?id=34228062&name=%EC%95%84%EC%9A%B0%EC%84%B1%EC%86%8C%EA%B3%B1%EC%B0%BD&category=restaurant'
           * moreFsasReviewsPath - '/restaurants/fsasReviews?id=34228062&name=%EC%95%84%EC%9A%B0%EC%84%B1%EC%86%8C%EA%B3%B1%EC%B0%BD&category=restaurant'
           */

          const store_id = store.id; // ID
          const store_name = store.name; // 가게명
          const store_category = store.category; // 분류 (한식, 카페, 낙지, 곱창, 막창, 양 등)
          const store_hasBooking = store.hasBooking; // 예약 가능 여부 (true, false)

          /** promotionTitle은 대부분 undefined.
           * 값은 '예약 한팀 당 통감자 제공', '7시이전 네이버예약시 부안김치찌개+대파라면 공짜'
           * 진행중인 이벤트? 같은 게 들어가 있는 거 같음.
           */
          const store_promotionTitle = store.promotionTitle;

          const store_x = store.x; // 지도 X좌표 값
          const store_y = store.y; // 지도 Y좌표 값
          const store_distance = store.distance; // 현재 위치로부터 가게까지의 거리? 확실히 확인 해 볼 필요가 있음. (4632.36 이런식으로 값이 들어가 있음)
          const store_imageSrc = store.imageSrc; // 이미지 주소 (썸네일, 대표 이미지로 사용하면 됨)
          const store_virtualPhone = store.virtualPhone; // 가상 전화번호 (있는 곳도 있고, 없는 곳도 있음)
          const store_phone = store.phone; // 가게 전화번호
          const store_streetViewUrl = store.streetViewUrl; // 네이버 맵 주소
          const store_roadAddr = store.roadAddr; // 신주소 상세 ('서울 관악구 신림동길 5 2층')
          const store_commonAddr = store.commonAddr; // '서울 관악구'
          const store_addr = store.addr; // 상세 주소? ('신림동 1639-57')
          const store_blogCafeReviewCount = store.blogCafeReviewCount; // 블로그 리뷰 개수
          const store_bookingReviewCount = store.bookingReviewCount; // 예약 리뷰 개수?
          const store_totalReviewCount = store.totalReviewCount; // 전체 리뷰 개수
          const store_tags = store.tags; // 가게 관련 태그들
          const store_priceCategory = store.priceCategory; // 가격대 (2만원 대, 3만원 대 등)

          const store_url = `https://store.naver.com/restaurants/detail?entry=pll&id=${store_id}`; // 가게 링크 (내가 만든 거)

          /** TODO
           * 1. 가게명뿐만 아니라 각각의 정보들 다 가져오기 - complete
           *
           * 2. 현재는 120개정도 가져오는 거 같은데, 더 가져올지 아니면 여기서 멈출지..더 가져올 거면 다음 페이지 구하는 방법 알아내야 함.
           * 2. 정보를 DB에 담을지, 그냥 요청 할 때마다 네이버에 요청 및 응답 받아서 화면에 뿌려줄지 고민해보기.
           * 3. 이게 꼭 속도 문제 뿐만 아니라, 나중에 추천 시스템 알고리즘 생각해봤을 때 DB에 담는 게 맞을 거 같기도 함.
           * 4. DB에 넣을 거면, 어떻게 넣을지 로직 생각해봐야 함.
           * 5-1. 요청을 받은 후 응답은 금방 해주는데..문제는 끝나지 않고 조금 기다려보면 'Server selection timed out after 30000 ms' 라는 에러가 뜸
           * 5-2. 왜 뜨는지, 떠도 상관은 없는지, 상관이 있던 없던 해결 방법 찾아 볼 것.
           */
        }
      }

      res.status(200).json({
        success: true,
        total_count: storeArray.length,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        errors: {
          error: error.message,
        },
      });
    }

    /** ----------------------------------------------------- */
  },
};
