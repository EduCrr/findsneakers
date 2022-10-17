import styled from "styled-components";

export const Content = styled.div`
  max-width: 1100px;
  margin: 2rem auto;
  display: flex;
  position: relative;
  .logo {
    flex: 1;
    font-weight: 700;
  }
  .menuSite {
    ul {
      display: flex;
      li {
        list-style-type: none;
        margin-left: 20px;
        a {
          font-weight: 700;
          font-size: 16px;
          color: #b3b3b3;
        }
      }
    }
    .linkActive a {
      color: #d7d0be;
    }
  }
`;
