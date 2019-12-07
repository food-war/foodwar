import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStoreList } from '../../actions/storeActions';
import './index.scss';

class Store extends Component {
  UNSAFE_componentWillMount() {
    this.props.getStoreList();
  }

  render() {
    console.log(this.props);
    return <div className="Store">Store</div>;
  }
}

const mapStateToProps = state => ({
  store: state.store,
  // errors: state.errors,
});

export default connect(mapStateToProps, {
  getStoreList,
})(Store);
