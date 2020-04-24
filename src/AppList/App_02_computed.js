import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react'
import {SearchTextField} from '../components/SearchTextField'

//mui stuff
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { observable, computed, decorate } from 'mobx'

//1. using @computed
class Cart {
  @observable.shallow items = [];

  @computed
  get hasItems() {
    return this.items.length > 0;
  }
}

//2. using decorate()
class Cart2 {
  items = [];
  get hasItems(){
    return this.items.length > 0;
  }
}
decorate(Cart2, {
  items: observable.shallow,
  hasItems: computed
})

//3 using computed()
const cart = new Cart();

const isCartEmpty = computed(() => {
  return cart.items.length === 0;
});

console.log(isCartEmpty.get());
const disposer = isCartEmpty.observe(change => console.log(change.newValue))

/* 
 inject('store') , also part of the  mobx-react package. This
creates a HOC that binds the  store observable to the React component. This
means that, inside the  render() of the  App component, we can expect a  store
property to be available on the  props 
*/
@inject('store')
@observer
class App extends React.Component {

  updateSearchText = event => {
    this.props.store.setTerm(event.target.value)
  }
  render () {
    const { store } = this.props;
    return (
      <Fragment>
        {/* <Header /> */}
        <Grid container>
            <Grid item xs={12}>
              <Paper elevation={2} style={{ padding: '1rem' }}>
                  <SearchTextField
                    onChange={this.updateSearchText}
                    onEnter={store.search}
                    />
              </Paper>
            </Grid>
            {/* <ResultsList style={{ marginTop: '2rem' }} /> */}
        </Grid>
      </Fragment>

    )
  }
}



export default App;
