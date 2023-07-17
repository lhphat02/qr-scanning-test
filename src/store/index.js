import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer); // Create a Redux store holding the state of your app.

export default store; // You can optionally specify the initial state as the second argument to createStore(). This is useful for hydrating the state of the client to match the state of a Redux application running on the server.
