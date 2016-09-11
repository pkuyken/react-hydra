import React from 'react';

// See context at http://www.markus-lanthaler.com/hydra/event-api/contexts/Event.jsonld
const Event = props =>
    <div>
        <h1 property="http://schema.org/name" value={props.instance['http://schema.org/name'][0]['@value']}>{props.instance['http://schema.org/name'][0]['@value']}</h1>
        <h2 property="http://schema.org/description" value={props.instance['http://schema.org/description'][0]['@value']}>{props.instance['http://schema.org/description'][0]['@value']}</h2>
    </div>;

Event.propTypes = {
    instance: React.PropTypes.object
};

export default Event;