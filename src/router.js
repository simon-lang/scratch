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

export default addRoute
