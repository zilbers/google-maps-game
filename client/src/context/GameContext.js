import React, { Component } from 'react';

export const GameContext = React.createContext();

class GameContextProvider extends Component {
  state = { distance: null };
  setDistance = (distance) => {
    this.setState({ distance });
  };

  render() {
    return (
      <GameContext.Provider
        value={{
          ...this.state,
          setDistance: this.setDistance,
        }}
      >
        {this.props.children}
      </GameContext.Provider>
    );
  }
}

export default GameContextProvider;
