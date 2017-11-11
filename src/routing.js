import addRoute from './router'

addRoute('/', 'home', function () {})

addRoute('/episodes', 'episodes', function () {
    this.moreText = 'Bacon ipsum...'
})

addRoute('/counter', 'counter', function () {
    this.title = 'Counter'
})

addRoute('/bindings', 'bindings', function () {
    this.title = 'Bindings'
})
