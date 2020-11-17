import React, { Component } from 'react';

export const UserContext = React.createContext();

class UserContextProvider extends Component {
  state = { faction: null };
  chooseFaction = (faction) => {
    this.setState({ faction });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          chooseFaction: this.chooseFaction,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
