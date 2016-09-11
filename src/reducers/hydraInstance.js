import {FETCH_HYDRA_INSTANCE} from '../actions';

const hydraInstance = (state = {}, action) => {
    switch (action.type) {
        case FETCH_HYDRA_INSTANCE:
            var instances = {...state};

            instances[action.iri] = action.instance[0];

            return instances;
        default:
            return state;
    }
};

export default hydraInstance;
