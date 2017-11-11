document.getElementById('app').addEventListener('click', function(event) {
    var clickedEl = event.target
    if(clickedEl.tagName === 'BUTTON') {
       var listItem = clickedEl.parentNode
       listItem.parentNode.removeChild(listItem)
    }
})
