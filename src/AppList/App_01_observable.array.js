import React from 'react';
import { observable, toJS } from "mobx";


const items = observable.array();

console.log(items.length);

items.push({
  name: 'hats', quantity: 40
});

items.unshift({ name: 'Ribbons', quantity: 2 });

items.push({ name: 'balloons', quantity: 1 });

console.log('items: ', items);

const plainArray = toJS(items);
console.log('plainArray: ', plainArray);





function App() {
  return (
    <div className="App">
     hello
    </div>
  );
}

export default App;
