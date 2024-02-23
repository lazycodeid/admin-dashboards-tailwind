document.querySelectorAll("[lazy-ripple]").forEach(element => {
    element.addEventListener("mousedown", rippleEffect);
});

function rippleEffect(event) {
    const btn = event.currentTarget;
    let time;
    if (time) clearTimeout(time);

    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    // Get the position of the button relative to the viewport
    const btnRect = btn.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (btnRect.left + radius)}px`;
    circle.style.top = `${event.clientY - (btnRect.top + radius)}px`;
    circle.classList.add("ripple");
    btn.appendChild(circle);

    time = setTimeout(() => circle.remove(), 1000);
}

// ripple button circle
document.querySelectorAll(".btn-circle").forEach((element)=>{
    const ripple_wrapper = document.createElement("span")
    ripple_wrapper.classList.add("ripple-wrapper")
    const createspan = document.createElement("span");
    createspan.classList.add("ripple-circle")
    ripple_wrapper.appendChild(createspan)
    element.appendChild(ripple_wrapper)
})