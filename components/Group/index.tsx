import React from "react";
import { GroupContainer } from "./style";

const Group = () => {
  return (
    <GroupContainer>
      <h2>Group Staking</h2>
      <div className="group-inner">
        <div className="img-box">
          <div className="plus_single_inner">
            <img src="/images/plus.png" />
          </div>
          <div className="plus_single_inner">
            <img src="/images/plus.png" />
          </div>
          <div className="plus_single_inner">
            <img src="/images/plus.png" />
          </div>
          <div className="plus_single_inner">
            <img src="/images/plus.png" />
          </div>
          <div className="plus_single_inner">
            <img src="/images/plus.png" />
          </div>
        </div>
        <div className="info-box">
          {["BONUS : 10%", "00d : 00h : 00m", "0 ORT"].map((item, idx) => (
            <div className="item-box">
              <div className="data-box">
                <p className={idx === 2 ? "color" : ""}>{item}</p>
              </div>
            </div>
          ))}
          <div className="claim-btn">Claim</div>
        </div>
      </div>
    </GroupContainer>
  );
};

export default Group;
