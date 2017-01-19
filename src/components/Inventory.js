import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {

  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.state = { uid: null, owner: null };
  }

  componentDidMount() {
    base.onAuth(user => {
      if (user) {
        this.authHandler(null, { user });
      }
    });
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    }
    this.props.updateFish(key, updatedFish);
  }

  authenticate(provider) {
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout () {
    base.unauth();
    this.setState({ uid: null });
  }

  authHandler(err, authData) {
    if (err) {
      console.error(err);
      return;
    }

    // Grab the store info.
    const storeRef = base.database().ref(this.props.storeId);

    // Query the database once for the store data.
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // Claim it as our own if there is no owner already
      if (!data.owner) {
        storeRef.set({ owner: authData.user.uid });
      }

      this.setState({ uid: authData.user.uid, owner: data.owner || authData.user.uid });
    });

  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github"
          onClick={ () => this.authenticate('github')}>Log In With Gihub</button>
        <button className="facebook"
          onClick={ () => this.authenticate('facebook')}>Log In With Facebook</button>
        <button className="twitter"
          onClick={ () => this.authenticate('twitter')}>LogIn With Twitter</button>
      </nav>
    );
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={ key }>

        <input name="name" type="text" value={ fish.name } placeholder="Fish Name"
          onChange={ e => this.handleChange(e, key) }/>

        <input name="price" type="text" value={ fish.price } placeholder="Fish Price"
        onChange={ e => this.handleChange(e, key) }/>

        <select name="status" type="text" value={ fish.status }
            onChange={ e => this.handleChange(e, key) }>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea name="desc" value={ fish.desc } placeholder="Fish Desc"
          onChange={ e => this.handleChange(e, key) }></textarea>

        <input name="image" value={ fish.image } type="text" placeholder="Fish Image"
          onChange={ e => this.handleChange(e, key) }/>

        <button onClick={ () => { this.props.removeFish(key) }}>Remove Fish</button>
      </div>
    );
  }

  render() {
    const logoutButton = <button onClick={ this.logout }>Log Out!</button>;

    // Check if they are not logged in at all.
    if (!this.state.uid) {
      return <div>{ this.renderLogin() }</div>
    }

    // Check if they are the owner of the current store.
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store!</p>
          { logoutButton }
        </div>
      );
    }

    return (
      <div>
        <h2>Inventory</h2>
        { logoutButton }
        { Object.keys(this.props.fishes).map(this.renderInventory) }
        <AddFishForm addFish={ this.props.addFish }/>
        <button onClick={ this.props.loadSamples }>Load Sample Fishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
};

export default Inventory;
