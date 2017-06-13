import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import {Provider} from 'react-redux';
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
import {Route, HashRouter, Link} from 'react-router-dom'

import App from '../containers/App';
import VoteEvent from '../components/VoteEvent';
import CreateEvent from '../components/CreateEvent';
import {history, configureStore} from '../store/configureStore';

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


const store = configureStore();

class Wrapper extends Component {
    render() {
        return (
            <Provider store={store}>
                { /* ConnectedRouter will use the store from Provider automatically */ }
                <HashRouter history={history}>
                    <div>
                        <Route path="/event/:vote_address" component={VoteEvent}/>
                        <Route path="/re-create-event/" component={CreateEvent}/>
                        <Route exact path="/" component={App}/>
                    </div>
                </HashRouter>
            </Provider>
        );
    }
}

    
ReactDOM.render(<Wrapper />, document.getElementById('root'));
