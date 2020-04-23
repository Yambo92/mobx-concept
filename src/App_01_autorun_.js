import React from 'react';
import { observable, action, configure, reaction } from "mobx";

configure({
  enforceActions: 'always',
});

class Cart {
  @observable modified = new Date();
  @observable items = [];

  cancelPriceTracker = null;

  trackPriceChangeForItem(name) {
    if(this.cancelPriceTracker) {
      this.cancelPriceTracker();
    }

    this.cancelPriceTracker = reaction(
      () => {// 1. Reaction to track price changes
        const item = this.items.find(x => x.name === name);
        return item ? item.price : null;
      },
      price => {
        console.log(`Price changed for ${name}: ${price !== null ? price : 0}`);
        
      }
    )
  }

  @action
  addItem(name, price) {
    this.items.push({ name, price })
    this.modified = new Date();
  }

  @action
  changePrice(name, price) {
    const item = this.items.find(x => x.name === name);
    if(item){
      item.price = price;
    }
  }

}

const cart = new Cart();
cart.addItem('Shoes', 20);

//2. Now track price for 'Shoes'
cart.trackPriceChangeForItem('Shoes');

//3. Change the price
cart.changePrice('Shoes', 100);
cart.changePrice('Shoes', 80);

function App() {
  return (
    <div className="App">
     hello
    </div>
  );
}

export default App;
