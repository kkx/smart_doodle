import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Subheader from 'material-ui/Subheader';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {push} from 'react-router-redux';
import {Route, Router, Link} from 'react-router-dom'
import {ETHEREUM_CLIENT, CONTRACT} from '../constants/EthDriver';


import {setCurrentAddress} from '../actions/todos';

const styles = {
  selectLable: {
      fontSize: 20
  }
};

class SubHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            addressErrorText: '',
            textFieldValue: ''
        }
    }

    handleTextFieldChange = (e) => {
        this.setState({
            textFieldValue: e.target.value
        });
    }


    handleSubmit = () => {
        if (ETHEREUM_CLIENT.isAddress(this.state.textFieldValue)) {
            this.props.dispatch(push('/event/' + this.state.textFieldValue))
        } else {
            this.setState({addressErrorText: 'Introduced address is not valid'})
        }
    }


    handleOpen = () => {
        this.setState({modalOpen: true});
    };

    handleClose = () => {
        this.setState({modalOpen: false});
    };
    handleSelectChange = (event, index, value) => this.props.actions.setCurrentAddress(value);

    render() {
        const {userAddress, actions} = this.props;

        const modalActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.handleSubmit}
            />
        ];
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-9 col-lg-10">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-2">
                            <Subheader style={styles.selectLable}>Eth Account</Subheader>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10">
                            <DropDownMenu value={userAddress.currentAccountAddress }
                                          onChange={ this.handleSelectChange }>
                                {userAddress.accountAddresses.map(function (object, i) {
                                    return <MenuItem value={object} key={object} primaryText={object}/>
                                })}
                            </DropDownMenu>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-3 col-lg-2">
                    <FloatingActionButton secondary={true} onClick={this.handleOpen}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
                <Dialog
                    title="Add a poll event to participate"
                    modal={false}
                    actions={modalActions}
                    open={this.state.modalOpen}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        hintText="Paste the poll event address/poll event host account address"
                        floatingLabelText="Poll Event Address"
                        fullWidth={true}
                        floatingLabelFixed={true}
                        errorText={this.state.addressErrorText}
                        value={this.state.textFieldValue}
                        onChange={this.handleTextFieldChange}
                    />
                </Dialog>
            </div>
        );
    }
}

SubHeader.propTypes = {
    userAddress: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        userAddress: state.userAddress,
        history: state.history
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        actions: bindActionCreators({setCurrentAddress}, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubHeader);

