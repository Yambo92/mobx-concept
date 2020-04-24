import React, {Fragment} from 'react';

import { inject, observer } from 'mobx-react'

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

export const SearchStatus = inject('store')(
    observer(({store}) => {
        const { status, term } = store;
        return (
            <Fragment>
                {status === 'pending' ? (
                    <LinearProgress variant="query"/>
                ) : (
                    null
                )}
                {status === 'failed' ? (
                    <Typography
                        variant="h3"
                        style={{ color: 'red', marginTop: '1rem'}}
                    >
                        {`Failed to fetch results for "${term}"`}
                    </Typography>
                ) : (
                    null
                )}
            </Fragment>
        )
    })
)