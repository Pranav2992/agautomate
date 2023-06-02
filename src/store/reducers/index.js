import { combineReducers } from 'redux';
import apiCallReducers from './apiCallReducers';
import appReducers from './appReducers';

export default combineReducers({
    apiCallReducers,
    appReducers
});