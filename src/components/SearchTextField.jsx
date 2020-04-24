import React, { Fragment } from 'react';
import {SearchStatus} from './SearchStatus'
import { inject, observer} from 'mobx-react'

//mtui
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment';
//icon
import Search from '@material-ui/icons/Search'


@inject('store')
@observer
 class SearchTextField extends React.Component {
    onKeyUp = event => {
        if (event.keyCode !== 13) {
            return;
        }
        this.props.onEnter();
    }
    render () {
        const { store, onChange} = this.props;
        const { term } = store;

        return (
            <Fragment>
                <TextField
                    placeholder="Search Books..."
                    fullWidth={true}
                    value={term}
                    onChange={onChange}
                    onKeyUp={this.onKeyUp}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        )
                    }}
                />
                <SearchStatus />
            </Fragment>
        )
    }
}

export {SearchTextField}