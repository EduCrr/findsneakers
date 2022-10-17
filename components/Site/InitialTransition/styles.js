import styled from "styled-components";

export const Content = styled.div`
  .initalHome {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .initalBg {
      position: relative;
      z-index: 50;
      width: 100%;
      background-color: #000;
    }

    .initialName {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 51;
      text-align: center;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      font-size: 40px;
    }
  }
`;
