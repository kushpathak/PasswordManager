import styled from "styled-components";
export const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* justify-content: center; */
`;
export const Group = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  .error {
    color: red;
    margin-bottom: 10px;
    text-align: center;
  }
`;
export const Form = styled.form`
  border-radius: 10px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  background-color: white;
  font-family: "Poppins", sans-serif;
  width: ${(props) => {
    return props.reduce ? "20%" : "25%";
  }};
  height: fit-content;
  padding: 0px 20px;
  align-items: center;
  .user-label {
    margin-bottom: 10px;
    margin-top: 0px;
    font-size: 17px;
  }
  .form-title {
    font-weight: 400;
    font-size: ${(props) => {
      return props.reduce ? "22px" : "25px";
    }};
    font-family: "Roboto", sans-serif;
    text-align: center;
    color: gray;
    letter-spacing: 0.5px;
  }
  .btn-sign {
    background-color: #0275d8;
    padding: 7px 14px;
    border: none;
    font-size: 16px;
    margin-bottom: ${(props) => {
      return props.space ? props.space : "10px";
    }};
    margin-top: 10px;
    border-radius: 5px;
    color: white;
  }
  .btn-sign:hover {
    cursor: pointer;
  }
  .redirect {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 400;
    color: royalblue;
    font-family: "Poppins", sans-serif;
    text-decoration: none;
  }

  @media (max-width: 1500px) {
    width: 30%;
  }
  @media (max-width: 1100px) {
    width: 40%;
  }
  @media (max-width: 900px) {
    width: 50%;
  }
  @media (max-width: 700px) {
    width: 60%;
  }
  @media (max-width: 550px) {
    width: 90%;
  }
`;
export const Input = styled.input`
  border: 0.5px solid lightgray;
  width: 100%;
  font-size: 16px;
  padding: 7px;
  border-radius: 5px;
  margin-bottom: -10px;
`;
