import React from 'react';
import { observable, action, configure, reaction } from "mobx";
/* 
 reaction( tracker-function: () => data, effect-function: (data) => {} ) : Also for
long-running side-effects. It executes the  effect function only when the data
returned by the  tracker function is different. In other words,  reaction() waits
for a change in the observables before any side-effects are run. It also gives
back a  disposer function to cancel the effect prematurely.

*/


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
