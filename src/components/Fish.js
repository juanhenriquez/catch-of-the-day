import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render() {
    const fish = this.props.details;
    const isAvailable = fish.status === 'available';
    const buttonText = isAvailable ? 'Add to Order' : 'Sold Out!';
    return (
      <li className="menu-fish">
        <img src={ fish.image } alt={ fish.name }/>
        <h3 className="fish-name">
          { fish.name }
          <span className="price">{ formatPrice(fish.price) }</span>
        </h3>
        <p>{  fish.desc}</p>
        <button disabled={ !isAvailable } onClick={ () => this.props.addToOrder(this.props.index)}>{ buttonText }</button>
      </li>
    );
  }
}

Fish.propTypes = {
  details: React.PropTypes.object.isRequired,
  addToOrder: React.PropTypes.func.isRequired,
  index: React.PropTypes.string.isRequired
};

export default Fish;
