import { observable, action, runInAction, computed } from 'mobx'

import { searchBooks } from '../../api/axiosService'

import makeInspectable from 'mobx-devtools-mst';

class BookSearchStore {
    @observable term = '';
    @observable status = '';
    @observable.shallow results = [];
    @observable totalCount = 0;

    @computed
    get isEmpty() {
        return this.results.length === 0;
    }

    @action.bound
    async search() {
        try {
            this.status = 'pending';
            const result = await searchBooks(this.term);
            /* 
            We wrap the code after  await in a  runInAction() to ensure all observables are mutated inside
            an action. This becomes key when we turn on the  enforceActions
            configuration for MobX.
            */
            runInAction(() => {
                this.totalCount = result.total;
                this.results = result.items;
                this.status = 'completed';
            })
        } catch (e) {
            runInAction(() => (this.status = 'failed'))
            console.log(e);
            
        }
    }

    @action.bound
    setTerm(value) {
        this.term = value;
    }
    
   
}
export const bookSearchStore = new BookSearchStore();

makeInspectable(bookSearchStore)