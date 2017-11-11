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
