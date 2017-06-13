import React, {Component, PropTypes} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';

// For Customization Options, edit  or use
// './src/material_ui_raw_theme_file.jsx' as a template.
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../src/material_ui_raw_theme_file'

class App extends Component {
    componentDidMount() {
        console.log(1)
            
        
        let oldCurrentAddress = this.props.userAddress.currentAccountAddress;
        this.props.actions.fetchUserAccounts();
        if (oldCurrentAddress) {
            this.props.actions.setCurrentAddress(oldCurrentAddress);
        }
    }

    render() {
        const {userAddress, actions} = this.props;
        return (
            <div>
                <MuiThemeProvider muiTheme={theme}>
                    <div>
                        <Header/>
                        <div className="main-container">
                                <SubHeader className='sub-header'/>
                                <MainSection className='main-section'/>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

App.propTypes = {
    userAddress: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        userAddress: state.userAddress
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        actions: bindActionCreators(TodoActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
