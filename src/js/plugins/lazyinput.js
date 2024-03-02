import { createPopper } from "@popperjs/core"

class LazySelect {
    constructor(el, options = {}) {
        this.select = typeof el === 'string' ? document.querySelector(el) : el
        this.select_opt = this.select.querySelectorAll('option')
        this.current_opt = null
        this.foreginKey = Math.random().toString(36).substring(2, 15)
        this.toggleStatus = false
        this.#init()
    }

    #init() {
        if (!this.select) return
        this.select.style.display = 'none'
        this.select.setAttribute('lazy-select-id', this.foreginKey)
        this.#setDefaultCurrent()
        this.#createElement()
        this.#event()
    }

    #setDefaultCurrent() {
        if (this.select.querySelector('option[selected]')) {
            this.current_opt = {
                text: this.select.querySelector('option[selected]').textContent,
                value: this.select.querySelector('option[selected]').value,
                icon: this.select.querySelector('option[selected]').getAttribute('icon'),
                selected: true
            }
        } else {
            this.current_opt = {
                text: this.select_opt[0].textContent,
                value: this.select_opt[0].value,
                icon: this.select_opt[0].getAttribute('icon'),
                selected: false
            }
        }
    }

    #getList() {
        let list = ''
        for (let i = 0; i < this.select_opt.length; i++) {
            let opt = this.select_opt[i]
            let selected = ''
            if (this.current_opt.selected) {
                if (opt.selected) selected = 'selected'
            } else {
                if (i == 0) selected = 'selected'
            }
            list += `<div class="list ${selected}" icon="${opt.getAttribute('icon')}" value="${opt.value}" text="${opt.textContent}">
                ${opt.getAttribute('icon') ? `<i class="${opt.getAttribute('icon')}"></i>` : ''}
                <span class="text-sm/none">${opt.textContent}</span>
            </div>`
        }

        return list
    }

    #createElement() {
        let current = `${this.current_opt.icon ? `<i class="${this.current_opt.icon}"></i>` : ''}${this.current_opt.text}`
        const wrapper = document.createElement('div')
        wrapper.className = 'lazy-select-wrapper'
        wrapper.setAttribute('lazy-select-content', this.foreginKey)
        wrapper.innerHTML = `<button class="select lazy-select"><div class="select-title">${current}</div><i class="fa-duotone fa-chevron-down fa-sm"></i></button><div  style="display: none" class="select-content">
        <input type="text" class="lazy-input py-2.5 mb-1" id="search">
        <div class="select-list" lazy-simplebar>${this.#getList()}</div></div>`
        this.select.parentNode.insertBefore(wrapper, this.select)
    }

    #event() {
        const selectContent = document.querySelector(`[lazy-select-content="${this.foreginKey}"]`)
        selectContent.querySelectorAll('.list').forEach((element) => {
            element.addEventListener('click', (event) => {
                this.current_opt = {
                    text: element.getAttribute('text'),
                    value: element.getAttribute('value'),
                    icon: element.getAttribute('icon'),
                }
                selectContent.querySelector(".select-title").innerHTML = `${this.current_opt.icon ? `<i class="${this.current_opt.icon}"></i>` : ''}${this.current_opt.text}`

                selectContent.querySelectorAll('.list').forEach((element) => {
                    element.classList.remove('selected')
                })
                event.target.closest('.list').classList.add('selected')
                this.#toggle()

                this.select.value = this.current_opt.value
            })
        })

        selectContent.querySelector('button.select').addEventListener('click', (event) => {
            this.#toggle()
        })

        // outside
        window.addEventListener('click', (event) => {
            if (!this.toggleStatus) return
            if (!selectContent.contains(event.target)) this.#toggle()
        })

        // search
        selectContent.querySelector('#search').addEventListener('keyup', (event) => {
            selectContent.querySelectorAll('.list').forEach((element) => {
                element.style.display = 'block'
                if (!element.getAttribute('text').toLowerCase().includes(event.target.value.toLowerCase())) {
                    element.style.display = 'none'
                }
            })
        })
    }

    #toggle() {
        const selectContent = document.querySelector(`[lazy-select-content="${this.foreginKey}"]`)
        if (this.toggleStatus) {
            selectContent.querySelector(".select-content").style.display = 'none'
        } else {
            selectContent.querySelector('input#search').value = ''
            selectContent.querySelector('input#search').dispatchEvent(new Event('keyup'))
            selectContent.querySelector(".select-content").style.display = 'block'
            createPopper(selectContent.querySelector('button.select'), selectContent.querySelector('.select-content'), {})
        }
        this.toggleStatus = !this.toggleStatus
    }

    static autoInit() {
        document.querySelectorAll('[lazy-select]').forEach((element) => {
            new LazySelect(element)
        })
    }
}

window.LazySelect = LazySelect

window.addEventListener('load', () => {
    LazySelect.autoInit()
})