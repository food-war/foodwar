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
          today.setDate(today.getDay() > 4 ? today.getDate() + 3 : today.getDate() + 1);
          let day = today.toLocaleString().split('.');
          const year = day[0].trim();
          const month = day[1].trim();
          const date = day[2].trim();
          let yoil = '';

          switch (today.getDay()) {
            case 0:
              yoil = '일';
              break;
            case 1:
              yoil = '월';
              break;
            case 2:
              yoil = '화';
              break;
            case 3:
              yoil = '수';
              break;
            case 4:
              yoil = '목';
              break;
            case 5:
              yoil = '금';
              break;
            case 6:
              yoil = '토';
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
                {`${year}.${month}.${date}(${yoil})`}
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
                {list.store_tags.json
                  ? list.store_tags.json.map(item => {
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
