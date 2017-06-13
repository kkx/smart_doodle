import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import EventCard from './EventCard';
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


const styles = {
  block: {
      marginTop: 50
  }
};

class MainSection extends Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        const {voteEvents, userAddress} = this.props;
        console.log(voteEvents)
        return (
            <div>
                <div style={styles.block}>
                    <h2>Your Hosted Poll Event</h2>
                    <EventCard {...this.props} voteEvent={ voteEvents.hostedEvent }
                               currentAccountAddress={ userAddress.currentAccountAddress }/>
                </div>
                <div style={styles.block}>
                    <h2>Your Voted Poll Events</h2>
                    {voteEvents.votedEvents.map((event, index) => (
                        <EventCard {...this.props} key={event.eventAddress} voteEvent={ event }/>
                    ))}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        voteEvents: state.voteEvents,
        userAddress: state.userAddress
    };
}


export default connect(
    mapStateToProps,
    null
)(MainSection)

