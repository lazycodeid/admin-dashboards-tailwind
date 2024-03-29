let settings = {
    default : {
        themeMode : 'auto',
        themeSidebar : 'default',
        themeColor : 'success',
        themeContrast: 'default'
    },
    get : (key = '') => {
        let value;
        try {
            value = JSON.parse(localStorage.getItem('lazy-settings'))
            if(!value) throw new Error();
        } catch {
            localStorage.setItem('lazy-settings', JSON.stringify(settings.default))
        }
        value = JSON.parse(localStorage.getItem('lazy-settings'))
        if(key) return value[key]
        return value
    },
    set : (key, value) => {
        localStorage.setItem('lazy-settings', JSON.stringify({
            ...settings.get(),
            [key] : value
        }))
    },
    validate : {
        themeMode : ['auto', 'light', 'dark'],
        themeSidebar : ['default', 'v2'],
        themeColor : ['success', 'indigo', 'info', 'warning', 'danger'],
        themeContrast : ['default', 'bold'],
    }
}

const fullscreen = document.querySelector("._lazy-settings-btn-fullscreen")
if(fullscreen) {
    fullscreen.addEventListener("click", () => {
        if(document.fullscreenElement) {
            fullscreen.innerHTML = `<i class="fa-duotone fa-expand"></i> Fullscreen`
            document.exitFullscreen()
        } else {
            fullscreen.innerHTML = `<i class="fa-duotone fa-minimize"></i> Exit Fullscreen`
            document.documentElement.requestFullscreen()
        }
    })
}

toggleTheme(settings.get("themeMode"));

function toggleTheme(ctheme = 'auto') {
    settings.set("themeMode", settings.validate.themeMode.includes(ctheme) ? ctheme : 'auto')
    document.querySelector("._lazy-settings-widget-wrapper button[lazy-theme-toggle].is-active")?.classList.remove("is-active");
    document.querySelector(`._lazy-settings-widget-wrapper button[lazy-theme-toggle="${settings.get("themeMode")}"]`)?.classList.add("is-active");
    document.querySelector("html").setAttribute('theme-mode', settings.get("themeMode") == 'auto' ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : settings.get("themeMode"));
}

// press ctrl + d
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'd') {
        event.preventDefault();
        toggleTheme(settings.get("themeMode") == 'dark' ? 'light' : settings.get("themeMode") == 'auto' ? 'light' : 'dark');
    }
})

document.querySelectorAll("[lazy-theme-toggle]").forEach((element) => {
    element.addEventListener("click", () => {
        const value = element.getAttribute("lazy-theme-toggle");
        toggleTheme(value ? value : settings.get("themeMode") == 'dark' ? 'light' : 'dark');
    })
})
// theme handler end


// sidebar handler start
toggleVersionSidebar(settings.get("themeSidebar"));

function toggleVersionSidebar(v) {
    settings.set('themeSidebar', settings.validate.themeSidebar.includes(v) ? v : 'default');

    document.querySelector("._lazy-settings-widget-wrapper button[lazy-settings-sidebar].is-active")?.classList.remove("is-active");
    document.querySelector(`._lazy-settings-widget-wrapper button[lazy-settings-sidebar="${settings.get("themeSidebar")}"]`)?.classList.add("is-active");

    document.querySelector("._lazy-simplebar-content.layouts")?.classList.remove("default", "v2");
    document.querySelector("._lazy-simplebar-content.layouts")?.classList.add(settings.get("themeSidebar"));
}

document.querySelectorAll("[lazy-settings-sidebar]").forEach((element) => {
    element.addEventListener("click", () => {
        toggleVersionSidebar(element.getAttribute("lazy-settings-sidebar"));
    })
})
// sidebar handler end

// contrast handler start
toggleContrast(settings.get("themeContrast"));

function toggleContrast(v) {
    settings.set('themeContrast', settings.validate.themeContrast.includes(v) ? v : 'default');

    document.querySelector("._lazy-settings-widget-wrapper button[lazy-settings-contrast].is-active")?.classList.remove("is-active");
    document.querySelector(`._lazy-settings-widget-wrapper button[lazy-settings-contrast="${settings.get("themeContrast")}"]`)?.classList.add("is-active");

    document.querySelector("html").setAttribute('theme-contrast', settings.get("themeContrast"));
}

document.querySelectorAll("[lazy-settings-contrast]").forEach((element) => {
    element.addEventListener("click", () => {
        toggleContrast(element.getAttribute("lazy-settings-contrast"));
    })
})
// contrast handler end


// color preset start
const colorPreset = document.querySelector("[lazy-settins-colors]")
if(colorPreset) {
    const preset = settings.validate.themeColor
    const bg = ["bg-success-300", "bg-indigo-300", "bg-info-300", "bg-warning-300", "bg-danger-300"]

    preset.forEach((element, index) => {
        const div = document.createElement("button");
        div.classList.add("_lazy-settings-widget");
        div.type = "button";
        div.attributes.setNamedItem(document.createAttribute(`lazy-settings-color`));
        div.attributes.getNamedItem(`lazy-settings-color`).value = element;

        const circle = document.createElement("div");
        circle.classList.add("color-preset", `${bg[index]}`);
        div.appendChild(circle);
        
        colorPreset.appendChild(div);
    })

    document.querySelectorAll("[lazy-settings-color]").forEach((element) => {
        element.addEventListener("click", () => {
            toggleColor(element.getAttribute("lazy-settings-color"))
        })
    })

    toggleColor(settings.get("themeColor"));

    function toggleColor(preset) {
        document.querySelectorAll("[lazy-settings-color].is-active").forEach((element) => {
            element.classList.remove("is-active")
        })
        document.querySelector(`[lazy-settings-color="${preset}"]`).classList.add("is-active");
        settings.set("themeColor", settings.validate.themeColor.includes(preset) ? preset : 'success')
        document.querySelector("html").setAttribute('theme-color', settings.get("themeColor"));
    }
}
// color preset end


// restart start
document.querySelector("[lazy-settings-restart]")?.addEventListener("click", () => {
    toggleTheme(settings.default.themeMode);
    toggleVersionSidebar(settings.default.themeSidebar);
    toggleColor(settings.default.themeColor);
    toggleContrast(settings.default.themeContrast);
})
// restart end