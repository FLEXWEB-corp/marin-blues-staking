import React, { useState } from "react";
import { singleData } from "../../pages/data";
import AddNft from "../AddNft";
import Button from "../Button";
import StakingModal from "../StakingModal";
import { SingleContainer } from "./style";

const Single = () => {
  const [addModal, setAddModal] = useState(false);
  const [stakingModal, setStakingModal] = useState(false);

  return (
    <SingleContainer>
      <h2>Single Staking</h2>
      <div className="single-container">
        {singleData.map((item, idx) => (
          <>
            <div className="item-inner">
              <img src={item.url} />
              <div className="info-inner">
                <p>{item.title}</p>
                <p>{item.time}</p>
                <p>{item.ort}</p>
                <Button
                  width="126px"
                  height="36px"
                  margin="10px 9px 0px"
                  buttonTheme="white"
                  onClick={() => setStakingModal((prev) => !prev)}
                >
                  {item.type}
                </Button>
              </div>
            </div>
            {singleData.length === idx + 1 && (
              <div
                className="plus_single_inner"
                onClick={() => setAddModal((prev) => !prev)}
              >
                <img src="/images/plus.png" />
              </div>
            )}
          </>
        ))}
      </div>

      {addModal && <AddNft onClose={() => setAddModal(false)} />}
      {stakingModal && (
        <StakingModal status="ing" onClose={() => setStakingModal(false)} />
      )}
    </SingleContainer>
  );
};

export default Single;
