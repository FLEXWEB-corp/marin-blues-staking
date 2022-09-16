import React from "react";
import { infoData } from "../../pages/data";
import { InfoContainer } from "./style";

const Info = () => {
  return (
    <InfoContainer>
      <div className="left-inner">
        <div className="left-inner-box">
          {infoData.map(
            (item: { title: string; count: number }, idx: number) => (
              <div className="item-box">
                <div className="data-box">
                  <p>{item.title}</p>
                  <p className={idx !== 0 ? "color" : ""}>{item.count}</p>
                </div>
              </div>
            )
          )}
        </div>
        <div className="button-container">
          <div>Start All</div>
          <div>Get All ORT</div>
        </div>
      </div>
      <div className="right-inner">
        <div className="inner-box">
          <div className="text-box">
            <h3>EVENT BOUNUS (10.3~10.16)</h3>
            <p>
              - Wizard Hat <br />
              - Wizard Clothes<br />
              - Wand
            </p>
            <div className="more-btn"> View More</div>
          </div>
          <img src="/images/character.png" />
        </div>
      </div>
    </InfoContainer>
  );
};

export default Info;
