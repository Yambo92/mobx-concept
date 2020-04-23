import React from 'react';
import { observable, action, configure, reaction } from "mobx";
import {observer} from 'mobx-react'


// configure({
//   enforceActions: 'always',
// });

const item = observable.box(30);

//1 create the component with observer
const App = observer(() => {
  //2. Read an observable: item
  return <h1>Current Item value = {item.get()}</h1>
});

setTimeout(() => {
  item.set(40)
}, 2000);

export default App;
