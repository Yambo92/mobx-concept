import {inject, observer} from 'mobx-react'
import React from 'react';

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Card, CardMedia, CardContent } from '@material-ui/core';

/* 
the use of the  @inject decorator that takes in a function to extract the  store
observable. This gives you a more type-safe approach rather than using a string
property. You will also see that we renamed  store to  searchStore in the extractor
function. Thus, the  store observable is injected with the name  searchStore .
*/
@inject(({store}) => ({ searchStore: store }))
@observer
 class ResultsList extends React.Component {
    render () {
        const { searchStore, style } = this.props;
        const {isEmpty, results, totalCount, status} = searchStore;

        return (
            <Grid spacing={5} container style={style}>
                {isEmpty && status === 'completed' ? (
                    <Grid item xs={12}>
                        <EmptyResults />
                    </Grid>
                ) : null}
                {!isEmpty && status === 'completed' ? (
                    <Grid item xs={12}>
                        <Typography>
                            Showing <strong>{results.length}</strong>
                            of{' '}
                            {totalCount} results.
                        </Typography>
                        <Divider />
                    </Grid>
                ): null}
                {results.map(x => (
                    <Grid item xs={12} key={x.id}>
                        <BookItem book={x} />
                        <Divider />
                    </Grid>
                ))}
            </Grid>
        )
    }
}

export {ResultsList}

function EmptyResults() {
    return (
        <Card>
            <CardContent>
                <Typography variant={"body1"}>No Results</Typography>
            </CardContent>
        </Card>
    );
}

function BookItem({ book }) {
    return (
        <Card
            elevation={0}
            style={{
                flexDirection: 'row',
                display: 'flex',
                padding: '1rem',
            }}
        >
            <CardMedia
                src={book.image}
                component={'img'}
                style={{ height: 200, width: 'auto' }}
            />
            <CardContent>
                <Typography variant={"subtitle1"}>{book.title}</Typography>
                <Typography variant={'subtitle2'}>{book.author}</Typography>
                <Typography
                    variant={'subheading'}
                    style={{ color: 'darkorange' }}
                >
                    {book.rating}★<span style={{ color: 'black' }}>
                        <span>
                            {' from '}
                            <strong>{book.totalRatings}</strong> ratings.
                        </span>
                    </span>
                </Typography>
            </CardContent>
        </Card>
    );
}