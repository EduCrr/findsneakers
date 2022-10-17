import styled from "styled-components";

export const Content = styled.div`
  padding: 20px;
  .align {
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      align-items: baseline;
    }
    svg {
      margin-left: 20px;
    }
  }
  .add {
    display: flex;
    justify-content: flex-end;

    button {
      cursor: pointer;
      background-color: #dc9763;
      padding: 10px 20px;
      border: 0;
      border-radius: 5px;
      color: white;
    }
  }
  .addSlides {
    padding: 0px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      cursor: pointer;
      background-color: #dc9763;
      padding: 10px 20px;
      border: 0;
      border-radius: 5px;
      color: white;
    }
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 1.5rem 0px;
    gap: 5px !important;
    width: 100%;
    .item {
      padding: 0px 2px;
      width: 33%;
      margin-bottom: 20px;
      svg {
        color: white !important;
      }
      img {
        width: 100%;
        height: auto;
        border-radius: 15px;
      }
      .btnsItem {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          margin: 10px 0px;
          padding: 0px 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 220px;
        }

        button {
          cursor: pointer;
          margin-left: 10px;
          background-color: #dc9763;
          padding: 5px;
          border: 0;
          border-radius: 5px;
          color: white;
        }
      }
      .slide {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
        button {
          cursor: pointer;
          background-color: #dc9763;
          padding: 5px;
          border: 0;
          border-radius: 5px;
          color: white;
        }
      }

      .files {
        opacity: 0.5 !important;
      }
    }
  }
  .mediaTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    .title {
      display: flex;
      svg {
        cursor: pointer;
        margin-top: 3px;
        margin-left: 20px;
      }
    }
    .btnsGallery {
      display: flex;
      align-items: center;
      .categoryLibrary {
        margin-right: 20px;

        button {
          cursor: pointer;
          background-color: transparent;
          border: 0;
          outline: 0;
          padding: 0px 10px;
        }
        .active {
          background-color: #dc9763;
          color: white;
          padding: 10px;
          border-radius: 8px;
        }
      }
    }
  }
  .loadMore {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      cursor: pointer;
      background-color: #dc9763;
      padding: 10px 20px;
      border: 0;
      border-radius: 5px;
      color: white;
    }
  }
  .btnPage {
    display: flex;
    justify-content: flex-end;
  }

  @media (max-width: 1100px) {
    .container {
      gap: 0px !important;
      width: 100%;
      justify-content: space-between;
      .item {
        width: 49% !important;
      }
    }
  }
  @media (max-width: 670px) {
    .container {
      .item {
        width: 100% !important;
      }
    }
    .mediaTop,
    .btnsGallery {
      flex-direction: column;
      width: 100% !important;
      .categoryLibrary {
        margin-right: 0px !important;
        width: 100%;
      }
      form input,
      select {
        width: 100% !important;
      }
      .globalSearchInput {
        width: 100%;
        display: flex;
      }
    }

    .mediaTop .title {
      justify-content: space-between;
      width: 100%;
    }
  }

  @media (max-width: 400px) {
    .container {
      .item .btnsItem p {
        max-width: 155px;
      }
    }
  }

  @media (max-width: 350px) {
    .container {
      .item .btnsItem {
        flex-direction: column;
        p {
          max-width: 200px;
        }
      }
    }
  }
`;
export const ShowItens = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
  button {
    cursor: pointer;
    margin-left: 10px;
    background-color: transparent;
    padding: 5px;
    border: 0;
    border-radius: 5px;
    color: white;
  }
`;
