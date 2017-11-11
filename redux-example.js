import createStore from './createStore'
import combineReducers from './combineReducers'

const counter = (state = 1, action) => {
    if (action.type === 'UP') {
        return state + 1
    }
    return state
}
const party = (state = [], action) => {
    if (action.type === 'ARRIVAL') {
        return [...state, action.name || 'anon']
    }
    return state
}

const reducers = combineReducers({counter, party})
const store = createStore(reducers)

console.log(store.getState())
store.dispatch({type: 'UP'})
console.log(store.getState())
store.dispatch({type: 'UP'})
store.dispatch({type: 'UP'})
store.dispatch({type: 'UP'})
store.dispatch({type: 'ARRIVAL', name: 'simon'})
store.dispatch({type: 'ARRIVAL'})
console.log(store.getState())
