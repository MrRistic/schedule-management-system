import { createStore, applyMiddleware } from 'redux';


import reducers from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga'


export const sagaMiddleware = createSagaMiddleware()


//TODO middlware
export default function configureStore() {

    return createStore(
        reducers,
        composeWithDevTools(
            applyMiddleware(
                sagaMiddleware

            )
        )
    );
}



// export const history = syncHistoryWithStore(browserHistory, configureStore());

if(module.hot) {
    module.hot.accept('./reducers/',() => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}
