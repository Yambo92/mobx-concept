import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react'
import {SearchTextField} from '../components/SearchTextField'

//mui stuff
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { observable, computed, action, autorun } from 'mobx'

class DailyPrice {
  @observable start = 0;
  @observable end = 0;

  @computed.struct
  get metrics(){
    const {start, end} = this;
    return {
      delta: end - start,
    };
  }

  @action
  update(start, end) {
    this.start = start;
    this.end = end;
  }
  constructor() {
    autorun(() => {
      const { delta } = this.metrics;
      console.log(`Price Delta = ${delta}`);
      
    })
  }
}

const price = new DailyPrice();
price.update(0, 10)
price.update(10, 20)
price.update(20, 30)




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
