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
          console.log('가게명: ' + store.name);
          /** TODO
           * 1. 가게명뿐만 아니라 각각의 정보들 다 가져오기
           * 2. 정보를 DB에 담을지, 그냥 요청 할 때마다 네이버에 요청 및 응답 받아서 화면에 뿌려줄지 고민해보기.
           * 3. 이게 꼭 속도 문제 뿐만 아니라, 나중에 추천 시스템 알고리즘 생각해봤을 때 DB에 담는 게 맞을 거 같기도 함.
           * 4. DB에 넣을 거면, 어떻게 넣을지 로직 생각해봐야 함.
           */
        }
      }
    } catch (error) {
      console.error(error);
    }

    /** ----------------------------------------------------- */
    res.status(200).json(test);
  },
};
