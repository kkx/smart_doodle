import React, {Component, PropTypes} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {push, goBack} from 'react-router-redux';
import {
    Divider,
    Dialog,
    FlatButton,
    Card,
    CardHeader,
    CardActions,
    CardText,
    TextField
} from 'material-ui';

import {getEventStatusByAddress, vote, createEvent} from '../actions/todos';
import SubHeader from '../components/SubHeader';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import Header from '../components/Header';
import ProgressLoading from '../components/ProgressLoading'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../src/material_ui_raw_theme_file'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading:false,
            eventTitle: '',
            eventProposals: new Array(10).fill(''),
            errorMessage: ''
        }
    }

    componentWillMount() {
        if (!this.props.userAddress.currentAccountAddress) {
            this.props.dispatch(push('/'))
        }
    }

    handleCancel = () => {
        this.props.history.goBack()
    }
    onTextFieldTitleChange = (event) => {
        this.setState({
            eventTitle: event.target.value,
            errorMessage: ''
        })

    }
    onTextFieldChange = (event) => {
        let index = event.target.id.split('textfieldid-')[1];
        let proposals = this.state.eventProposals;
        proposals[index] = event.target.value;
        this.setState({
            eventProposals: proposals,
            errorMessage: ''
        })
    }

    handleSubmit = () => {
        let dispatch = this.props.dispatch
        function waitForTicketMined(txnHash){
            let interval = 1000;
            let count = 0
            let transactionReceiptAsync = function(txnHash, count) {
                    console.log(txnHash)
                    web3.eth.getTransactionReceipt(txnHash, function(error, receipt){
                        console.log(receipt)
                        if (receipt == null) {
                            if (count < 120){
                                count += 1;
                                setTimeout(function () {
                                    transactionReceiptAsync(txnHash, count);
                                }, interval);
                            }
                        } else {
                            dispatch(push('/'))
                        }

                        });
                    }
            transactionReceiptAsync(txnHash, count);
        }   
        let proposals = []
        for (let i = 0; i < this.state.eventProposals.length; i++) {
            if (this.state.eventProposals[i] !== '') {
                proposals.push(this.state.eventProposals[i])
            }
        }
        if (!this.state.eventTitle) {
            this.setState({errorMessage: 'Please provide the title of the poll event'})
        }
        else if (proposals.length <= 1) {
            this.setState({errorMessage: 'Please write down more than 1 option'})
        } else {
            this.setState({isLoading: true})
            createEvent(this.state.eventTitle, proposals, this.props.userAddress.currentAccountAddress, waitForTicketMined)
        }
        
    }


    render() {
        const {userAddress, actions} = this.props;
            
        if (this.state.isLoading){
            return( <ProgressLoading/> )
        }
        return (
            <MuiThemeProvider muiTheme={theme} >
                <Dialog
                    title='Create your poll event'
                    //subtitle='Write down up to 10 options for a poll'
                    //title={"Create poll event for " + this.props..userAddress.currentAccountAddress}
                    //actions={actions}
                    modal={false}
                    open={true}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <Card>
                        <CardHeader
                            title='Write down up to 10 options for a poll'
                            //subtitle='Write down up to 10 options for a poll'
                        />
                        <CardText>
                            <div>
                                <TextField id='eventTitle' hintText="Title" underlineShow={false}
                                           onChange={this.onTextFieldTitleChange}/>
                                <Divider />
                            </div>
                            {this.state.eventProposals.map((ele, index) => (
                                <div key={index}>
                                    <TextField id={'textfieldid-' + index} hintText={"option " + (index + 1) }
                                               key={index} underlineShow={false} onChange={this.onTextFieldChange}/>
                                    <Divider />
                                </div>
                            ))}
                            <div className="error">{ this.state.errorMessage }</div>
                        </CardText>

                        <CardActions>
                            <FlatButton label="Create" onClick={this.handleSubmit}/>
                            <FlatButton label="Cancel" onClick={ this.handleCancel }/>

                        </CardActions>
                    </Card>


                </Dialog>

            </MuiThemeProvider>

        );
    }
}

App.propTypes = {
    userAddress: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    console.log(state)
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
