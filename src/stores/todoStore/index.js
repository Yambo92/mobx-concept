import { computed, decorate, observable, autorun, action, comparer, runInAction} from 'mobx'

class Todo {
    @observable title = '';
    @observable done = false;

    constructor(title) {
        this.title = title;
    }
}

class TodoList {
    @observable.shallow todos = [];

    @computed
    get pendingTodos() {
        return this.todos.filter(x => x.done === false);
    }

    @computed
    get completedTodos() {
        return this.todos.filter(x => x.done);
    }

    @computed
    get pendingTodoDescription(){
        const count = this.pendingTodos.length;
        return `${count} ${count === 1 ? 'todo' : 'todos'} remaining`;
    }

    @action
    addTodo(title){
        const todo = new Todo(title);
        this.todos.push(todo);
    }
}

decorate(TodoList, {
    pendingTodos: computed({ name: 'pending-todos'})
})

class TodoManager {
    list = null;
    @observable filter = 'all';
    @observable title = '';

    constructor(list){
        this.list = list;
        autorun(() => {
            console.log(this.list.pendingTodos.length);
            
        })
    }

    @computed
    get visibleTodos() {
        switch (this.filter) {
            case 'pending':
                return this.list.pendingTodos;
            case 'completed':
                return this.list.completedTodos;
            default:
                return this.list.todos;
        }
    }
}

class Contact {
    @observable firstName = '';
    @observable lastName = '';

    get fullName(){
        return `${this.firstName} ${this.lastName}`
    }
}

decorate(Contact, {
    fullName: computed({
        set: function(value) {
            const [firstName, lastName] = value.split(' ');
            this.firstName = firstName;
            this.lastName = lastName;
        },
        equals: comparer.identity
    })
})


class ShoppingCart {
    @observable asyncState = '';
    @observable.shallow items = [];

    @action
    async submit(){
        this.asyncState = 'pending';
        try{
            const response = await this.purchaseItems(this.items);
            runInAction(() => {
                this.asyncState = 'completed'

            })
        } catch(ex) {
            console.log(ex);
            runInAction(() => {
                this.asyncState = 'failed';

            })
            
        }
    }

    purchaseItems(items) {
        return Promise.resolve({});
    }
}