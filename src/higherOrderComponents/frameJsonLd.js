import React from 'react';
import jsonld from 'jsonld';

const frameJsonLd = (Component, frame) => {
    class FramedJsonLd extends React.Component {
        state = {framed:{}};

        componentDidMount() {
            jsonld.promises.frame(this.props.instance, frame).then(framed => this.setState({framed: framed['@graph'][0]}))
        }

        render() {
            return <Component {...this.props} {...this.state} />;
        }
    };

    return FramedJsonLd;
};

export default frameJsonLd;
