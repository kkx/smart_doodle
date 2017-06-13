import React, { Component } from 'react';
import Header from './components/header'
import MainSection  from './components/mainSection'
import {
  Link
} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './material_ui_raw_theme_file'


class App extends Component {
  render() {
    return (
    <div>
        <MuiThemeProvider muiTheme={theme}>
        <div>
            <Header title='ETH Doodle'/>
            <MainSection/>
        </div>
        </MuiThemeProvider>
    </div>
    );
  }
}

export default App;
