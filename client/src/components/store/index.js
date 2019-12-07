import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStoreList } from '../../actions/storeActions';
import StoreList from './StoreList';
import './index.scss';

class StoreContainer extends Component {
  UNSAFE_componentWillMount() {
    this.props.getStoreList();
  }

  render() {
    console.log(this.props);
    return (
      <div className="StoreContainer">
        <StoreList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state.store,
  // errors: state.errors,
});

export default connect(mapStateToProps, {
  getStoreList,
})(StoreContainer);
