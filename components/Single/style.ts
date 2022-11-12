import styled from 'styled-components';

export const SingleContainer = styled.div`
  margin-top: 80px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.33;
    color: #23262f;
    margin-bottom: 26px;
  }

  .single-container {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 28px;

    .item-inner {
      img {
        display: block;
        width: 156px;
        height: 156px;
        border: 2px solid #5e4fff;
        background-color: #fcfcfd;
        margin: 0 auto;
      }
      .info-inner {
        text-align: center;
        padding: 0 0 16px;
        border-radius: 16px;
        border: solid 2px #e6e8ec;

        p:nth-child(1) {
          padding: 4px 17px;
          border-radius: 12px;
          background-color: #e6e8ec;
          color: #141416;
          line-height: 1.5;
          font-size: 16px;
          font-weight: 600;
        }
        p:nth-child(2) {
          margin-top: 14px;
          color: #777e90;
          line-height: 1.5;
          font-size: 16px;
          font-weight: 500;
        }
        p:nth-child(3) {
          margin-top: 4px;
          color: #00c389;
          line-height: 1.5;
          font-size: 16px;
          font-weight: 500;
        }
      }
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
  }
`;
