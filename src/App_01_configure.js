import React from 'react';
import { observable, action, configure } from "mobx";

configure({
  enforceActions: 'always',
});

const cart = observable({
  items: [],
  modified: new Date(),
});

const addItem = action((name, quantity) => {
  const item = cart.items.find(x => x.name === name);
  if(item) {
    item.quantity += 1
  } else {
    cart.items.push({ name, quantity});
  }
  cart.modified = new Date();
});

const removeItem = action(name => {
  const item = cart.items.find(x => x.name === name);
  if(item) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart.items.remove(item);
    }
    cart.modified = new Date();
  }
});

addItem('balloons', 2)
addItem('paint', 2)
removeItem('paint')
/* 
Since strict-mode is enabled, changing observed observable values outside actions is not allowed
下面两行代码引起报错
*/
cart.items.push({ name: 'test', quantity: 1 });
cart.modified = new Date();



function App() {
  return (
    <div className="App">
     hello
    </div>
  );
}

export default App;
