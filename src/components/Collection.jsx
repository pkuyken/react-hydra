import React from 'react';
import {connect} from 'react-redux';
import {fetchCollection} from '../actions';
import Instance from './Instance';

class Collection extends React.Component {
    static propTypes = {
        dispatch: React.PropTypes.func,
        hydraApi: React.PropTypes.object,
        hydraCollection: React.PropTypes.object,
        property: React.PropTypes.string,
        children: React.PropTypes.node
    };

    componentDidMount() {
        this.props.dispatch(fetchCollection(this.props.hydraApi, this.props.property));
    }

    render() {

        var collection = this.props.hydraCollection[this.props.property];

        if (collection == null) {
            return null;
        }

        return <div about={collection['@id']} typeof={collection['@type'][0]}>
            {
                collection['http://www.w3.org/ns/hydra/core#member'].map(member =>
                    <Instance key={member['@id']} about={member['@id']}>
                        {this.props.children}
                    </Instance>
            )}
        </div>;
    }
}

const mapStateToProps = state => ({
    hydraApi: state.hydraApi,
    hydraCollection: state.hydraCollection
});

export default connect(mapStateToProps)(Collection);