import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchPositions } from '../actions';
import Position from '../components/position';

class PositionsList extends Component {
  componentWillMount() {
    this.fetchPositions(this.props.keyId, this.props.secretKey);
  }

  componentDidMount() {
    this.refresher = setInterval(this.fetchPositions, 5000);
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    clearInterval(this.refresher);
  }

  fetchPositions = () => {
    this.props.fetchPositions(this.props.keyId, this.props.secretKey);
  }

  render () {
    if (!this.props.positions) {
      return (
        <div className="no-position-container">
          <div className="position-title">
            <span>No Positions</span>
          </div>
        </div>
      );
    }
    if (this.props.positions.code === 40110000 || this.props.positions.message === "Failed to fetch") {
      return (
        <div className="position-container">
          <div className="position-title">
            <span>No Positions - verify valid API Key connection</span>
          </div>
        </div>
      );
    }
    return (
      <div className="position-container">
        <div className="position-titles">
          <div className="ticker-box"><strong>Stock</strong></div>
          <div className="current-price"><strong>Price</strong></div>
          <div className="qty"><strong>Quantity</strong></div>
          <div className="market-value"><strong>Market Value</strong></div>
          <div className="unrealized-pl"><strong>Total Profit</strong></div>
        </div>
        <div className="position-content">
          {
            this.props.positions.map((position) => {
              return <Position key={position.asset_id} position={position} />;
            })
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    keyId: state.keyId,
    secretKey: state.secretKey,
    account: state.account,
    positions: state.positions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPositions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionsList);

// <div className="order-buttons-title"><strong>Trade</strong></div>
