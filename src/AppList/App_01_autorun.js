import React from 'react';
import { observable, action, configure, autorun } from "mobx";
/* 
autorun( effect-function: () => {} ) : Useful for long-running side-effects. The
effect function executes immediately and also anytime the dependent
observables (used within it) change. It returns a  disposer function that can be
used to cancel anytime.

*/
configure({
  enforceActions: 'always',
});

class Cart {
  @observable modified = new Date();
  @observable.shallow items = [];

  cancelAutorun = null;

  constructor () {
    this.cancelAutorun = autorun(() => {
      console.log(`Items in Cart: ${this.items.length}`);
    });
  }

  @action
  addItem(name, quantity) {
    this.items.push({ name, quantity});
    this.modified = new Date();
  }
}

const cart = new Cart();
cart.addItem('Power Cable', 1)
//the return-value of  autorun() is a function that is in fact a  disposer-function
//By calling it, you can cancel the  autorun() side-effect.
cart.cancelAutorun();
cart.addItem('Shoes', 1)


function App() {
  return (
    <div className="App">
     hello
    </div>
  );
}

export default App;
