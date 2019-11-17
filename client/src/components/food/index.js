import React, { Component } from 'react';
import { connect } from 'react-redux';
import { foodGetList } from '../../actions/foodActions';
import './index.scss';

class Food extends Component {
  UNSAFE_componentWillMount() {
    this.props.foodGetList();
  }

  render() {
    console.log(this.props);
    return <div className="Food">Food</div>;
  }
}

const mapStateToProps = state => ({
  food: state.food,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  foodGetList,
})(Food);
