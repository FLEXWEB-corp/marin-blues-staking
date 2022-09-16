import type { NextPage } from "next";
import { useState } from "react";
import Group from "../components/Group";
import Info from "../components/Info";
import Overlay from "../components/Overlay";
import Single from "../components/Single";
import { MainContainer, TabModal } from "./style";

const Home: NextPage = () => {
  const [tab, setTab] = useState("NFTs");
  const [tabClick, setTabClick] = useState(false);

  const onChangeTab = (item: string) => {
    setTab(item);
    setTabClick(false);
  };

  return (
    <MainContainer>
      <img className="crystal-img" src="/images/crystal.png" alt="crystal" />
      <div className="top-title">
        <h1>
          Staking <span>{tab}</span>
        </h1>
        <div className="arrow-inner">
          <img
            src="/images/arrow-down.png"
            onClick={() => setTabClick((prev) => !prev)}
          />
          {tabClick && (
            <TabModal>
              <div className="tab-inner">
                {["NFTs", "ORT"].map((item) => (
                  <p
                    className={item === tab ? "color" : ""}
                    onClick={() => onChangeTab(item)}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </TabModal>
          )}
        </div>
      </div>

      <Info />
      <Single />
      <Group />
    </MainContainer>
  );
};

export default Home;
