import React from "react";
import "./LeftView.scss";

const LeftView = () => {
  return (
    <div className="LeftView vertical-middle">
      <div className="contents-box">
        <div className="title">Food war</div>
        <div className="contents">
          오늘은 뭐 먹지??
          <br />
          매번 메뉴 고르는 것도 완전 전쟁이야..
        </div>
        <div className="contents">매일매일 고민하기 귀찮다면 지금 당장 이용해보세요!</div>
      </div>
    </div>
  );
};

export default LeftView;
