import * as types from '../constants/ActionTypes';
import Web3 from 'web3'

import {ETHEREUM_CLIENT, CONTRACT} from '../constants/EthDriver';

export function setCurrentAddress(address) {
    return (dispatch, getState) => {
        dispatch({type: types.SET_CURRENT_ADDRESS, address: address});
        fetchUserHostEvent(address).then(act => dispatch(act))
        fetchUserVotedEvents(address).then(act => dispatch(act))
        //fetchUserVotedEvents(address);
    }
}

export function fetchUserAccounts() {
    let accounts = ETHEREUM_CLIENT.eth.accounts;
    return (dispatch, getState) => {
        dispatch({type: types.GET_ACCOUNT_ADDRESSES, addresses: accounts})
        if (accounts.length > 0)
            dispatch(setCurrentAddress(accounts[0]));
    }

}

export async function getEventStatusByAddress(eventAddress, fromAddress = null) {
    let title, isVoted, propsalsList, proposalsScore;
    function getEventStatus(eventAddress, fromAddress=null){
        return new Promise(resolve =>{
            if (fromAddress){
                CONTRACT.eventStatus.call(eventAddress, {from: fromAddress}, function(error, value){ 
                    console.log(value)
                    resolve(value)
                });
            }else{
                CONTRACT.eventStatus.call(eventAddress, function(error, value){ 
                    console.log(value)
                    resolve(value)
                });
            }
        })
    }
    if (fromAddress) {
        let ret = await getEventStatus(eventAddress, fromAddress);
        [title, isVoted, propsalsList, proposalsScore] = ret

    } else {
        let ret = await getEventStatus(eventAddress);
        [title, isVoted, propsalsList, proposalsScore] = ret
    }
    let eventStatus = {
        eventAddress: '',
        title: '',
        isVoted: false,
        proposals: []
    }

    eventStatus.title = ETHEREUM_CLIENT.toUtf8(title);
    eventStatus.eventAddress = eventAddress;
    eventStatus.isVoted = isVoted
    for (let i = 0; i < propsalsList.length; i++) {
        let proposal = ETHEREUM_CLIENT.toUtf8(propsalsList[i])
        if (proposal) {
            eventStatus.proposals.push({
                title: proposal,
                score: ETHEREUM_CLIENT.toDecimal(proposalsScore[i])
            })
        } else {
            break
        }
    }
    console.log(eventStatus)
    return eventStatus
}

export function createEvent(title, proposals, fromAddress, callback) {
    CONTRACT.createEvent(title, proposals, {from: fromAddress, gas: 200000}, function(error, result){
        callback(result)
    })
}

export function vote(eventAddress, proposals, fromAddress, callback) {
    let ret = false;
    if (ETHEREUM_CLIENT.isAddress(eventAddress)) {
        CONTRACT.vote(eventAddress, proposals, {from: fromAddress, gas: 200000}, function(error, result){
            callback(result)
        })
    }
}

export async function fetchUserHostEvent(eventAddress) {
    console.log(eventAddress)
    let eventStatus = await getEventStatusByAddress(eventAddress)
    return (dispatch, getState) => {
        dispatch({type: types.GET_HOST_EVENT_STATUS, hostedEvent: eventStatus})
    }

}

export async function fetchUserVotedEvents(userAddress, page = 1) {
    let events_addresses;
    let events_names;
    function getUserEvents(page, fromAddress){
        return new Promise(resolve =>{
            CONTRACT.getUserEvents(page, {fromAddress: userAddress}, function(error, value){ 
                console.log(value)
                resolve(value)
            });
        })

    }
    [events_addresses, events_names] = await getUserEvents(page, userAddress)
    let events = []
    for (let i = 0; i < events_addresses.length; i++) {
        if (ETHEREUM_CLIENT.isAddress(events_addresses[i]) && ETHEREUM_CLIENT.toDecimal(events_addresses[i]) !== 0) {
            events.push(await getEventStatusByAddress(events_addresses[i], userAddress));
        } else {
            break;
        }
    }
    return (dispatch, getState) => {
        dispatch({type: types.GET_USER_VOTED_EVENTS_BY_ACCOUNT, votedEvents: events})
    }

}

