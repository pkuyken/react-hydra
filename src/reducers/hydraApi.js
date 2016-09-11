import {FETCH_HYDRA_API} from '../actions';

const hydraApi = (state = {}, action) => {
    switch (action.type) {
        case FETCH_HYDRA_API:
            return {
                api: action.api[0],
                endpoint: action.endpoint[0]
            };
        default:
            return state;
    }
};

export default hydraApi;
