import React from 'react';
import {connect} from 'react-redux';
import {deleteInstance} from '../actions';
import frameJsonLd from '../higherOrderComponents/frameJsonLd';

const frame = {
    "@context": {
        "hydra": "http://www.w3.org/ns/hydra/core#",
        "vocab": "http://www.markus-lanthaler.com/hydra/event-api/vocab#",
        "Event": "http://schema.org/Event",
        "name": "http://schema.org/name",
        "bob": "http://schema.org/description",
        "start_date": {
            "@id": "http://schema.org/startDate",
            "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
        },
        "end_date": {
            "@id": "http://schema.org/endDate",
            "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
        }
    },
    "@type": "Event"
};

// See context at http://www.markus-lanthaler.com/hydra/event-api/contexts/Event.jsonld
const Event = props =>
    <div>
        <h1 property="http://schema.org/name" value={props.framed['name']}>{props.framed['name']}</h1>
        <h2 property="http://schema.org/description" value={props.framed['description']}>{props.framed['bob']}</h2>
        <button onClick={e => props.dispatch(deleteInstance(props.hydraApi, props.instance))}>Delete</button>
    </div>;

Event.propTypes = {
    hydraApi: React.PropTypes.object,
    instance: React.PropTypes.object,
    dispatch: React.PropTypes.func
};

const mapStateToProps = state => ({
    hydraApi: state.hydraApi,
    hydraInstance: state.hydraInstance
});

export default frameJsonLd(connect(mapStateToProps)(Event), frame);