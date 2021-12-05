import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Container,
  Dropdown,
  Nav,
  NavItem,
  NavList,
} from "./styles/navbarStyle";
import Hamburger from "../images/hamburger.png";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import axios from "axios";

const Navbar = () => {
  const [loginState, setLoginState] = useState("Login");
  const [signupState, setSignupState] = useState("Sign Up");
  const context = useContext(UserContext);
  useEffect(() => {
    function handleDrop() {
      const ele = document.getElementById("dropdown");
      if (window.innerWidth > 650) {
        ele.style.maxHeight = "0px";
      }
    }
    axios
      .get("http://localhost:9000/status", {
        withCredentials: true,
      })
      .then((res) => {})
      .catch((e) => {
        localStorage.setItem("userId", null);
        context.setUserId(null);
      });
    window.addEventListener("resize", handleDrop);
    return () => {
      window.removeEventListener("resize", handleDrop);
    };
  }, []);
  useEffect(() => {
    // console.log(context);
    if (context.userId) {
      setLoginState("Log Out");
      setSignupState("Add Password");
    } else {
      setLoginState("Log In");
      setSignupState("Sign Up");
    }
  }, [context]);
  const handleDropdown = () => {
    const dropdown = document.getElementById("dropdown");
    if (dropdown.style.maxHeight === "80px") {
      dropdown.style.maxHeight = "0px";
    } else {
      dropdown.style.maxHeight = "80px";
    }
  };
  const handleLogout = () => {
    if (loginState === "Log In") {
      return;
    } else {
      axios
        .post(
          "http://localhost:9000/logout",
          {},
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          // console.log(res);
          localStorage.setItem(context.userId, null);
          context.setUserId(null);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };
  return (
    <>
      <Container>
        <Nav>
          <NavList margin="true">
            <NavItem>Password Manager</NavItem>
          </NavList>
          <NavList display="hide">
            <NavItem>
              <Link
                to={loginState === "Log Out" ? "" : "/login"}
                onClick={() => {
                  handleLogout();
                }}
              >
                {loginState}
              </Link>
            </NavItem>
            <NavItem>
              <Link to={signupState === "Add Password" ? "" : "/signup"}>
                {signupState}
              </Link>
            </NavItem>
          </NavList>
          <NavList display="none">
            <NavItem>
              <img
                src={Hamburger}
                className="dropdown-icon"
                onClick={() => {
                  handleDropdown();
                }}
              ></img>
            </NavItem>
          </NavList>
        </Nav>
        <Dropdown id="dropdown">
          <h5 className="drop-item">Login</h5>
          <hr class="line" />
          <h5 className="drop-item">Sign Up</h5>
        </Dropdown>
      </Container>
      <Outlet />
    </>
  );
};

export default Navbar;
