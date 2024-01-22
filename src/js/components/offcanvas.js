const offcanvasMap = new Map()

document.querySelectorAll("[lazy-offcanvas]").forEach(offcanvas => {

    const def = {
        transitionDuration: 300,
        transitionTimingFunction: "ease",
        position_offcanvas: position_offcanvas(offcanvas)
    }

    const key = offcanvas.getAttribute("lazy-offcanvas")
    const buttons = document.querySelectorAll(`[lazy-offcanvas-toggle=${key}]`)
    const backdrop = offcanvas.querySelector("._lazy-offcanvas-backdrop") ?? offcanvas.querySelector("[x-backdrop]");
    const content = offcanvas.querySelector("._lazy-offcanvas-content") || offcanvas.querySelector("[x-content]");
    const enableScroll = offcanvas.getAttribute("lazy-offcanvas-scroll")
    let isOpen = offcanvas.classList.contains("is-active");

    // setup default transition
    backdrop.style.transition = "opacity " + def.transitionDuration + "ms " + def.transitionTimingFunction
    backdrop.style.position = "fixed";
    backdrop.style.visibility = "hidden";
    backdrop.style.inset = "0px";
    backdrop.style.opacity = 0;
    content.style.transition = "transform " + def.transitionDuration + "ms " + def.transitionTimingFunction

    // action handlers
    backdrop.addEventListener("click",() => { toggle(false) })
    buttons.forEach(button => button.addEventListener("click", toggle))

    offcanvasMap.set(key, {
        toggle
    })

    function toggle(show) {
        if (!show || isOpen) {
            document.removeEventListener("keyup", escapeKey)
            backdrop.style.opacity = 0
            content.style.transform = def.position_offcanvas.transform_hide;
            
            setTimeout(() => {
                offcanvas.style.visibility = "hidden"
                backdrop.style.visibility = "hidden"
                content.style.visibility = "hidden"
                if(!enableScroll || enableScroll == "false") window.lazyDisableScrollbar(false)
            }, def.transitionDuration)
        } else {
            document.addEventListener("keyup", escapeKey)
            if(!enableScroll || enableScroll == "false") window.lazyDisableScrollbar(true)

            offcanvas.style.visibility = "visible"
            backdrop.style.visibility = "visible"
            content.style.visibility = "visible"

            backdrop.style.opacity = 1
            content.style.transform = def.position_offcanvas.transform_show;
        }
        isOpen = !isOpen
    }

    function escapeKey(e) {
        if (!isOpen) return
        if (e.key != "Escape") return
        e.preventDefault()
        toggle()
    }
})

function position_offcanvas(offcanvas){
    let position = {
        transform_hide: "translateX(100%)",
        transform_show: "translateX(0%)",
    }
    
    if(offcanvas.querySelector("._lazy-offcanvas-content.offcanvas-left")){
        position.transform_hide = "translateX(-100%)"
        position.transform_show = "translateX(0%)"
    }

    if(offcanvas.querySelector("._lazy-offcanvas-content.offcanvas-top")){
        position.transform_hide = "translateY(-100%)"
        position.transform_show = "translateY(0%)"
    }

    if(offcanvas.querySelector("._lazy-offcanvas-content.offcanvas-bottom")){
        position.transform_hide = "translateY(100%)"
        position.transform_show = "translateY(0%)"
    }

    return position
}

window.lazy_offcanvas = (key, show) => {
    const offcanvas = offcanvasMap.get(key)
    if(!offcanvas) return console.error(`LazyOffCanvas '${key}' Not Found.`);
    offcanvas.toggle(show)
}