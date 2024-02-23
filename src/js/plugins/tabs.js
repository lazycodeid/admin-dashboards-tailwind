class LazyTabs {
    constructor(el) {
        this.el = el
        this.toggle = el.querySelectorAll("[lazy-tab]")
        this.content = document.querySelector(`[lazy-tabs-content=${this.el.getAttribute("lazy-tabs")}]`)
        this.current = Array.from(this.toggle).find((element) => element.classList.contains("is-active"))
        this.#init()
    }

    #init(){
        if(!this.content) return
        this.toggle.forEach((el)=> {
            el.addEventListener("click", () => this.#open(el))
        })

        this.#open(this.current)
    }

    #open(el){
        if(!el) return
        this.content.querySelector(`${el.getAttribute("lazy-tab")}[role=tabpanel]`).classList.remove("hidden")
        el.classList.add("is-active")

        this.toggle.forEach((element) => {
            if (element !== el) element.classList.remove("is-active")
        })

        this.content.querySelectorAll("[role=tabpanel]").forEach((element) => {
            if (element !== this.content.querySelector(`${el.getAttribute("lazy-tab")}[role=tabpanel]`)) element.classList.add("hidden")
        })
    }

    static autoInit() {
        document.querySelectorAll("[lazy-tabs]").forEach((element) => {
            new LazyTabs(element)
        })
    }
}

window.LazyTabs = LazyTabs
// window.$LazyTabsCollection = new Map();

window.addEventListener('load', () => {
    LazyTabs.autoInit()
})