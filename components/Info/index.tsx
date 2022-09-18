import React from "react";
import { infoData } from "../../pages/data";
import Button from "../Button";
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
          <Button buttonTheme="black">Start All</Button>
          <Button buttonTheme="white">Get All ORT</Button>
        </div>
      </div>
      <div className="right-inner">
        <div className="inner-box">
          <div className="text-box">
            <h3>EVENT BOUNUS (10.3~10.16)</h3>
            <p>
              - Wizard Hat <br />
              - Wizard Clothes
              <br />- Wand
            </p>
            <Button buttonTheme="white">View More</Button>
          </div>
          <img src="/images/character.png" />
        </div>
      </div>
    </InfoContainer>
  );
};

export default Info;
