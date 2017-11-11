/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/router.js
const template = id => id // TODO

var routes = {}

function addRoute (path, templateId, controller) {
    routes[path] = {templateId: templateId, controller: controller}
}

var el = null

function router () {
    el = el || document.getElementById('view')
    var url = location.hash.slice(1) || '/'
    var route = routes[url]
    if (el && route.controller) {
        // el.innerHTML = template(route.templateId, new route.controller())
        // temporary solution instead of real templating
        el.querySelectorAll('.view').forEach(view => view.classList.add('hidden'))
        el.querySelector('.view.view-' + route.templateId).classList.remove('hidden')
        const c = new route.controller
        document.title = c.title || 'scratch'
    }
}

window.addEventListener('hashchange', router)
window.addEventListener('load', router)

/* harmony default export */ var src_router = (addRoute);

// CONCATENATED MODULE: ./src/routing.js


src_router('/', 'home', function () {})

src_router('/episodes', 'episodes', function () {
    this.moreText = 'Bacon ipsum...'
})

src_router('/counter', 'counter', function () {
    this.title = 'Counter'
})

src_router('/bindings', 'bindings', function () {
    this.title = 'Bindings'
})

// CONCATENATED MODULE: ./src/createStore.js
const createStore = reducer => {
    let state
    let listeners = []

    const getState = () => state

    const dispatch = action => {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    const subscribe = listener => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    }

    dispatch({})

    return { getState, dispatch, subscribe }
}

/* harmony default export */ var src_createStore = (createStore);

// CONCATENATED MODULE: ./src/combineReducers.js
const combineReducers = reducers => {
    return (state = [], action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                nextState[key] = reducers[key](
                    state[key],
                    action
                )
                return nextState
            },
            {}
        )
    }
}

/* harmony default export */ var src_combineReducers = (combineReducers);

// CONCATENATED MODULE: ./src/reducers/counter.js
/* harmony default export */ var counter = ((state = 0, action = {}) => {
    if (action.type === 'INCREMENT') {
        return state + 1
    }
    return state
});

// CONCATENATED MODULE: ./src/reducers/episodes.js
/* harmony default export */ var episodes = ((state = [], action = {}) => {
    console.log(action)
    if (action.type === 'UPDATE_EPISODE_LIST') {
        return action.payload
    }
    // console.log('episodes', state)
    return state
});

// CONCATENATED MODULE: ./src/App.js
const HttpRequest = __webpack_require__(2)









const reducers = src_combineReducers({ counter: counter, episodes: episodes })

const store = src_createStore(reducers)

class App {
    constructor() {
        console.log('App created')
        this.dom = document.getElementById('app')
        const $ = selector => this.dom.querySelector(selector)
        this.loader = $('.loader')
        this.form = $('.search-form')
        this.input = $('input.term')
        this.counter = $('.counter')
        this.submitButton = $('.submit')
        this.form.addEventListener('submit', event => {
            event.preventDefault()
            this.fetch(this.input.value)
        })
        $('.counter-form').addEventListener('submit', event => {
            event.preventDefault()
            store.dispatch({type: 'INCREMENT'})
        })
        store.subscribe(() => this.render())
    }
    fetch(term = '') {
        console.log('Fetching', term)
        this.loader.classList.remove('hidden')
        const url = 'http://localhost:9200/simpsons/_search?q=' + term
        const opts = {
            onload: (text) => {
                this.loader.classList.add('hidden')
                let d = JSON.parse(text)
                console.log('Fetched', d)
                store.dispatch({
                    type: 'UPDATE_EPISODE_LIST',
                    payload: d.hits.hits.map(hit => hit._source)
                })
            }
        }
        new HttpRequest(url, opts)
    }
    render() {
        const data = store.getState()
        this.counter.innerHTML = data.counter

        if (!('content' in document.createElement('template'))) {
            return
        }
        // let template = require('./templates/product-row.html')
        let template = document.querySelector('#product-row')
        let td = template.content.querySelectorAll('td')
        let tb = document.querySelector('tbody')
        tb.innerHTML = ''
        data.episodes.forEach(d => {
            Object.keys(d).forEach((k, i) => {
                if (td[i]) {
                    td[i].textContent = d[k]
                }
            })
            var clone = document.importNode(template.content, true)
            tb.appendChild(clone)
        })
    }
}

