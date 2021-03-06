import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react'
import {SearchTextField} from './components/SearchTextField'
import { ResultsList } from './components/ResultsList'
//mui stuff
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core';



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
        <Header />
        <Grid container>
            <Grid item xs={12}>
              <Paper elevation={2} style={{ padding: '1rem' }}>
                  <SearchTextField
                    onChange={this.updateSearchText}
                    onEnter={store.search}
                    />
              </Paper>
            </Grid>
            <ResultsList style={{ marginTop: '2rem' }} />
        </Grid>
      </Fragment>

    )
  }
}

function Header(){
  return (
    <Typography
      variant="subtitle1"
      color="inherit"
      style={{ marginBottom: 20, textAlign: 'center' }}
    >
      Mobx QuickStart Book store
    </Typography>
  )
}

export default App;
