import React from 'react';
import { observable, action, configure } from "mobx";

configure({
  enforceActions: 'always',
});

class Cart {
  @observable modified = new Date();
  @observable.shallow items = [];

  @action
  addItem(name, quantity) {
    this.items.push({ name, quantity });
    this.modified = new Date();
  }
  //pre-binds the instance of the class to the method
  //This means you can pass around the reference to  removeItem() and be assured that the  'this'
  //value always points to the instance of the Cart
  @action.bound
  removeItem(name) {
    const item = this.items.find(x => x.name === name);
    if(item) {
      item.quantity -= 1;

      if(item.quantity <= 0) {
        this.items.remove(item)
      }
    }
  }
//使用箭头函数可以达到和action.bound 相同的效果
  @action removeItem2 = (name) => {
    const item = this.items.find(x => x.name === name);
    if(item) {
      item.quantity -= 1;

      if(item.quantity <= 0) {
        this.items.remove(item)
      }
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
