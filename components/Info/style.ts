import styled from 'styled-components';

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px 0;

  @media (max-width: 480px) {
    justify-content: center;
  }

  & .quest-box,
  & .status-box,
  & .event-box {
    width: 353px;
    height: 532px;
    border-radius: 24px;
  }

  .quest-box {
    position: relative;
    background: url('/images/img-unlock-bg.webp');
    padding: 24px 8px 8px;

    &.collapse {
      height: auto;
      .content {
        display: none;
      }

      svg {
        transform: rotate(180deg);
      }
    }

    .top {
      padding-left: 16px;

      svg {
        position: absolute;
        top: 16px;
        right: 16px;
        display: none;
        transition: 500ms;
        cursor: pointer;

        @media (max-width: 480px) {
          display: block;
        }
      }
    }

    h2 {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.56;
      color: #fcfcfd;
    }

    .description {
      margin: 16px 0 64px;
      font-size: 12px;
      line-height: 1.67;
      color: #e6e8ec;
      white-space: pre-wrap;
    }

    .content {
      padding: 20px 13px;
      border-radius: 20px;
      background-color: #fff;

      .progress {
        display: flex;
        align-items: center;
        gap: 0 6px;

        .separator {
          width: 34px;
          height: 2px;
          border-radius: 100px;
          background-color: #e6e8ec;
        }
      }

      .step {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 8px 8px 16px;
        border-radius: 12px;
        background-color: #f4f5f6;

        &:not(:first-child) {
          margin-top: 8px;
        }
      }
    }
  }

  .status-box {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px 11px 10px 10px;
    border-radius: 24px;
    background-color: #fff;
    color: #141416;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

    &.collapse {
      padding: 24px 11px 28px 10px;
      .title-head {
        margin: 0;
      }
      .status-list {
        display: none;
      }

      svg {
        transform: rotate(180deg);
      }
    }

    @media (max-width: 480px) {
      height: auto;
      order: 1;
    }

    .title-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > svg {
        display: none;
        margin-right: 13px;
        cursor: pointer;
        transition: 0.5s;
      }
      @media (max-width: 480px) {
        margin-bottom: 24px;

        svg {
          display: block;
        }
      }
    }
    h2 {
      margin-left: 16px;
      font-weight: 600;
      font-size: 18px;
      line-height: 1.56;
    }

    .status-list {
      display: flex;
      flex-wrap: wrap;
      border-collapse: collapse;

      h2 {
        color: #141416;
        font-weight: 600;
      }
      & > div {
        width: 50%;
        height: 175px;
        padding: 16px;
        /* border: solid 2px #e6e8ec; */
        border-top: 1px solid #e6e8ec;
        border-left: 1px solid #e6e8ec;
        background-color: #fff;

        &:nth-child(2n) {
          border-right: 1px solid #e6e8ec;
        }

        &:nth-of-type(1) {
          border-top-left-radius: 16px;
        }
        &:nth-of-type(2) {
          border-top-right-radius: 16px;
        }
        &:nth-of-type(3) {
          border-bottom-left-radius: 16px;
        }
        &:nth-of-type(4) {
          border-bottom-right-radius: 16px;
        }

        &:nth-of-type(3),
        &:nth-of-type(4) {
          border-bottom: 1px solid #e6e8ec;
        }

        .head {
          display: flex;
          align-items: center;
          gap: 0 8px;
          font-size: 14px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.71;
          letter-spacing: normal;
          color: #777e90;
        }

        &:nth-of-type(3) {
          .head {
            gap: 0 7px;
          }
        }
        &:nth-of-type(4) {
          .head {
            gap: 0 6px;
          }
        }

        .content {
          .count {
            margin: 35px 0 20px;
            text-align: right;
            font-size: 24px;
            font-weight: 600;
            line-height: 1.33;
          }
        }
      }
    }
  }
  .event-box {
    position: relative;
    padding: 32px 0 0 40px;
    background: url('/images/event-banner.webp');
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #a184fb;
    background-size: contain;
    background-position: 100% 100%;

    h1 {
      margin-bottom: 32px;
      font-size: 40px;
      font-weight: 600;
      line-height: 1.2;
      color: #fcfcfd;
    }

    .date {
      font-weight: 600;
      color: #fcfcfd;
    }
  }

  .modal-title {
    font-size: 32px;
    font-weight: 600;
    color: #23262f;
    line-height: 1.25;
  }

  .description {
    margin: 32px 0;
    font-size: 16px;
    line-height: 1.5;
    color: #777e90;
  }

  .claim-btn {
    margin-bottom: 8px;
  }
`;
