let path = []

let root1 = document.getElementById('root1')
let node1 = document.getElementById('node1')

let current = node1
while (current !== root1) {
    path.push(Array.prototype.indexOf.call(current.parentNode.childNodes, current))
    current = current.parentNode
}

current = document.getElementById('root2')

path.reverse().forEach(index => {
    current = Array.prototype.slice.call(current.childNodes)[index]
})
console.log(current === document.getElementById('node2'))
