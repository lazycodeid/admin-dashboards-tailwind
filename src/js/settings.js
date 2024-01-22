let settings = {
    get : (key = '') => {
        let value;
        try {
            value = JSON.parse(localStorage.getItem('lazy-settings'))
            if(!value) throw new Error();
        } catch {
            localStorage.setItem('lazy-settings', JSON.stringify({
                themeMode : 'auto',
                themeSidebar : 'default'
            }))
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
        themeSidebar : ['default', 'v2']
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
    document.querySelector("html").setAttribute('data-theme', settings.get("themeMode") == 'auto' ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : settings.get("themeMode"));
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

// restart start
document.querySelector("[lazy-settings-restart]")?.addEventListener("click", () => {
    toggleTheme("auto");
    toggleVersionSidebar("default");
})
// restart end