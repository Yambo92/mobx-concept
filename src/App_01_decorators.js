import React from 'react';
import { observable, computed } from "mobx";

class Cart {
  @observable.shallow items = [];
  @observable modified = new Date();

  @computed get description() {
    switch (this.items.length) {
      case 0:
        return 'There are no items in the cart';
      case 1:
        return 'There is one item in the cart';
      default:
        return `There are ${this.items.length} items in the cart`;
    }
  }
}



function App() {
  return (
    <div className="App">
     hello
    </div>
  );
}

export default App;
