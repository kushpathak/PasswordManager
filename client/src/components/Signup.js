import React from "react";
import { Form, FormContainer, Group, Input } from "./styles/loginStyle";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [user, setUser] = useState({});
  const [userError, setUserError] = useState(null);
  const [passError, setPassError] = useState(null);
  const [cnfError, setCnfError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = () => {
    setPassError(null);
    setCnfError(null);
    setUserError(null);
    if (user.password !== user.cnfPassword) {
      setCnfError("Passwords Dont Match");
    } else {
      setCnfError(null);
    }

    axios
      .post(
        "http://localhost:9000/create-user",
        {
          user_id: user.user_id,
          password: user.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((e) => {
        const err = e.response.data;
        Object.keys(err).forEach((error) => {
          if (error === "user_id") {
            setUserError(err[error]);
          } else {
            setPassError(err[error]);
          }
        });
      });
  };
  return (
    <FormContainer>
      <Form>
        <h5 className="form-title">Welcome! Please Signup</h5>
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
          <p className="error">{userError}</p>
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
          <p className="error">{passError}</p>
        </Group>
        <Group>
          <label for="cnf-password" className="user-label">
            Re Enter Password
          </label>
          <Input
            placeholder="ReEnter Password"
            type="password"
            onChange={(e) => {
              var prev = user;
              prev.cnfPassword = e.target.value;
              setUser(prev);
            }}
          />
          <p className="error">{cnfError}</p>
        </Group>
        <button
          className="btn-sign"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Sign Up
        </button>
        <p>
          <Link className="redirect" to="/login">
            Existing User? Login
          </Link>
        </p>
      </Form>
    </FormContainer>
  );
}

export default Signup;
