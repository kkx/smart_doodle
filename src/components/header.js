import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

import {
  Link
} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <AppBar
        title={this.props.title} titleStyle={{textAlign: "center"}}
        showMenuIconButton={false}
      />
    );
  }
}

export default App;
