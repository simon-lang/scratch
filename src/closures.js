export const sayHello = name => console.log('Hello ' + name)

export const sayHelloLater = name => {
    let title = 'Dr. '
    setTimeout(() => {
        sayHello(title + ' ' + name)
    }, 2000)
}
