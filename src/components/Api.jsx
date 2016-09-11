import React from 'react';
import {connect} from 'react-redux';

import {fetchApi} from '../actions';

class Api extends React.Component {
    static propTypes = {
        dispatch: React.PropTypes.func,
        endpoint: React.PropTypes.string,
        hydraApi: React.PropTypes.object,
        children: React.PropTypes.node
    };

    componentDidMount() {
        this.props.dispatch(fetchApi(this.props.endpoint));
    }

    render() {
        if (!this.props.hydraApi.api) {
            return null;
        }

        return <div vocab={this.props.hydraApi.api['@id']} about={this.props.hydraApi.endpoint['@id']}>
            {this.props.children}
        </div>;
    }
}

const mapStateToProps = state => ({
   hydraApi: state.hydraApi
});

export default connect(mapStateToProps)(Api);