import React from 'react';
import {connect} from 'react-redux';
import {fetchInstance} from '../actions';

class Instance extends React.Component {
    static propTypes = {
        dispatch: React.PropTypes.func,
        hydraApi: React.PropTypes.object,
        hydraInstance: React.PropTypes.object,
        about: React.PropTypes.string,
        children: React.PropTypes.node
    };

    componentDidMount() {
        this.props.dispatch(fetchInstance(this.props.hydraApi, this.props.about));
    }

    render() {
        var instance = this.props.hydraInstance[this.props.about];
        if (!instance) {
            return null;
        }

        return <div about={instance['@id']} typeof={instance['@type'][0]}>
            {React.cloneElement(this.props.children, {instance})}
        </div>
    }
}

const mapStateToProps = state => ({
    hydraApi: state.hydraApi,
    hydraInstance: state.hydraInstance
});

export default connect(mapStateToProps)(Instance);