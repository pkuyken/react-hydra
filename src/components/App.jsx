import React from 'react';
import Api from './Api';
import Collection from './Collection';
import Event from './Event';

const App = () => (
    <Api endpoint={hydraConfig.endpoint}>
        <Collection property="http://www.markus-lanthaler.com/hydra/event-api/vocab#EntryPoint/events">
            <Event/>
        </Collection>
    </Api>
);

export default App;
