import React from 'react';
import { observable, action, configure, reaction, when} from "mobx";

/* 
when( predicate-function: () => boolean, effect-function: () => {} ) : Useful for
one-off effects. The  predicate function is evaluated anytime its dependent
observables change. It executes the  effect function only when the  predicate
function returns  true .  when() automatically disposes itself after running the
effect function. There is a special form of  when() that only takes in the
predicate function and returns a promise. Use it with  async-await for a simpler
when()

*/

class Inventory {
  @observable items = [];
  cancelTracker = null;

  trackAvailability(name) {
    //1. Establish the tracker with when
    this.cancelTracker = when(
      () => {
        const item = this.items.find(x => x.name === name);
        return item ? item.quantity > 0 : false;
      },
      () => {
        console.log(`${name} is now available`);
        
      }
    )
  }

  @action
  addItem(name, quantity) {
    const item = this.items.find(x => x.name === name);
    if(item) {
      item.quantity += quantity;
    } else {
      this.items.push({ name, quantity })
    }
  }
}

const inventory = new Inventory();

inventory.addItem('Shoes', 0);
inventory.trackAvailability('Shoes');
//When the predicate becomes true,  when() executes the side-effect and automatically disposes itself.
//This is the one-time effect of  when()
//2. add two pairs
inventory.addItem('Shoes', 2);

//3. add one more pair
inventory.addItem('Shoes', 1)

const App = () => {
  return <h1>Current Item value</h1>
};



export default App;
