import styled from "styled-components";

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 80px;

  .left-inner {
    max-width: 544px;
    padding: 40px 39px 32px;
    border-radius: 24px;
    box-shadow: 0 8px 16px 0 rgba(223, 223, 223, 0.5);
    background-color: #fff;

    .left-inner-box {
      display: flex;
      justify-content: center;

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
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px 30px 24px;

        p:nth-child(1) {
          font-family: Poppins;
          font-size: 16px;
          font-weight: 600;
          line-height: 1;
          margin-bottom: 8px;
        }
        p:nth-child(2) {
          font-family: Poppins;
          font-size: 24px;
          font-weight: 600;
          line-height: 1.33;
        }
        .color {
          color: #00c389;
        }
      }
    }

    .button-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 24px;
      margin-top: 10px;
    }
  }

  .right-inner {
    width: 544px;
    max-width: 544px;
    padding: 0 0 2px 32px;
    border-radius: 24px;
    border: solid 2px #00c389;
    background-color: #fff;
    box-shadow: 0 8px 16px 0 rgba(223, 223, 223, 0.5);

    .inner-box {
      display: flex;
      justify-content: space-between;

      .text-box {
        h3 {
          font-size: 18px;
          font-weight: 600;
          line-height: 1.33;
          color: #00c389;
          margin: 32px 0px 16px 0px;
        }
        p {
          font-size: 16px;
          font-weight: 500;
          line-height: 1.5;
          margin-bottom: 16px;
          color: #777e90;
        }
      }
    }
  }
`;
