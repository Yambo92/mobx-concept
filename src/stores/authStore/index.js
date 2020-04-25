import { observable, action, flow, configure } from 'mobx' 

configure({ enforceActions: 'always'})

class AuthStore {
    @observable loginState = '';
    @action.bound
    async login(username, password) {
        this.loginState = 'pending'
        await this.initializeEnvironment();
        this.loginState = 'initialized'
        await this.serverLogin(username, password)
        this.loginState = 'completed'
        await this.sendAnalytics();
        this.loginState = 'reported'
    }
    async initializeEnvironment(){}
    async serverLogin(username, password) {}
    async sendAnalytics() {}
}

class AuthStore2 {
    @observable loginState = '';
    login = flow(function* (username, password) {
        this.loginState = 'pending';

        yield this.initializeEnvironment();

        this.loginState = 'initialized'

        yield this.serverLogin(username, password);

        this.loginState = 'completed';

        yield this.sendAnalytics();

        this.loginState = 'reported';

        yield this.delay(3000)
    })
}

cosnt promise = new AuthStore2().login();
promise.cancel();