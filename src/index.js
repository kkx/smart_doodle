import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom'
//import { Router, Route, hashHistory } from 'react-router'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import App from './App';
import voteEvent from './components/voteEvent';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render((
    <Router >
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/poll/:address" component={voteEvent}/>
        </div>
    </Router>
), document.getElementById('root'))

registerServiceWorker();
