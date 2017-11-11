const HttpRequest = require('./HttpRequest')

import './routing'

import createStore from './createStore'
import combineReducers from './combineReducers'

import counter from './reducers/counter'
import episodes from './reducers/episodes'

const reducers = combineReducers({ counter, episodes })

const store = createStore(reducers)

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

export default App
