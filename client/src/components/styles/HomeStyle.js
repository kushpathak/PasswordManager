import styled from "styled-components";
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
`;
export const Passwords = styled.div`
  margin-top: -200px;
  height: fit-content;
  width: 30%;
  background-color: white;
  margin-bottom: 20px;
  @media (max-width: 1400px) {
    width: 40%;
  }
  @media (max-width: 1200px) {
    width: 50%;
  }
  @media (max-width: 950px) {
    width: 60%;
  }
  @media (max-width: 750px) {
    width: 70%;
  }
  @media (max-width: 650px) {
    width: 90%;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;
export const PasswordRow = styled.ul`
  /* justify-content: space-around; */
  list-style-type: none;
  font-family: "Poppins", sans-serif;
  .show-pass {
    height: 30px;
    margin-top: auto;
    margin-bottom: auto;
    border: none;
    padding: 0px 20px;
    font-size: 16px;
    border-radius: 5px;
    background-color: #f0ad4e;
    /* flex-basis: 33%; */
  }
  .password {
    margin-top: auto;
    margin-bottom: auto;
  }
  .show-pass {
    /* flex-basis: 33%; */
  }
  .show-pass:hover {
    cursor: pointer;
  }

  .one {
    width: 30%;
  }
  .two {
    width: 40%;
  }
  .three {
    width: 30%;
  }
`;
export const ListItem = styled.li`
  display: inline-block;
  width: 33%;
`;
