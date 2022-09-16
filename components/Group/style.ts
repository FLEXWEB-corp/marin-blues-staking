import styled from "styled-components";

export const GroupContainer = styled.div`
  margin-top: 80px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.33;
    color: #23262f;
    margin-bottom: 26px;
  }

  .group-inner {
    .img-box {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      border: solid 2px #e6e8ec;
      background-color: #fff;
      padding: 14px 0px;
      gap: 44px;
    }

    .info-box {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 48px;
      list-style: none;
      margin-top: 4px;
      padding: 16px 193px;
      border-radius: 8px;
      background-color: #f4f5f6;
    }

    .item-box {
      display: flex;
      align-items: center;
    }
    .item-box::after {
      width: 1px;
      height: 64px;
      opacity: 0.5;
      background-color: #777e90;
      content: "";
    }
    .item-box:last-child::after {
      opacity: 0;
    }
    .data-box {
      p {
        margin-right: 48px;
      }
    }
    .color {
      color: #00c389;
    }
  }

  .claim-btn {
    padding: 5px 37px 7px;
    border-radius: 32px;
    background-color: #141416;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: 0.32px;
    cursor: pointer;
  }

  .plus_single_inner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 160px;
    border: solid 2px #5e4fff;
    background-color: #fcfcfd;
    cursor: pointer;
  }
`;
