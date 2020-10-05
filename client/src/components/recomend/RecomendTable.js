import React from 'react';

const RecomendTable = ({ storeList, storeDeleteList, randomArr }) => {
  let today = new Date();
  return (
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
                storeDeleteList(list);
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
                {/* {list.store_tags ? list.store_tags.json + ' ' : '태그 없음'} */}
                {list.store_tags.length > 0 && list.store_tags[0] !== ''
                  ? list.store_tags.map(item => {
                      return `${item}, `;
                    })
                  : '태그 없음'}
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
};

export default RecomendTable;
