
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//Import router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore} from 'react-router-redux';
import configureStore,{ sagaMiddleware } from './store';
//Import Components
import MainContainer from './components/MainContainer';
import Day from './components/Day';
import Week from './components/Week';
import NotFound from './components/NotFound';

import  root  from './sagas/index'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)
sagaMiddleware.run(root);

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={MainContainer}>
                <IndexRoute component={Week}></IndexRoute>
                <Route path="/week/:Id" component={Week}></Route>
                <Route path="/day/:month/:day" component={Day}></Route>
                <Route path="*" component={NotFound}></Route>
            </Route>
        </Router>
    </Provider>
)

ReactDOM.render(router, document.getElementById('root'));