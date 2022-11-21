import styled, { css } from 'styled-components';

export const GroupContainer = styled.div<{ show: boolean }>`
  margin-top: 80px;
  @media (max-width: 480px) {
    display: none;
    @media (max-width: 480px) {
      margin: 0;
      ${props =>
        props.show
          ? css`
              display: block;
            `
          : css`
              display: none;
            `}
    }
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.33;
    color: #23262f;
    margin-bottom: 24px;
  }

  .group-inner {
    .hidden-box {
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      @media (max-width: 480px) {
        display: flex;
      }
      & > p {
        &:nth-of-type(1) {
          font-size: 12px;
          font-weight: 500;
          line-height: 1.67;
          color: #777e90;
        }
        &:nth-of-type(2) {
          font-size: 28px;
          font-weight: 600;
          line-height: 1.43;
          color: #23262f;
        }
      }
    }
    .img-box {
      border-radius: 8px;
      border: solid 2px #e6e8ec;
      @media (max-width: 480px) {
        border-radius: 16px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(5, minmax(160px, 1fr));
        gap: 0 40px;
        border-radius: 8px;
        background-color: #fff;
        padding: 14px 80px;
        @media (max-width: 480px) {
          grid-template-columns: repeat(3, minmax(106px, 1fr));
          padding: 9px 8px 15px;
          border-radius: 16px;
          gap: 8px;
        }
      }
    }

    .mobile-content {
      display: none;
      padding: 16px;

      .field {
        display: flex;
        justify-content: space-between;

        & + .field {
          margin-top: 8px;
        }

        .label {
          font-size: 12px;
          font-weight: 500;
          line-height: 1.67;
          color: #777e90;
        }

        p:last-of-type {
          font-size: 16px;
          font-weight: 600;
          color: #777e90;
        }

        p.price {
          color: #00c389;
        }
      }

      button {
        margin-top: 16px;
      }

      @media (max-width: 480px) {
        display: block;
      }
    }

    .info-box {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 48px;
      list-style: none;
      margin-top: 4px;
      padding: 16px 0;
      border-radius: 8px;
      background-color: #f4f5f6;
      @media (max-width: 480px) {
        display: none;
      }
    }

    .item-box {
      display: flex;
      align-items: center;
      color: #777e90;
      line-height: 1.5;
      font-weight: 600;
      &.active {
        color: #5e4fff;
      }
    }
    .item-box::after {
      width: 1px;
      height: 48px;
      opacity: 0.5;
      background-color: #777e90;
      content: '';
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

  .plus_single_inner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 160px;
    border: solid 2px #5e4fff;
    background-color: #fcfcfd;
    cursor: pointer;
    @media (max-width: 480px) {
      width: 106px;
      height: 106px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      &.plus {
        width: 56px;
        height: 56px;
      }
    }
  }
`;
