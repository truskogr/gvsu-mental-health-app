import { observable, action } from "mobx"

export default class PreferencesStore {
    @observable public hasLoggedin: boolean = false

    @action
    public loginUser() {
        this.hasLoggedin = true
    }
}