/* harmony default export */ var src_App = (App);

// CONCATENATED MODULE: ./src/bind.js
const html = __webpack_require__(3)
const bind_template = d => html // haha

class BindingExample {
    constructor() {
        this.dom = document.querySelector('.binding-examples')
        this.render()

        var person = {
            name: 'i am an arbitrary object'
        }

        this.name = 'i am a class'

        const hello = function() {
            console.log(this.name)
        }

        const es6hello = () => {
            console.log(this.name)
        }

        this.dom.querySelector('#a').addEventListener('click', hello, ) // button
        this.dom.querySelector('#b').addEventListener('click', es6hello) // class
        this.dom.querySelector('#c').addEventListener('click', hello.bind(person)) // object
        this.dom.querySelector('#d').addEventListener('click', this.methodHello) // button
    }
    methodHello() {
        console.log(this.name)
    }

    render() {
        this.dom.innerHTML = bind_template()
    }
}

/* harmony default export */ var bind = (BindingExample);

// CONCATENATED MODULE: ./src/entry.js
__webpack_require__(1)




window.addEventListener('load', (event) => {
    const app = new src_App()
    app.render()

    new bind()

    // import example from './redux'
    // example()
})

const skills = __webpack_require__(4)
Object.keys(skills).forEach(k => {
    const v = skills[k]
    const s = v.join(', ')
    document.write(k + ': ' + s + '<br>')
})


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

class HttpRequest {
    constructor(url, opts = {}) {
        let request = new XMLHttpRequest()
        request.onload = () => {
            if (request.status === 200) {
                opts.onload(request.responseText)
            }
        }
        if (opts.method === 'POST') {
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        }
        if (opts.method === 'CORS') {
            request.withCredentials = true
        }
        request.open(opts.method || 'GET', url)
        request.send()
    }
    success(data) {
        console.log(data)
    }
}

module.exports = HttpRequest


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<button id=\"a\" name=\"i am a button\">A</button>\n<button id=\"b\" name=\"i am a button\">B</button>\n<button id=\"c\" name=\"i am a button\">C</button>\n<button id=\"d\" name=\"i am a button\">D</button>\n"

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
    current: [
        'Javascript (ES6), TypeScript or Coffeescript if necessary',
        'NodeJS &amp; NPM',
        'Express, WebSockets',
        'AngularJS, Backbone, Underscore JS / Lodash',
        'React, JSX, Redux, Babel',
        'D3, NVD3, Highcharts, Chart.js',
        'Webpack, Babel, Browserify, Uglify, Grunt, Gulp',
        'Git, Gitflow, Semantic Versioning',
        'Jest, Mocha, Chai, Sinon, JSDom, Phantom',
        'LESS, SASS &amp; Stylus',
        'Jade / Pug',
        'Bash, zsh, Make',
        'jQuery (obviously)',
    ],
    software: [
        'Google Chrome',
        'Sublime Text, vim',
        'Github, tig',
        'iTerm2',
        'Spotify',
        'Stack Overflow',
    ],
    previous: [
        'PHP7, Composer, PHPUnit',
        'PHP 5.3, Symfony 1.4, Doctrine, Zend Framework, Code Igniter',
        'MySQL',
        'Apache',
        'ASP .NET (C#)',
        'Microsoft Windows, IIS, SQL Server, Visual Studio 2010',
        'Mercurial (HG), Subversion (SVN)',
        'Java &amp; JSP',
        'Photoshop, Gimp',
        'Google Maps API',
        'Fogbugz, Kiln, JIRA, Bitbucket, Stash',
        'Heroku, Appfog, cPanel, WHM, Nodejitsu',
        'Selenium',
        'Vagrant',
    ],
    some: [
        'MongoDB, Redis',
        'Docker',
        'Symfony2, Laravel',
        'Meteor, Sails, Brunch, Marionette',
        'PhoneGap / Cordova',
    ],
    interested: [
        'Any language other than Javascript',
        'Relay',
        'GraphQL',
        'ElasticSearch',
    ]
}


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map