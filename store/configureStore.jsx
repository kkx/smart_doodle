import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createHashHistory'
import {routerMiddleware} from 'react-router-redux'

import rootReducer from '../reducers';
import {setCurrentAddress, fetchUserVotedEvents} from '../actions/todos';
import {SET_CURRENT_ADDRESS} from '../constants/ActionTypes';

export const history = createHistory()
const routerMiddle = routerMiddleware(history)


export function configureStore(initialState) {
    const middleware = [thunk, routerMiddle]
    const store = createStore(
        rootReducer,
        applyMiddleware(...middleware),
        window.devToolsExtension ? window.devToolsExtension() : undefined
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    /*
     store.subscribe(function setDefaultAccountAddress() {
     const state = store.getState()
     if ((state.userAddress.accountAddresses) && (!state.userAddress.currentAccountAddress)){
     store.dispatch(setCurrentAddress(state.userAddress.accountAddresses[0]));
     }
     if (store.getState().lastAction === setCurrentAddress){
     store.dispatch(fetchUserHostEvent(state.userAddress.currentAccountAddress));
     store.dispatch(fetchUserVotedEvents(state.userAddress.currentAccountAddress, page=1));
     }

     })*/

    return store;
}
