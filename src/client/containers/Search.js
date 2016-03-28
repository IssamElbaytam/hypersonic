import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Search from '../components/Search';
import * as entityActions from '../actions/entity';

function mapStateToProps(state) {
    return {
        applicationDomain: state.applicationDomain,
        entity: state.entity
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(entityActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
