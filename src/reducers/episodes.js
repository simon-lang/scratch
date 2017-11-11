export default (state = [], action = {}) => {
    console.log(action)
    if (action.type === 'UPDATE_EPISODE_LIST') {
        return action.payload
    }
    // console.log('episodes', state)
    return state
}
