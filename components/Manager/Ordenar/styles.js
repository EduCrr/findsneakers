import styled from "styled-components";

export const Content = styled.div`
  position: absolute;
  max-height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .modal {
    text-align: center;
    height: auto;
    width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-y: scroll;
    .contentModal {
      display: flex;
      height: inherit;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 50px;
    }
    h4 {
      margin-bottom: 20px;
    }
    button.bt {
      display: flex !important;
    }
    .close-modal {
      position: absolute;
      top: 0px;
      right: 1rem;
      font-size: 3.5rem;
      color: white;
      cursor: pointer;
      border: none;
      background: none;
    }
  }

  @media (max-width: 600px) {
    .modal {
      max-width: 300px;
    }
  }
`;
