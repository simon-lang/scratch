https://github.com/denysdovhan/wtfjs

- know how to rewrite redux from scratch
- call, apply, bind
- document load even
- event emitter
- dumb/smart components
- window statechage handlers, history

- https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements
- querySelectorAll, createElement

- Jest
- GraphQL
- Flow
- Prepack
- Relay

Typical project setup:

- Language choice (TS or ES6, Webpack)
- Build tools
- Folder structure ("component" based?)
- HMR / LiveReload
- Unit tests
- Linting

First things I would make if I didn't have a framework:

- Utilities: _.get, _.set, _.debounce, _.throttle, _.memoize, _.merge, _.isTypeX, humanize number, format date, etc
- Templating? lodash, micromustache, etc are basically logic-less
- EventEmitter. Simple
- XHR with Promises (could just use fetch, I suppose)
- Persistent Storage (e.g. LocalStorage wrapper)
- View Engine / Component / Template convention
- Router
- Dispatcher, Store, Reducers

Then...

- Get to work! Prototype, refactor, iterate.

https://medium.com/@stowball/a-dummys-guide-to-redux-and-thunk-in-react-d8904a7005d3
http://redux.js.org/docs/advanced/AsyncActions.html
https://www.reddit.com/r/reactjs/comments/4yesxn/api_calls_in_a_redux_app_best_practice/
https://github.com/paularmstrong/normalizr
