require('./style.styl')

import App from './App'
import BindingExamples from './bind'

window.addEventListener('load', (event) => {
    const app = new App()
    app.render()

    new BindingExamples()

    // import example from './redux'
    // example()
})

const skills = require('./skills')
Object.keys(skills).forEach(k => {
    const v = skills[k]
    const s = v.join(', ')
    document.write(k + ': ' + s + '<br>')
})
