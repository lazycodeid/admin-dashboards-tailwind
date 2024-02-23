document.querySelectorAll("[lazy-tooltip]").forEach((element) => {
    const tooltip = document.createElement("div");
    tooltip.className = "_lazy-tooltip";
    tooltip.innerHTML = element.getAttribute("lazy-tooltip");

    element.addEventListener("mouseenter", () => {
        document.body.insertAdjacentElement("afterend", tooltip);
        positionTooltip(element, tooltip);
        tooltip.classList.add("is-active")
    });

    element.addEventListener("mouseleave", () => {
        tooltip.classList.remove("is-active");
        setTimeout(() => {
            tooltip.remove();
        },300)
    });

});

function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => { func.apply(this, args); }, wait);
    }
}

function positionTooltip(targetElement, tooltipElement) {
    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const spaceAbove = targetRect.top;
    const spaceBelow = viewportHeight - targetRect.bottom;
    if (spaceAbove > spaceBelow || spaceBelow < tooltipRect.height) {
        tooltipElement.style.top = targetRect.top - tooltipRect.height + "px";
    } else {
        tooltipElement.style.top = targetRect.bottom + "px";
    }

    tooltipElement.style.left = targetRect.left + "px";
}
