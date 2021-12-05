import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: black;
`;
export const NavList = styled.ul`
  display: ${(props) => {
    return props.display === "none" ? "none" : "block";
  }};
  list-style-type: none;
  @media (max-width: 650px) {
    display: ${(props) => {
      return props.display === "hide" ? "none" : "block";
    }};
  }
  /* @media (max-width: 450px) {
    margin-right: ${(props) => {
    return props.margin ? "10px" : "0px";
  }};
  } */
`;
export const NavItem = styled.li`
  display: inline-block;
  margin-right: 50px;
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  color: white;
  a {
    color: white;
    text-decoration: none;
  }
  .dropdown-icon {
    width: 40px;
    margin-top: 5px;
  }
  @media (max-width: 450px) {
    margin-right: 15px;

    .dropdown-icon {
      margin-left: 15px;
    }
  }
`;
export const Dropdown = styled.div`
  overflow: hidden;
  max-height: 0px;
  background-color: black;
  display: flex;
  flex-direction: column;
  transition: max-height 0.5s ease-out;
  .drop-item {
    font-size: 18px;
    font-weight: 400;
    margin: 0px;
    margin-bottom: 10px;
    font-family: "Poppins", sans-serif;
    color: white;
    margin-left: auto;
    margin-right: auto;
  }
  .line {
    margin: 0px;
    border: none;
    margin: 2px 0px;
    background-color: gray;
    height: 0.5px;
  }
`;
