import {GET_HOST_EVENT_STATUS, GET_USER_VOTED_EVENTS_BY_ACCOUNT} from '../constants/ActionTypes';


const initialState = {
    hostedEvent: null,
    votedEvents: []
};

export default function accountAddress(state = initialState, action) {
    switch (action.type) {

        case GET_HOST_EVENT_STATUS :
            return Object.assign({}, state, {
                hostedEvent: action.hostedEvent
            })

        case GET_USER_VOTED_EVENTS_BY_ACCOUNT:
            return Object.assign({}, state, {
                votedEvents: action.votedEvents
            })
        default:
            return state;
    }
}

