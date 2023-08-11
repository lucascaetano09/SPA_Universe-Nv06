export class Router {
  routes = {}
  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes["/"]

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html
      })

    switch (window.location.pathname) {
      case "/":
        document.querySelector("#homeButton").classList.add("focus")
        document.querySelector("#universoButton").classList.remove("focus")
        document.querySelector("#exploracaoButton").classList.remove("focus")
        break
      case "/universo":
        document.querySelector("#homeButton").classList.remove("focus")
        document.querySelector("#universoButton").classList.add("focus")
        document.querySelector("#exploracaoButton").classList.remove("focus")
        break
      case "/exploracao":
        document.querySelector("#homeButton").classList.remove("focus")
        document.querySelector("#universoButton").classList.remove("focus")
        document.querySelector("#exploracaoButton").classList.add("focus")
        break
    }
  }
}
