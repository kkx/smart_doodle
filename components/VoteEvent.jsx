import React, {Component, PropTypes} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {push, goBack} from 'react-router-redux';

import {
    Dialog,
    FlatButton,
    Card,
    CardHeader,
    CardActions,
    CardText,
    Table,
    TableBody,
    TableHeader,
    TableFooter,
    TableRow,
    TableHeaderColumn,
    TableRowColumn
} from 'material-ui';

import {getEventStatusByAddress, vote} from '../actions/todos';
import SubHeader from '../components/SubHeader';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import Header from '../components/Header';
import ProgressLoading from '../components/ProgressLoading'

// For Customization Options, edit  or use
// './src/material_ui_raw_theme_file.jsx' as a template.
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../src/material_ui_raw_theme_file'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading:false,
            voteEvent: null,
            votedProposals: [],
            errorMessage: ''
        }
    }

    componentWillMount() {

        if (!this.props.userAddress.currentAccountAddress) {
            this.props.dispatch(push('/'))
        }
        getEventStatusByAddress(this.props.match.params.vote_address, this.props.userAddress.currentAccountAddress).then(
            result => this.setState({voteEvent: result})
        )

    }

    handleCancel = () => {
        this.props.history.goBack()
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

        if (this.state.votedProposals.length === 0) {
            this.setState({errorMessage: 'Please select some options'})
        } else {
            console.log(this.state.voteEvent)

            this.setState({isLoading: true})
            vote(this.state.voteEvent.eventAddress, this.state.votedProposals, this.props.userAddress.currentAccountAddress, waitForTicketMined)
        }
        //this.props.dispatch(push('/'))
    }
    onRowSelection = (rows) => {
        console.log(this.props)
        let selected_proposals = []
        for (let i = 0; i < rows.length; i++) {
            selected_proposals.push(this.state.voteEvent.proposals[rows[i]].title)
        }
        this.setState({
            errorMessage: '',
            votedProposals: selected_proposals
        })
    }


    render() {
        const {userAddress, actions} = this.props;

        if (this.state.isLoading){
            return( <ProgressLoading/> )
        }
        return (
            <MuiThemeProvider muiTheme={theme}>
                <Dialog
                    title={"Vote for " + this.props.match.params.vote_address }
                    //actions={actions}
                    modal={false}
                    open={true}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <Card>
                        <CardHeader
                            title={ this.state.voteEvent && this.state.voteEvent.title ? this.state.voteEvent.title : 'Event Not Existed'}
                        />
                        { this.state.voteEvent && this.state.voteEvent.title &&
                        <CardText>
                            <Table
                                fixedHeader={true}
                                fixedFooter={true}
                                selectable={true}
                                multiSelectable={true}
                                onRowSelection={this.onRowSelection}
                            >
                                <TableHeader
                                    displaySelectAll={false}
                                    adjustForCheckbox={true}
                                    enableSelectAll={false}
                                >
                                    <TableRow>
                                        <TableHeaderColumn tooltip="Proposal">Proposal</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="Votes">Votes</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={true}
                                    deselectOnClickaway={false}
                                    showRowHover={true}
                                    stripedRows={true}
                                >
                                    {this.state.voteEvent.proposals.map((row, index) => (
                                        <TableRow key={row.title}>
                                            <TableRowColumn>{row.title}</TableRowColumn>
                                            <TableRowColumn>{row.score}</TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter adjustForCheckbox={true}>

                                    <div className="error">{ this.state.errorMessage }</div>
                                </TableFooter>
                            </Table>
                        </CardText>
                        }
                        <CardActions>
                            {
                                this.state.voteEvent && this.state.voteEvent.title &&
                                <FlatButton
                                    label={ !this.state.voteEvent.isVoted ? "Submit your votes" : "You have already voted"}
                                    onClick={this.handleSubmit} disabled={this.state.voteEvent.isVoted}/>
                            }
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
