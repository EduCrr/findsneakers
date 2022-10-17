import styled from "styled-components";

export const Content = styled.div`
  .filters {
    max-width: 1100px;
    margin: 5rem auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      span {
        margin-right: 25px;
      }
    }
    .active {
      font-weight: bold;
      color: #d7d0be;
    }
  }
  .products {
    max-width: 1100px;
    margin: 2rem auto;
    display: flex;
    gap: 30px;
    flex-wrap: wrap;

    .productSingle {
      transition: all 200ms ease-in;
      width: 31.5%;
      img {
        width: 100%;
        cursor: pointer;
      }
      .info {
        width: 100%;
        h5 {
          margin: 10px 0px 5px 0px;
          font-size: 12px;
        }
      }
      &:hover {
        z-index: 2;
        -webkit-transition: all 200ms ease-in;
        -webkit-transform: scale(1.1);
        -ms-transition: all 200ms ease-in;
        -ms-transform: scale(1.1);
        -moz-transition: all 200ms ease-in;
        -moz-transform: scale(1.1);
        transition: all 200ms ease-in;
        transform: scale(1.1);
      }
    }
  }
  button {
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 0px;
    color: #777;
    font-weight: bold;
    text-transform: uppercase;
    background-color: transparent;
    margin: 2rem auto;
    letter-spacing: 8px;

    &::before {
      content: "";
      position: absolute;
      width: 33px;
      height: 3px;

      background-color: #777;
      margin-top: -30px;
    }
  }
`;
