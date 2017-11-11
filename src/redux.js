import configureStore from './configureStore'

import { RSAA } from 'redux-api-middleware'; // RSAA = '@@redux-api-middleware/RSAA'

export default () => {
    console.log('OK')
    const store = configureStore()

    const codes = [200, 404, 500, 504]
    codes.forEach(code => {
        store.dispatch({
            [RSAA]: {
                endpoint: '/api/' + code,
                method: 'GET',
                types: ['REQUEST', 'SUCCESS', 'FAILURE']
            }
        })
    })
}
