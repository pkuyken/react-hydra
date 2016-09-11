import { combineReducers } from 'redux';
import hydraApi from './hydraApi';
import hydraCollection from './hydraCollection'
import hydraInstance from './hydraInstance'

const hydraApp = combineReducers({
    hydraApi,
    hydraCollection,
    hydraInstance
});

export default hydraApp;