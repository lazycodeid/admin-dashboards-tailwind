const simplebar = document.querySelector("[lazy-simplebar-init]");

if(simplebar) {
    let isOpen = false;
    const simplebar_backdrop = simplebar.querySelector("[lazy-simplebar-backdrop]");
    const simplebar_body = simplebar.querySelector("[lazy-simplebar-content]");

    simplebar_backdrop.style.opacity = 0;
    simplebar_backdrop.style.display = "none";
    simplebar_backdrop.style.transition = "opacity 300ms"
    
    simplebar_body.style.transition = "transform 300ms"
    
    simplebar_backdrop.addEventListener("click", toggleSidebar);
    document.querySelectorAll("[lazy-simplebar-toggle]").forEach((element) => {
        element.addEventListener("click", toggleSidebar)
    })
    
    function toggleSidebar() {
        if(isOpen) {
            document.removeEventListener("keyup", escapeKey);

            simplebar_backdrop.style.opacity = 0;
            setTimeout(() => {
                simplebar_backdrop.style.display = "none";
            }, 300)
            simplebar_body.classList.remove("is-active")

            window.lazyDisableScrollbar(false)
        } else {
            document.addEventListener("keyup", escapeKey);
            
            simplebar_backdrop.style.display = "block"
            setTimeout(() => {
                simplebar_backdrop.style.opacity = 1
            }, 0)
            simplebar_body.classList.add("is-active")
            window.lazyDisableScrollbar(true)
        }
        isOpen = !isOpen
    }

    function escapeKey(e) {
        if(!isOpen) return
        if(e.key != "Escape") return 
        e.preventDefault()
        toggleSidebar()
    }
}

document.querySelectorAll("._lazy-nav-subitem.is-active").forEach((element) => {
    element.closest("._lazy-navcollapse-content").classList.add("is-active")
    element.closest("._lazy-navcollapse-content").closest("[lazy-collapse-init]").querySelector("._lazy-nav-item").classList.add("is-active")
})

// simplebar collapse header
document.querySelectorAll('._lazy-navcollapse').forEach((element)=>{
    const button = element.querySelector("._lazy-navcollapse-subheader");
    const content = element.querySelector("._lazy-navcollapse-content");
    let isOpen = content.classList.contains("is-active");
    content.classList.add("transition-all", "duration-300", "ease-in-out");
    button.addEventListener("click", toggle);
    function toggle(e) {
        if (isOpen) {
            isOpen = false;
            content.style.height = content.scrollHeight + 'px';
            setTimeout(() => {
                content.style.height = '0px';
            }, 0);
        } else {
            isOpen = true;
            const finalHeight = content.scrollHeight + 'px';
            content.style.height = finalHeight;
        }
    }

    // if transition ends then set height to auto
    content.addEventListener("transitionend", () => {
        (isOpen) ? content.classList.add("is-active") : content.classList.remove("is-active");
        if(isOpen) content.style.height = 'auto';
    })
})
