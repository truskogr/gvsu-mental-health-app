import PreferencesStore from "./preferences_store"
import DataStore from "./data_store"

export default class Store {
    public readonly preferences: PreferencesStore
    public readonly data: DataStore

    public constructor(
        preferencesStore: PreferencesStore,
        dataStore: DataStore
    ) {
        this.preferences = preferencesStore
        this.data = dataStore
    }
}