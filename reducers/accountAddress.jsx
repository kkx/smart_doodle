import {SET_CURRENT_ADDRESS, GET_ACCOUNT_ADDRESSES} from '../constants/ActionTypes';

const initialState = {
    currentAccountAddress: '',
    accountAddresses: []
};

export default function accountAddress(state = initialState, action) {
    switch (action.type) {

        case SET_CURRENT_ADDRESS:
            return Object.assign({}, state, {
                currentAccountAddress: action.address
            })


        case GET_ACCOUNT_ADDRESSES:
            return Object.assign({}, state, {
                accountAddresses: action.addresses
            })
        default:
            return state;
    }
}

