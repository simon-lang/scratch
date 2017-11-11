const html = require('./templates/binding-example.html')
const template = d => html // haha

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
        this.dom.innerHTML = template()
    }
}

export default BindingExample
