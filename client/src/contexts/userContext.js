import React, { createContext, useState } from "react";
export const UserContext = createContext();
class UserContextProvider extends React.Component {
  state = {
    userId: localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : null,
  };
  setUserId = (id) => {
    localStorage.setItem("userId", id);
    this.setState({
      userId: id,
    });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          setUserId: this.setUserId,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
