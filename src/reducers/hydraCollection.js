import {FETCH_HYDRA_COLLECTION} from '../actions';

const hydraCollection = (state = {}, action) => {
    switch (action.type) {
        case FETCH_HYDRA_COLLECTION:
            var collection = {...state};

            collection[action.property] = action.collection[0];

            return collection;
        default:
            return state;
    }
};

export default hydraCollection;
