class LazyRipple {
    constructor(el) {
        this.el = el
        this.#init()
    }

    #init(){
        this.el.addEventListener("mousedown", this.#enter)
    }

    #enter(event){
        const btn = event.currentTarget;
        let time;
        if (time) clearTimeout(time);
        const wrapper = document.createElement("span");
        wrapper.classList.add("ripple-wrapper")
        const circle = document.createElement("span");
        const diameter = Math.max(btn.clientWidth, btn.clientHeight);
        const radius = diameter / 2;
        const btnRect = btn.getBoundingClientRect();
    
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - (btnRect.left + radius)}px`;
        circle.style.top = `${event.clientY - (btnRect.top + radius)}px`;
        circle.classList.add("ripple");
        wrapper.appendChild(circle);
        btn.appendChild(wrapper);
    
        time = setTimeout(() => wrapper.remove(), 1000);
    }

    static autoInit() {
        document.querySelectorAll("[lazy-ripple]").forEach((element) => {
            new LazyRipple(element)
        })
    }
}

window.LazyRipple = LazyRipple
// window.$LazyTabsCollection = new Map();

window.addEventListener('load', () => {
    LazyRipple.autoInit()
})