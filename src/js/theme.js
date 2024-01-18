/**
 * Handler for theme
 */
let theme = localStorage.getItem('theme-ilsya', 'auto');
const themeValidate = ['auto', 'light', 'dark'];

toggleTheme(theme);

function toggleTheme(ctheme = 'auto') {
    theme = themeValidate.includes(ctheme) ? ctheme : 'auto';
    localStorage.setItem('theme-ilsya', theme);
    document.querySelector("html").setAttribute('data-theme', theme == 'auto' ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : theme);
}

// press ctrl + d
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'd') {
        event.preventDefault();
        toggleTheme(theme == 'dark' ? 'light' : 'dark');
    }
})

document.querySelector("[lazy-theme-toggle]").addEventListener("click", () => {
    toggleTheme(theme == 'dark' ? 'light' : 'dark');
})