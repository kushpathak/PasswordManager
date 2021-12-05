import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import Passwords from "../../../server/models/Passwords";
import { UserContext } from "../contexts/userContext";
import {
  HomeContainer,
  ListItem,
  PasswordRow,
  Passwords,
} from "./styles/HomeStyle";
import { FormContainer, Form, Group, Input } from "./styles/loginStyle";

const Home = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState(null);
  const [user, setUser] = useState({});
  const [actualPass, setActualPass] = useState({});
  const [passError, setPassError] = useState(null);
  const [reload, setReload] = useState(null);
  const context = useContext(UserContext);
  //   const [btn, setBtn] = useState({});
  useEffect(() => {
    console.log("here");
    axios
      .get("http://localhost:9000/all-ids", {
        params: {
          user_id: context.userId,
        },
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        setPasswords(res.data);
      })
      .catch((e) => {
        if (e.response && e.response.data === "Not Logged In") {
          navigate("/login");
        }
      });
  }, [reload]);
  const handleAddPassword = () => {
    axios
      .post(
        "http://localhost:9000/add-password",
        {
          user_id: context.userId,
          title: user.key,
          password: user.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res);
        setReload(1 - reload);
      })
      .catch((e) => {
        if (e.response && e.response.data === "Not Logged In") {
          navigate("/login");
        }
        console.log(e);
      });
  };
  const fetchPass = (title) => {
    axios
      .get("http://localhost:9000/get-password", {
        params: {
          user_id: context.userId,
          title,
        },
        withCredentials: true,
      })
      .then((res) => {
        var prev = actualPass;
        prev[`${title}`] = res.data.password;
        setActualPass(prev);
        setReload(1 - reload);
      })
      .catch((e) => {
        if (e.response && e.response.data === "Not Logged In") {
          navigate("/login");
        }
      });
  };

  const displayIds = () => {
    if (passwords) {
      const res = passwords.map((password) => {
        return (
          <PasswordRow>
            <ListItem className="one">
              <p className="header">{password.title}</p>
            </ListItem>
            <ListItem className="two">
              <div className="password">
                {actualPass[password.title]
                  ? actualPass[password.title]
                  : "**************"}
              </div>
            </ListItem>
            <ListItem className="three">
              <button
                className="show-pass"
                onClick={() => {
                  fetchPass(password.title);
                }}
              >
                Show
              </button>
            </ListItem>
          </PasswordRow>
        );
      });
      return <Passwords>{res}</Passwords>;
    } else {
      return <></>;
    }
  };
  return (
    // <HomeContainer>
    <>
      <FormContainer>
        <Form reduce="true" space="35px">
          <h5 className="form-title">Add a new password</h5>
          <Group>
            <label for="user_id" className="user-label">
              Enter Key value
            </label>
            <Input
              placeholder="Enter key"
              onChange={(e) => {
                var prev = user;
                prev.key = e.target.value;
                setUser(prev);
                //   console.log(user);
              }}
            />
            <p class="error"></p>
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
              handleAddPassword();
            }}
          >
            Add Password
          </button>
        </Form>
      </FormContainer>
      <HomeContainer>{displayIds()}</HomeContainer>
    </>
  );
};

export default Home;
