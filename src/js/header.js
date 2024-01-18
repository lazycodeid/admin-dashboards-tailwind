const header = document.querySelector("._lazy-header-wrapper")

if(header){
    window.addEventListener("scroll", () => {
        header.classList.toggle("scroll-top", window.scrollY <= 0)
        header.classList.toggle("scroll-down", window.scrollY > 0)
    })
}

document.querySelectorAll("[lazy-dropdown-avatar]").forEach((element) => {
    const button = element.querySelector("[lazy-dropdown-toggle]");
    const content = element.querySelector("[lazy-dropdown-content]");
    if (!button || !content) return console.error("LazyDropdown: 'lazy-dropdown-toggle' or 'lazy-dropdown-content' not found.");

    let isOpen = button.classList.contains("is-active");

    content.style.opacity = isOpen ? 1 : 0;
    content.style.transform = isOpen ? "scale(1)" : "scale(0.95)";
    content.style.transformOrigin = 'top';

    button.addEventListener("click", toggle);

    window.addEventListener("click", (event) => {
        if (!isOpen) return
        if (event.target.closest("[lazy-dropdown-toggle]") == button) return
        if (event.target.closest("[lazy-dropdown-content]") == content) return
        toggle()  
    })

    function toggle() {
        if (isOpen) {
            document.removeEventListener("keyup", escapeKey);
            document.body.classList.remove("_lazy-disable-scroll");

            content.style.opacity = 0;
            content.style.transform = "scale(0.95)";
            button.classList.remove("is-active");
            setTimeout(() => {
                content.classList.remove("is-active");
                isOpen = !isOpen;
            }, 300)
        } else {
            document.addEventListener("keyup", escapeKey);
            document.body.classList.add("_lazy-disable-scroll");

            content.classList.add("is-active");
            button.classList.add("is-active");
            setTimeout(() => {
                content.style.opacity = 1;
                content.style.transform = "scale(1)";
                isOpen = !isOpen;
            })
        }
    }

    function escapeKey(e) {
        if (!isOpen) return
        if (e.key != "Escape") return
        e.preventDefault()
        toggle()
        console.log(isOpen);
    }
});
