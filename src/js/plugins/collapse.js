document.querySelectorAll("[lazy-collapse-target]").forEach((element) => {
    const target = element.getAttribute("lazy-collapse-target");
    const collapse = document.querySelector(`[lazy-collapse="${target}"]`);

    if (!collapse) return console.error(`LazyCollapse '${target}' Not Found.`);

    let isOpen = collapse.classList.contains("is-active");
    collapse.classList.add("transition-all");

    target.addEventListener("click", toggle);

    function toggle() {
        if (isOpen) {
            isOpen = false;
            collapse.style.height = collapse.scrollHeight + 'px';
            setTimeout(() => {
                collapse.style.height = '0px';
            }, 0);
        } else {
            isOpen = true;
            const finalHeight = collapse.scrollHeight + 'px';
            collapse.style.height = finalHeight;
        }
    }

    // if transition ends then set height to auto
    collapse.addEventListener("transitionend", () => {
        (isOpen) ? collapse.classList.add("is-active") : collapse.classList.remove("is-active");
        if(isOpen) collapse.style.height = 'auto';
    })
});

document.querySelectorAll("[lazy-collapse-init]").forEach((element) => {
    // const identifer = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const buttons = element.querySelectorAll("[lazy-collapse-toggle]");
    const content = element.querySelector("[lazy-collapse-content]");
    if (!content) return console.error(`LazyCollapse Error.\nCheck if the element has [lazy-collapse-toggle] and [lazy-collapse-content]`, element); 
    
    let isOpen = content.classList.contains("is-active");
    content.classList.add("transition-all", "duration-300", "ease-in-out");
    buttons.forEach((button) => {
        button.addEventListener("click", toggle);
    })

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
        arrowRotate()
    }
    function arrowRotate() {
        if(!element.querySelector("[lazy-collapse-arrow]")) return
        if (isOpen) {
            element.querySelector("[lazy-collapse-arrow]").style.transform = "rotate(90deg)";
        }else {
            element.querySelector("[lazy-collapse-arrow]").style.transform = "rotate(0deg)";
        }
    }

    // if transition ends then set height to auto
    content.addEventListener("transitionend", () => {
        (isOpen) ? content.classList.add("is-active") : content.classList.remove("is-active");
        if(isOpen) content.style.height = 'auto';
    })
})