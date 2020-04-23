import React from 'react';
import { observable } from "mobx";

const twitterUserMap = observable.map();

console.log(twitterUserMap.size);

twitterUserMap.set('pavanpodila', 'Pavan Podila')
twitterUserMap.set('mweststrate', 'Michel Weststrate')

console.log(twitterUserMap.get('pavanpodila'));
console.log(twitterUserMap.has('mweststrate'));

twitterUserMap.forEach((value, key) => console.log( `${key}: ${value}`))



function App() {
  return (
    <div className="App">
     hello
    </div>
  );
}

export default App;
