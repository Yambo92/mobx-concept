import { autorun, reaction, when, observable } from 'mobx'

const disposer1 = autorun(() => {
    /* effect function */ 
})

const disposer2 = reaction(
    () => {
        /* tracking funciton returning data */
    },
    data => {
        /* effect function */
    }
);

const disposer3 = when(
    () => {
        /* predicate function */
    },
    predicate => {
        /* effect function */
    }
);

disposer1();
disposer2();
disposer3();

const profile = observable({
    name: 'Panvan',
    id: 123,
    couponsUsed: 3
});

function sendCounponTrackingAnalytics(id, couponsUsed) {
    /* make network request */
}

autorun(
    () => {
        sendCounponTrackingAnalytics(profile.id, profile.couponsUsed)
    },
    {
        delay: 1000,
        onError(ex){
            removeExcessCoupons(profile.id);
        },
    }
);

function removeExcessCoupons(id){
    
}