import {combineReducers} from 'redux';
import accountAddress from './accountAddress';
import voteEvents from './voteEvents';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
    userAddress: accountAddress,
    voteEvents: voteEvents,
    router: routerReducer
});

export default rootReducer;
