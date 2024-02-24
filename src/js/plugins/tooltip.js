import { createPopper } from "@popperjs/core"

class LazyTooltip {
    constructor(el){
        this.el = el
        this.content = document.createElement("div")
        this.#init()
    }

    #init() {
        this.el.addEventListener("mouseenter", () => {
            this.#enter()
        })

        this.el.addEventListener("mouseleave", () => {
            this.#leave()
        })
    }

    #enter(){
        this.content.className = "_lazy-tooltip";
        this.content.innerHTML = this.el.getAttribute("lazy-tooltip");
        document.body.insertAdjacentElement("beforeend", this.content);
        createPopper(this.el, this.content, {
            placement: 'top',
			strategy: 'fixed',
            modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, 5],
					},
				},
			],
        })
        this.content.classList.add("is-active")
    }

    #leave(){
        this.content.classList.remove("is-active")
        setTimeout(() => {
            this.content.remove()
        }, 300)
    }

    static autoInit() {
        document.querySelectorAll("[lazy-tooltip]").forEach((element) => {
            new LazyTooltip(element)
        })
    }
}

window.LazyTooltip = LazyTooltip
// window.$LazyTabsCollection = new Map();

window.addEventListener('load', () => {
    LazyTooltip.autoInit()
})