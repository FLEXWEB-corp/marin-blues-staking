import styled from 'styled-components'

export const MainContainer = styled.div`
  padding: 120px 160px 70px 160px;

  .crystal-img {
    position: absolute;
    top: 0;
    right: 0;
    object-fit: contain;
    z-index: -1;
  }

  .top-title {
    display: flex;
    align-items: center;
    h1 {
      font-family: Poppins;
      font-size: 40px;
      font-weight: 600;
      color: #23262f;

      span {
        margin: 0px 16px;
        color: #5e4fff;
      }
    }
  }
  .arrow-inner {
    position: relative;
    img {
      cursor: pointer;
    }
  }
`

export const TabModal = styled.div`
  position: absolute;
  left: 40px;
  top: -5px;
  width: 176px;
  height: 128px;
  border-radius: 16px;
  box-shadow: 0 16px 24px 0 rgba(15, 15, 15, 0.2);
  background: #fff;
  z-index: 100;

  .tab-inner {
    display: flex;
    flex-direction: column;
    height: 100%;

    p {
      display: flex;
      align-items: center;
      flex-grow: 1;
      padding: 16px 0px 16px 16px;
      font-size: 24px;
      font-weight: 600;
      line-height: 1.33;
      cursor: pointer;

      :hover {
        border-radius: 16px;
        background-color: #f4f5f6;
      }
    }

    .color {
      color: #5e4fff;
    }
  }
`
