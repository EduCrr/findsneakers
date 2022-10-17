import styled from "styled-components";

export const Content = styled.div`
  .titleBackground {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 1100px;
    margin: auto;
    font-size: 210px;
    font-weight: 700;
    color: white;
    letter-spacing: -20px;
    font-family: "Secular One", sans-serif;
    text-shadow: 0px 40px 54px rgb(177 177 177);
  }
  .contentSlider {
    max-width: 1100px;
    border: 0px !important;
    background-color: transparent !important;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    *:focus {
      outline: 0;
      outline: none;
    }

    .more {
      padding: 15px 30px;
      position: relative;
      left: 90%;
      cursor: pointer;
      z-index: 10;
      display: flex;
      width: fit-content;
      margin-right: auto;
      font-weight: bold;
      font-family: "Secular One", sans-serif;
    }

    .singleSlide {
      background-color: transparent;
      border: 0px !important;
      img {
        margin: auto;
      }
    }
  }
  .slick-dots li {
    width: 30px !important;
    height: 5px !important;
    padding: 0;
    cursor: pointer;
  }
  .slick-dots li button {
    font-size: 0;
    line-height: 0;
    display: block;

    padding: 5px;
    cursor: pointer;
    color: transparent;
    border: 0;
    outline: none;
    background: transparent;
    width: 40px !important;
    height: 2px !important;
    padding: 0;
    cursor: pointer;
    background: #c3c1c1;
  }
  .slick-active button {
    background-color: red;
  }
  .slick-dots li button:before {
    content: "" !important;
  }
  .slick-active button {
    background-color: #000000 !important;
  }
`;
