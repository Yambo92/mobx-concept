import React from 'react';
import { observable, action, configure, reaction, when} from "mobx";

class Inventory {
  @observable items = [];
  cancelTracker = null;

  async trackAvailability(name) {
    //1. wait for availability
    //promise中when只接受一个断言函数
   await when(
      () => {
        const item = this.items.find(x => x.name === name);
        return item ? item.quantity > 0 : false;
      }
    );
    //2 execute side-effect
    console.log(`${name} is now avaliable`);
      
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
