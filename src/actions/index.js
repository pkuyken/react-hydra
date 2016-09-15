import 'whatwg-fetch';
import jsonld from 'jsonld';
import parseLinkHeader from 'parse-link-header';

const options = {
    method: 'GET',
    headers: new Headers({
        'accept': 'application/ld+json'
    }),
    mode: 'cors',
    cache: 'default'
};

export const FETCH_HYDRA_API = 'FETCH_HYDRA_API';
export const FETCH_HYDRA_COLLECTION = 'FETCH_HYDRA_COLLECTION';
export const FETCH_HYDRA_INSTANCE = 'FETCH_HYDRA_INSTANCE';
export const DELETE_HYDRA_INSTANCE = 'DELETE_HYDRA_INSTANCE';

// fetches the endpoint and API
export const fetchApi = endpointUrl =>
    dispatch => fetch(endpointUrl, options)
        .then(endpointResponse => {
            var links = endpointResponse.headers.getAll('Link');
            const apiDocType = "http://www.w3.org/ns/hydra/core#apiDocumentation";
            var apiLink = links.map(l => parseLinkHeader(l)).find((link,index,array) => {
                if (apiDocType in link) {
                    return link;
                }
            });

            return endpointResponse.json()
                .then(endpoint => jsonld.promises.expand(endpoint, {base: endpointUrl}))
                .then(endpoint => {
                    return fetch(apiLink[apiDocType].url, options)
                        .then(apiResponse => apiResponse.json())
                        .then(api => jsonld.promises.expand(api, {base: endpointUrl}))
                        .then(api =>
                            dispatch({
                                type: FETCH_HYDRA_API,
                                endpoint,
                                api
                            })
                        )

                });
        });

// fetches a hydra collection using the specified property of the endpoint
export const fetchCollection = (hydraApi, property) =>
    dispatch => {

        var resourceUrl = hydraApi.endpoint[property][0]['@id'];

        return fetch(resourceUrl, options)
        .then(response => response.json())
        .then(collection => jsonld.promises.expand(collection, {base: hydraApi.endpoint['@id']}))
        .then(collection =>
            dispatch({
                type: FETCH_HYDRA_COLLECTION,
                property,
                collection
            })
        );
    };

// fetches a hydra instance using the specified iri
export const fetchInstance = (hydraApi, iri) =>
    dispatch => {
        return fetch(iri, options)
            .then(response => response.json())
            .then(instance => jsonld.promises.expand(instance, {base: hydraApi.endpoint['@id']}))
            .then(instance =>
                dispatch({
                    type: FETCH_HYDRA_INSTANCE,
                    iri,
                    instance
                })
            );
    };

export const deleteInstance =  (hydraApi, instance) =>
    dispatch => {
        var resource = hydraApi.api['http://www.w3.org/ns/hydra/core#supportedClass']
            .find((item, index, array) => {
                // TODO: dangerous to assume type is always index 0. Restriction of Hydra to single typed resources?
                if (item['@type'][0] === instance['@type'][0]) {
                    return item;
                }
            });

        const iri = instance['@id'];
        return fetch(iri, {...options, method: 'DELETE'})
            .then(instance =>
                dispatch({
                    type: DELETE_HYDRA_INSTANCE,
                    iri,
                    instance
                })
            );
    };