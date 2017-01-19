import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

import base from '../base';

import sampleFishes from '../sample-fishes';

class App extends React.Component {

  constructor() {
    super();

    this.loadSamples = this.loadSamples.bind(this);
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // getInitialState
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount() {

    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    if (localStorageRef) this.setState({ order: JSON.parse(localStorageRef) });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    const data = JSON.stringify(nextState.order);
    localStorage.setItem(`order-${this.props.params.storeId}`, data);
  }

  addFish(fish) {
    // update ur state
    const fishes = {...this.state.fishes};
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({ fishes });
    // is the same as this.setState({ fishes: fishes });
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="className">
            {
              Object.keys(this.state.fishes)
                .map(key => <Fish key={ key } index={ key } details={ this.state.fishes[key] } addToOrder={ this.addToOrder }/>)
            }
          </ul>
        </div>

        <Order
          fishes={ this.state.fishes }
          order={ this.state.order }
          removeFromOrder={ this.removeFromOrder }
        />

        <Inventory
          fishes={ this.state.fishes }
          addFish={ this.addFish }
          updateFish={ this.updateFish }
          removeFish={ this.removeFish }
          loadSamples={ this.loadSamples }
          storeId={ this.props.params.storeId }/>
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default App;
