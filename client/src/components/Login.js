import React from "react";
import { Form, FormContainer, Group, Input } from "./styles/loginStyle";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [user, setUser] = useState({});
  const [userError, setUserError] = useState(null);
  const [passError, setPassError] = useState(null);
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmit = () => {
    setUserError(null);
    setPassError(null);
    axios
      .post(
        "http://localhost:9000/login-user",
        {
          user_id: user.user_id,
          password: user.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        localStorage.setItem("userId", user.user_id);
        context.setUserId(user.user_id);
        navigate("/");
      })
      .catch((e) => {
        const errors = e.response.data;
        Object.keys(errors).forEach((err) => {
          if (err === "user_id") {
            setUserError(errors[err]);
          } else {
            setPassError(errors[err]);
          }
        });
      });
  };
  return (
    <FormContainer>
      <Form reduce="true">
        <h5 className="form-title">Welcome! Please Login</h5>
        <Group>
          <label for="user_id" className="user-label">
            Enter User Id
          </label>
          <Input
            placeholder="Enter User Id"
            onChange={(e) => {
              var prev = user;
              prev.user_id = e.target.value;
              setUser(prev);
            }}
          />
          <p class="error">{userError}</p>
        </Group>
        <Group>
          <label for="password" className="user-label">
            Enter Password
          </label>
          <Input
            placeholder="Enter Password"
            type="password"
            onChange={(e) => {
              var prev = user;
              prev.password = e.target.value;
              setUser(prev);
            }}
          />
          <p class="error">{passError}</p>
        </Group>

        <button
          className="btn-sign"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Login
        </button>
        <p>
          <Link className="redirect" to="/login">
            New User? Sign Up
          </Link>
        </p>
      </Form>
    </FormContainer>
  );
}

export default Login;
