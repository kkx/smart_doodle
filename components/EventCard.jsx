import React, {Component, PropTypes} from 'react';
import {push} from 'react-router-redux';
import {
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


class EventCard extends Component {
    constructor(props, context) {
        super(props, context);

    }

    handleVote = () => {
        this.props.dispatch(push('/event/' + this.props.voteEvent.eventAddress))
    }

    handleCreate = () => {
        this.props.dispatch(push('/re-create-event/'))
    }

    render() {
        let {voteEvent, currentAccountAddress} = this.props;
        if (!voteEvent) {
            voteEvent = {}
        }
        console.log(voteEvent)
        return (
            <Card>
                <CardHeader
                    title={ voteEvent.title ? voteEvent.title : 'Event Not Created'}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                { voteEvent.title &&
                <CardText expandable={true}>
                    <Table
                        fixedHeader={true}
                        fixedFooter={true}
                        selectable={false}
                        multiSelectable={false}
                    >
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                            enableSelectAll={false}
                        >
                            <TableRow>
                                <TableHeaderColumn tooltip="Proposal">Proposal</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Votes">Votes</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            deselectOnClickaway={false}
                            showRowHover={true}
                            stripedRows={true}
                        >
                            {voteEvent.proposals.map((row, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn>{row.title}</TableRowColumn>
                                    <TableRowColumn>{row.score}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                        </TableFooter>
                    </Table>
                </CardText>
                }
                <CardActions expandable={true}>
                    {
                        voteEvent.title && !voteEvent.isVoted &&
                        <FlatButton label="Vote" onClick={this.handleVote}/>
                    }
                    { currentAccountAddress === voteEvent.eventAddress &&
                    <FlatButton label="Re-create" onClick={this.handleCreate}/>
                    }
                </CardActions>
            </Card>


        );
    }
}

export default EventCard;


