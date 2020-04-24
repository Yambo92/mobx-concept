import React from 'react';
import { observable, autorun, action } from "mobx";

const item = observable({
    name: 'Party Balloons',
    itemId: '1234',
    quantity: 2,
    price: 10,
    coupon: {
    code: 'BIGPARTY',
    discountPercent: 50
    }
})

//set values
item.quantity += 3;
item.name = 'Small Balloons'

console.log(`Buying ${item.quantity} of ${item.name}`);

const count = observable.box(20);
console.log(`Count is ${count.get()}`);

count.set(22)

function App() {
  return (
    <div className="App">
     hello
    </div>
  );
}

export default App;
